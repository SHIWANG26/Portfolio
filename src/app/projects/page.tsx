import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import { getAllDocuments } from "@/lib/mdx";
import { JsonLd } from "@/components/seo/JsonLd";
import { getBreadcrumbSchema } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Software engineering projects covering backend APIs, microservices, distributed systems, security, and infrastructure.",
  alternates: { canonical: `${siteConfig.url}/projects` },
};

export default function ProjectsPage() {
  const projects = getAllDocuments("projects");

  return (
    <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:py-20">
      <JsonLd
        id="breadcrumb-projects"
        schema={getBreadcrumbSchema([
          { name: "Home", url: siteConfig.url },
          { name: "Projects", url: `${siteConfig.url}/projects` },
        ])}
      />

      <header className="max-w-3xl border-b border-line pb-12">
        <p className="eyebrow">Projects</p>
        <h1 className="mt-3 font-display text-4xl font-semibold tracking-[-0.03em] text-ink sm:text-5xl">
          Engineering work, explained like engineering work.
        </h1>
        <p className="mt-5 text-lg leading-8 text-muted">
          Each case study focuses on the problem, architecture, implementation,
          trade-offs, and measurable outcome rather than just a technology list.
        </p>
      </header>

      {projects.length ? (
        <div className="grid gap-5 py-14 md:grid-cols-2">
          {projects.map((project, index) => (
            <Link
              key={project.slug}
              href={`/projects/${project.slug}`}
              className="project-card group min-h-[18rem]"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs text-muted">0{index + 1}</span>
                <span className="text-xs font-semibold uppercase tracking-[0.08em] text-blueprint-deep">
                  Case study →
                </span>
              </div>
              <div className="mt-12">
                <h2 className="font-display text-2xl font-semibold tracking-tight text-ink group-hover:text-blueprint-deep">
                  {project.metadata.title}
                </h2>
                <p className="mt-3 max-w-2xl text-sm leading-6 text-muted">
                  {project.metadata.summary}
                </p>
              </div>
              <div className="mt-7 flex flex-wrap gap-2">
                {project.metadata.techStack?.map((tech) => (
                  <span key={tech} className="tag">
                    {tech}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="py-16 text-sm text-muted">
          No project case studies have been added yet. Add <code>.mdx</code> files under{" "}
          <code>src/content/projects</code> to populate this page.
        </div>
      )}
    </div>
  );
}
