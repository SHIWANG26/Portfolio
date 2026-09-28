import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { siteConfig } from "@/lib/site-config";
import { getAllDocuments, getDocumentBySlug } from "@/lib/mdx";
import { getBreadcrumbSchema, getProjectSchema } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { MdxBody } from "@/components/mdx/MdxBody";

export function generateStaticParams() {
  return getAllDocuments("projects").map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getDocumentBySlug("projects", slug);

  if (!project) {
    return { title: "Project not found" };
  }

  return {
    title: project.metadata.title,
    description: project.metadata.summary,
    alternates: { canonical: `${siteConfig.url}/projects/${project.slug}` },
    openGraph: {
      type: "article",
      title: project.metadata.title,
      description: project.metadata.summary,
      url: `${siteConfig.url}/projects/${project.slug}`,
      images: project.metadata.image
        ? [{ url: project.metadata.image, alt: project.metadata.title }]
        : undefined,
    },
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getDocumentBySlug("projects", slug);

  if (!project) notFound();

  return (
    <article>
      <JsonLd
        id={`project-${project.slug}`}
        schema={getProjectSchema(project)}
      />
      <JsonLd
        id={`breadcrumb-project-${project.slug}`}
        schema={getBreadcrumbSchema([
          { name: "Home", url: siteConfig.url },
          { name: "Projects", url: `${siteConfig.url}/projects` },
          {
            name: project.metadata.title,
            url: `${siteConfig.url}/projects/${project.slug}`,
          },
        ])}
      />

      <header className="border-b border-line bg-white/60">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:py-20">
          <Link href="/projects" className="text-sm font-semibold text-blueprint-deep hover:underline">
            ← All projects
          </Link>
          <div className="mt-10 max-w-4xl">
            <p className="eyebrow">Case study</p>
            <h1 className="mt-3 font-display text-4xl font-semibold tracking-[-0.04em] text-ink sm:text-5xl lg:text-6xl">
              {project.metadata.title}
            </h1>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-muted">
              {project.metadata.summary}
            </p>
          </div>

          <div className="mt-10 grid gap-4 border-t border-line pt-6 sm:grid-cols-3">
            <div>
              <p className="eyebrow">Role</p>
              <p className="mt-2 text-sm font-medium text-ink">
                {project.metadata.role || "Software engineer"}
              </p>
            </div>
            <div>
              <p className="eyebrow">Stack</p>
              <p className="mt-2 text-sm font-medium text-ink">
                {project.metadata.techStack?.join(" · ") || "See case study"}
              </p>
            </div>
            <div>
              <p className="eyebrow">Published</p>
              <p className="mt-2 text-sm font-medium text-ink">
                {new Intl.DateTimeFormat("en", {
                  year: "numeric",
                  month: "short",
                  day: "2-digit",
                }).format(new Date(project.metadata.publishedAt))}
              </p>
            </div>
          </div>
        </div>
      </header>

      <div className="mx-auto grid max-w-6xl gap-12 px-4 py-14 sm:px-6 lg:grid-cols-[1fr_16rem] lg:py-20">
        <div className="max-w-3xl min-w-0">
          <MdxBody source={project.content} />
        </div>

        <aside className="h-fit border-t border-line pt-5 lg:sticky lg:top-24">
          <p className="eyebrow">Links</p>
          <div className="mt-4 space-y-3">
            {project.metadata.githubUrl ? (
              <a
                href={project.metadata.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-sm font-semibold text-blueprint-deep hover:underline"
              >
                GitHub repository ↗
              </a>
            ) : null}
            {project.metadata.liveUrl ? (
              <a
                href={project.metadata.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-sm font-semibold text-blueprint-deep hover:underline"
              >
                Live project ↗
              </a>
            ) : null}
          </div>
        </aside>
      </div>
    </article>
  );
}
