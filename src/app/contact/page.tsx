import type { Metadata } from "next";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Contact",
  description: `Get in touch with ${siteConfig.name} about software engineering roles, backend work, or architecture collaboration.`,
  alternates: { canonical: `${siteConfig.url}/contact` },
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:py-20">
      <header className="max-w-3xl border-b border-line pb-12">
        <p className="eyebrow">Contact</p>
        <h1 className="mt-3 font-display text-4xl font-semibold tracking-[-0.03em] text-ink sm:text-5xl">
          Let&apos;s talk about the work.
        </h1>
        <p className="mt-5 text-lg leading-8 text-muted">
          Whether you&apos;re hiring for a software engineering role or want to
          discuss a backend architecture problem, the best starting point is a
          concrete conversation.
        </p>
      </header>

      <div className="grid gap-6 py-14 md:grid-cols-2">
        <section className="blueprint-panel p-7 sm:p-8">
          <p className="eyebrow">For recruiters</p>
          <h2 className="mt-3 font-display text-2xl font-semibold text-ink">
            Hiring for engineering roles?
          </h2>
          <p className="mt-3 text-sm leading-6 text-muted">
            I&apos;m interested in backend, full-stack, and distributed-systems roles.
            My resume and LinkedIn profile have the latest background.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <a
              href={siteConfig.links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-10 items-center justify-center rounded-sm bg-[#0A66C2] px-5 text-sm font-semibold text-white hover:opacity-90"
            >
              LinkedIn ↗
            </a>
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-10 items-center justify-center rounded-sm border border-line bg-white px-5 text-sm font-semibold text-ink hover:border-blueprint hover:text-blueprint-deep"
            >
              Resume ↗
            </a>
          </div>
        </section>

        <section className="blueprint-panel p-7 sm:p-8">
          <p className="eyebrow">For engineers &amp; founders</p>
          <h2 className="mt-3 font-display text-2xl font-semibold text-ink">
            Want to review the technical work?
          </h2>
          <p className="mt-3 text-sm leading-6 text-muted">
            Explore the project case studies or browse the engineering notes for
            implementation details, trade-offs, and design decisions.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <a
              href={siteConfig.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-10 items-center justify-center rounded-sm bg-ink px-5 text-sm font-semibold text-paper hover:bg-blueprint-deep"
            >
              GitHub ↗
            </a>
            <a
              href={`mailto:${siteConfig.email}`}
              className="inline-flex h-10 items-center justify-center rounded-sm border border-line bg-white px-5 text-sm font-semibold text-ink hover:border-blueprint hover:text-blueprint-deep"
            >
              Email me
            </a>
          </div>
        </section>
      </div>

      <section className="border-t border-line py-10 text-center">
        <p className="text-sm text-muted">Direct email</p>
        <a
          href={`mailto:${siteConfig.email}`}
          className="mt-2 inline-block text-xl font-semibold tracking-tight text-blueprint-deep hover:underline"
        >
          {siteConfig.email}
        </a>
        {siteConfig.phone ? (
          <p className="mt-3 font-mono text-xs text-muted">{siteConfig.phone}</p>
        ) : null}
      </section>
    </div>
  );
}
