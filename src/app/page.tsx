import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import { getAllDocuments } from "@/lib/mdx";

const PROOF_POINTS = [
  { value: "350+", label: "DSA problems solved" },
  { value: "12+", label: "backend endpoints delivered" },
  { value: "5+", label: "production modules integrated" },
  { value: "< 4h", label: "release turnaround after automation" },
];

const STACK = [
  "Java",
  "C++",
  "Spring Boot",
  "Spring Security",
  "gRPC",
  "Apache Kafka",
  "PostgreSQL",
  "Docker",
  "AWS",
];

const PRINCIPLES = [
  {
    number: "01",
    title: "Design for failure",
    text: "I think about timeouts, retries, idempotency, observability, and graceful degradation before a system reaches production.",
  },
  {
    number: "02",
    title: "Make the boundary clear",
    text: "Good contracts reduce integration cost. APIs, schemas, events, and authorization rules should be explicit and easy to reason about.",
  },
  {
    number: "03",
    title: "Optimize with evidence",
    text: "Performance work starts with measurements. I prefer profiling, query analysis, and focused changes over premature optimization.",
  },
];

export default function HomePage() {
  const featuredProjects = getAllDocuments("projects").slice(0, 3);

  return (
    <div>
      <section className="grid-paper border-b border-line">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:py-24">
          <div className="grid items-end gap-12 lg:grid-cols-[1.25fr_0.75fr]">
            <div>
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-line bg-white/70 px-3 py-1.5 font-mono text-[11px] font-medium uppercase tracking-[0.08em] text-muted">
                <span className="status-dot" aria-hidden="true" />
                Software engineer · backend &amp; distributed systems
              </div>

              <h1 className="max-w-4xl font-display text-4xl font-semibold leading-[1.04] tracking-[-0.04em] text-ink sm:text-5xl lg:text-7xl">
                I build backend systems that stay understandable under load.
              </h1>

              <p className="mt-7 max-w-2xl text-lg leading-8 text-muted sm:text-xl">
                I&apos;m {siteConfig.name}, a software engineer focused on
                reliable APIs, microservices, concurrency, and event-driven
                systems using Java, C++, gRPC, and Apache Kafka.
              </p>

              <div className="mt-9 flex flex-wrap gap-3">
                <Link
                  href="/projects"
                  className="inline-flex h-11 items-center justify-center rounded-sm bg-ink px-5 text-sm font-semibold text-paper transition-transform hover:-translate-y-0.5 hover:bg-blueprint-deep"
                >
                  Explore engineering work
                </Link>
                <Link
                  href="/about"
                  className="inline-flex h-11 items-center justify-center rounded-sm border border-line bg-white px-5 text-sm font-semibold text-ink transition-colors hover:border-blueprint hover:text-blueprint-deep"
                >
                  About me
                </Link>
                <a
                  href="/resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-11 items-center justify-center rounded-sm px-2 text-sm font-semibold text-blueprint underline decoration-blueprint/30 underline-offset-4 hover:text-blueprint-deep"
                >
                  Resume ↗
                </a>
              </div>
            </div>

            <aside className="blueprint-panel p-6 sm:p-7">
              <p className="eyebrow">Engineering focus</p>
              <h2 className="mt-3 font-display text-2xl font-semibold tracking-tight text-ink">
                Systems thinking, not just framework knowledge.
              </h2>
              <div className="mt-6 grid grid-cols-2 gap-3 text-sm">
                {[
                  "API design",
                  "Concurrency",
                  "Distributed systems",
                  "Data modelling",
                  "Security",
                  "Observability",
                ].map((item) => (
                  <div
                    key={item}
                    className="border border-line bg-white/60 px-3 py-3 text-muted"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section className="border-b border-line bg-white/65">
        <div className="mx-auto grid max-w-6xl grid-cols-2 divide-x divide-y divide-line sm:grid-cols-4 sm:divide-y-0 sm:px-6">
          {PROOF_POINTS.map((point) => (
            <div key={point.label} className="px-4 py-7 sm:px-5">
              <p className="font-display text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
                {point.value}
              </p>
              <p className="mt-1 max-w-[14rem] text-xs leading-5 text-muted sm:text-sm">
                {point.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:py-24">
        <div className="grid gap-12 lg:grid-cols-[0.75fr_1.25fr]">
          <div>
            <p className="eyebrow">Technical stack</p>
            <h2 className="mt-3 max-w-md font-display text-3xl font-semibold tracking-tight text-ink">
              Tools I use to turn system designs into working software.
            </h2>
          </div>

          <div className="grid grid-cols-2 gap-px overflow-hidden border border-line bg-line sm:grid-cols-3">
            {STACK.map((item) => (
              <div key={item} className="bg-paper px-4 py-5 text-sm font-medium text-ink">
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      {featuredProjects.length > 0 ? (
        <section className="border-y border-line bg-white/60">
          <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:py-24">
            <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="eyebrow">Selected work</p>
                <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-ink">
                  Projects with an engineering story.
                </h2>
              </div>
              <Link
                href="/projects"
                className="text-sm font-semibold text-blueprint-deep hover:underline"
              >
                View all projects →
              </Link>
            </div>

            <div className="grid gap-5 md:grid-cols-3">
              {featuredProjects.map((project, index) => (
                <Link
                  key={project.slug}
                  href={`/projects/${project.slug}`}
                  className="project-card group"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs text-muted">0{index + 1}</span>
                    <span className="text-xs font-medium text-blueprint-deep opacity-0 transition-opacity group-hover:opacity-100">
                      Read case study →
                    </span>
                  </div>
                  <h3 className="mt-10 font-display text-xl font-semibold tracking-tight text-ink group-hover:text-blueprint-deep">
                    {project.metadata.title}
                  </h3>
                  <p className="mt-3 line-clamp-4 text-sm leading-6 text-muted">
                    {project.metadata.summary}
                  </p>
                  {project.metadata.techStack?.length ? (
                    <div className="mt-6 flex flex-wrap gap-2">
                      {project.metadata.techStack.slice(0, 4).map((tech) => (
                        <span key={tech} className="tag">
                          {tech}
                        </span>
                      ))}
                    </div>
                  ) : null}
                </Link>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:py-24">
        <div className="mb-12 max-w-2xl">
          <p className="eyebrow">How I work</p>
          <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-ink">
            Engineering decisions I care about.
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {PRINCIPLES.map((principle) => (
            <article key={principle.number} className="border-t-2 border-ink pt-5">
              <p className="font-mono text-xs text-blueprint-deep">{principle.number}</p>
              <h3 className="mt-3 font-display text-xl font-semibold text-ink">
                {principle.title}
              </h3>
              <p className="mt-3 text-sm leading-6 text-muted">{principle.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="border-t border-line bg-ink text-paper">
        <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-16 sm:px-6 lg:flex-row lg:items-end lg:justify-between lg:py-20">
          <div className="max-w-2xl">
            <p className="font-mono text-xs uppercase tracking-[0.12em] text-blueprint-light">
              Let&apos;s build something useful
            </p>
            <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
              Hiring for backend engineering, or solving a hard systems problem?
            </h2>
            <p className="mt-4 max-w-xl text-sm leading-6 text-white/65">
              Send me the problem, constraints, or role. I&apos;d rather start with
              the engineering challenge than a generic pitch.
            </p>
          </div>

          <Link
            href="/contact"
            className="inline-flex h-11 shrink-0 items-center justify-center rounded-sm bg-paper px-6 text-sm font-semibold text-ink transition-transform hover:-translate-y-0.5"
          >
            Start a conversation
          </Link>
        </div>
      </section>
    </div>
  );
}
