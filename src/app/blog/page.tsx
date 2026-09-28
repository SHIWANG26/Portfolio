import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import { getAllDocuments } from "@/lib/mdx";
import { JsonLd } from "@/components/seo/JsonLd";
import { getBreadcrumbSchema } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Engineering",
  description:
    "Engineering notes on Java, C++, distributed systems, system design, backend development, security, and performance.",
  alternates: { canonical: `${siteConfig.url}/blog` },
};

export default function BlogPage() {
  const posts = getAllDocuments("blog");

  return (
    <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:py-20">
      <JsonLd
        id="breadcrumb-blog"
        schema={getBreadcrumbSchema([
          { name: "Home", url: siteConfig.url },
          { name: "Engineering", url: `${siteConfig.url}/blog` },
        ])}
      />

      <header className="max-w-3xl border-b border-line pb-12">
        <p className="eyebrow">Engineering notes</p>
        <h1 className="mt-3 font-display text-4xl font-semibold tracking-[-0.03em] text-ink sm:text-5xl">
          Notes from building and understanding systems.
        </h1>
        <p className="mt-5 text-lg leading-8 text-muted">
          Practical write-ups on backend engineering, Java, C++, distributed
          systems, security, and the trade-offs behind implementation choices.
        </p>
      </header>

      {posts.length ? (
        <div className="divide-y divide-line py-4">
          {posts.map((post) => (
            <article key={post.slug} className="group grid gap-5 py-8 sm:grid-cols-[10rem_1fr_auto] sm:items-start">
              <div>
                <p className="font-mono text-xs text-muted">
                  {new Intl.DateTimeFormat("en", {
                    year: "numeric",
                    month: "short",
                    day: "2-digit",
                  }).format(new Date(post.metadata.publishedAt))}
                </p>
                <p className="mt-2 text-xs text-muted">{post.metadata.readingTime}</p>
              </div>

              <div>
                <Link href={`/blog/${post.slug}`}>
                  <h2 className="font-display text-2xl font-semibold tracking-tight text-ink group-hover:text-blueprint-deep">
                    {post.metadata.title}
                  </h2>
                </Link>
                <p className="mt-3 max-w-2xl text-sm leading-6 text-muted">
                  {post.metadata.summary}
                </p>
                {post.metadata.tags?.length ? (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {post.metadata.tags.slice(0, 5).map((tag) => (
                      <span key={tag} className="tag">
                        {tag}
                      </span>
                    ))}
                  </div>
                ) : null}
              </div>

              <Link
                href={`/blog/${post.slug}`}
                className="pt-1 text-sm font-semibold text-blueprint-deep"
              >
                Read →
              </Link>
            </article>
          ))}
        </div>
      ) : (
        <div className="py-16 text-sm text-muted">
          No engineering notes have been added yet. Add <code>.mdx</code> files under{" "}
          <code>src/content/blog</code> to populate this page.
        </div>
      )}
    </div>
  );
}
