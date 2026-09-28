import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { siteConfig } from "@/lib/site-config";
import { getAllDocuments, getDocumentBySlug } from "@/lib/mdx";
import { getArticleSchema, getBreadcrumbSchema } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { MdxBody } from "@/components/mdx/MdxBody";

export function generateStaticParams() {
  return getAllDocuments("blog").map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getDocumentBySlug("blog", slug);

  if (!post) {
    return { title: "Article not found" };
  }

  return {
    title: post.metadata.title,
    description: post.metadata.summary,
    alternates: { canonical: `${siteConfig.url}/blog/${post.slug}` },
    openGraph: {
      type: "article",
      title: post.metadata.title,
      description: post.metadata.summary,
      url: `${siteConfig.url}/blog/${post.slug}`,
      publishedTime: new Date(post.metadata.publishedAt).toISOString(),
      modifiedTime: new Date(
        post.metadata.updatedAt || post.metadata.publishedAt,
      ).toISOString(),
      tags: post.metadata.tags,
      images: post.metadata.image
        ? [{ url: post.metadata.image, alt: post.metadata.title }]
        : undefined,
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getDocumentBySlug("blog", slug);

  if (!post) notFound();

  return (
    <article>
      <JsonLd id={`article-${post.slug}`} schema={getArticleSchema(post)} />
      <JsonLd
        id={`breadcrumb-blog-${post.slug}`}
        schema={getBreadcrumbSchema([
          { name: "Home", url: siteConfig.url },
          { name: "Engineering", url: `${siteConfig.url}/blog` },
          {
            name: post.metadata.title,
            url: `${siteConfig.url}/blog/${post.slug}`,
          },
        ])}
      />

      <header className="border-b border-line bg-white/60">
        <div className="mx-auto max-w-4xl px-4 py-14 sm:px-6 lg:py-20">
          <Link href="/blog" className="text-sm font-semibold text-blueprint-deep hover:underline">
            ← All engineering notes
          </Link>
          <p className="eyebrow mt-10">Engineering note</p>
          <h1 className="mt-3 font-display text-4xl font-semibold tracking-[-0.04em] text-ink sm:text-5xl">
            {post.metadata.title}
          </h1>
          <p className="mt-5 text-lg leading-8 text-muted">{post.metadata.summary}</p>

          <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-muted">
            <span>
              {new Intl.DateTimeFormat("en", {
                year: "numeric",
                month: "short",
                day: "2-digit",
              }).format(new Date(post.metadata.publishedAt))}
            </span>
            <span>·</span>
            <span>{post.metadata.readingTime}</span>
            {post.metadata.updatedAt ? (
              <>
                <span>·</span>
                <span>
                  Updated{" "}
                  {new Intl.DateTimeFormat("en", {
                    year: "numeric",
                    month: "short",
                    day: "2-digit",
                  }).format(new Date(post.metadata.updatedAt))}
                </span>
              </>
            ) : null}
          </div>

          {post.metadata.tags?.length ? (
            <div className="mt-6 flex flex-wrap gap-2">
              {post.metadata.tags.map((tag) => (
                <span key={tag} className="tag">
                  {tag}
                </span>
              ))}
            </div>
          ) : null}
        </div>
      </header>

      <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6 lg:py-20">
        <MdxBody source={post.content} />
      </div>
    </article>
  );
}
