import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import readingTime from "reading-time";

export type ContentType = "blog" | "projects";

export interface Frontmatter {
  title: string;
  summary: string;
  publishedAt: string;
  updatedAt?: string;
  tags?: string[];
  image?: string;
  readingTime?: string;
  githubUrl?: string;
  liveUrl?: string;
  techStack?: string[];
  role?: string;
}

export interface MDXDocument {
  slug: string;
  metadata: Frontmatter;
  content: string;
}

const rootDirectory = path.join(process.cwd(), "src", "content");

function assertString(value: unknown, field: string): string {
  if (typeof value !== "string" || value.trim().length === 0) {
    throw new Error(`Invalid frontmatter: ${field} must be a non-empty string.`);
  }
  return value.trim();
}

function normalizeFrontmatter(data: Record<string, unknown>, content: string): Frontmatter {
  const title = assertString(data.title, "title");
  const summary = assertString(data.summary, "summary");
  const publishedAt = assertString(data.publishedAt, "publishedAt");

  const tags = Array.isArray(data.tags)
    ? data.tags.filter((item): item is string => typeof item === "string")
    : undefined;

  const techStack = Array.isArray(data.techStack)
    ? data.techStack.filter((item): item is string => typeof item === "string")
    : undefined;

  const updatedAt = typeof data.updatedAt === "string" ? data.updatedAt : undefined;
  const image = typeof data.image === "string" ? data.image : undefined;
  const githubUrl = typeof data.githubUrl === "string" ? data.githubUrl : undefined;
  const liveUrl = typeof data.liveUrl === "string" ? data.liveUrl : undefined;
  const role = typeof data.role === "string" ? data.role : undefined;

  const publishedDate = new Date(publishedAt);
  if (Number.isNaN(publishedDate.getTime())) {
    throw new Error(`Invalid frontmatter: publishedAt is not a valid date: ${publishedAt}`);
  }

  if (updatedAt && Number.isNaN(new Date(updatedAt).getTime())) {
    throw new Error(`Invalid frontmatter: updatedAt is not a valid date: ${updatedAt}`);
  }

  return {
    title,
    summary,
    publishedAt,
    updatedAt,
    tags,
    image,
    readingTime: readingTime(content).text,
    githubUrl,
    liveUrl,
    techStack,
    role,
  };
}

function getMDXFiles(dir: string): string[] {
  if (!fs.existsSync(dir)) return [];

  return fs
    .readdirSync(dir, { withFileTypes: true })
    .filter((entry) => entry.isFile() && path.extname(entry.name) === ".mdx")
    .map((entry) => entry.name);
}

export function getDocumentBySlug(type: ContentType, slug: string): MDXDocument | null {
  const safeSlug = slug.replace(/[^a-zA-Z0-9-_]/g, "");
  if (safeSlug !== slug) return null;

  const filePath = path.join(rootDirectory, type, `${safeSlug}.mdx`);

  try {
    const fileContent = fs.readFileSync(filePath, "utf8");
    const { data, content } = matter(fileContent);

    return {
      slug: safeSlug,
      metadata: normalizeFrontmatter(data as Record<string, unknown>, content),
      content,
    };
  } catch {
    return null;
  }
}

export function getAllDocuments(type: ContentType): MDXDocument[] {
  const dir = path.join(rootDirectory, type);
  const mdxFiles = getMDXFiles(dir);

  return mdxFiles
    .map((file) => getDocumentBySlug(type, file.replace(/\.mdx$/, "")))
    .filter((doc): doc is MDXDocument => doc !== null)
    .sort(
      (a, b) =>
        new Date(b.metadata.publishedAt).getTime() -
        new Date(a.metadata.publishedAt).getTime(),
    );
}
