import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import { JsonLd } from "@/components/seo/JsonLd";
import { getBreadcrumbSchema } from "@/lib/seo";

export const metadata: Metadata = {
  title: "About",
  description:
    "Professional background, technical skills, education, and experience of Shiwang Kumar Rai, a software engineer focused on backend and distributed systems.",
  alternates: { canonical: `${siteConfig.url}/about` },
};

const SKILL_CARDS = [
  {
    title: "Languages & Core CS",
    items: [
      "C++",
      "Java",
      "SQL",
      "TypeScript / JavaScript",
      "Data Structures & Algorithms",
      "Operating Systems & Concurrency",
      "Object-Oriented Design",
      "System Design",
    ],
  },
  {
    title: "Distributed Systems",
    items: [
      "gRPC",
      "Apache Kafka",
      "RESTful APIs",
      "Microservices Architecture",
      "Event-Driven Architecture",
      "Role-Based Access Control",
    ],
  },
  {
    title: "Frameworks & Backend",
    items: ["Spring Boot", "Spring Security", "Spring Cloud", "FastAPI", "React.js", "Next.js", "Node.js"],
  },
  {
    title: "Databases & Cloud",
    items: ["PostgreSQL", "MySQL", "MongoDB", "AWS (EC2, S3)", "Microsoft Azure"],
  },
  {
    title: "DevOps & Tools",
    items: ["Docker", "Docker Compose", "CI/CD Pipelines", "Git", "Postman", "Linux / Bash"],
  },
];

const EXPERIENCE = {
  role: "Software Engineering Intern",
  company: "Predulive Labs",
  location: "Lucknow, India",
  dates: "Jul 2025 – Sep 2025",
  bullets: [
    "Engineered 12+ backend REST API endpoints using FastAPI with Pydantic-based validation and structured serialization, reducing integration overhead by 40%.",
    "Optimized relational and document database query patterns, improving average API response time by 30% across core data retrieval pipelines.",
    "Integrated FastAPI services with React interfaces through explicit REST contracts across 5+ production modules.",
    "Automated deployment workflows with CI/CD pipelines, reducing release turnaround time from 2 days to under 4 hours.",
  ],
};

const EDUCATION = {
  degree: "Bachelor of Technology in Computer Science and Engineering",
  school: "Oriental Institute of Science and Technology",
  location: "Bhopal, Madhya Pradesh, India",
  dates: "Aug 2022 – Jun 2026",
  detail: "CGPA: 7.70 / 10.0",
};

const ACHIEVEMENTS = [
  "Solved 350+ Data Structures & Algorithms challenges on LeetCode, with a focus on graph theory, dynamic programming, and optimization.",
  "Certified in C++ Programming (CodeHelp) and Java Programming (Infosys Springboard).",
  "Cisco Networking Academy certified in Cybersecurity, Computer Networks, and Python.",
];

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:py-20">
      <JsonLd
        id="breadcrumb-about"
        schema={getBreadcrumbSchema([
          { name: "Home", url: siteConfig.url },
          { name: "About", url: `${siteConfig.url}/about` },
        ])}
      />

      <header className="max-w-3xl border-b border-line pb-12">
        <p className="eyebrow">Profile</p>
        <h1 className="mt-3 font-display text-4xl font-semibold tracking-[-0.03em] text-ink sm:text-5xl">
          Software engineering with a bias toward fundamentals.
        </h1>
        <p className="mt-5 text-lg leading-8 text-muted">
          I care about the parts of software that become expensive later: unclear
          boundaries, weak observability, data access patterns, security models,
          and concurrency that only fails under real load.
        </p>
      </header>

      <section className="grid gap-12 py-14 lg:grid-cols-[0.75fr_1.25fr]">
        <div>
          <p className="eyebrow">Background</p>
        </div>
        <div className="space-y-5 text-[1.03rem] leading-8 text-muted">
          <p>
            I build fault-tolerant microservices, high-throughput backend APIs,
            and distributed architectures using C++, Java, gRPC, and event-driven
            pipelines. I like taking a system from schema and contracts through
            implementation, testing, observability, and deployment.
          </p>
          <p>
            I also spend a significant amount of time strengthening the underlying
            computer-science fundamentals: algorithms, operating systems,
            concurrency, networking, and system design. That helps me reason about
            the trade-offs behind a framework rather than only using its APIs.
          </p>
        </div>
      </section>

      <section className="border-t border-line py-14">
        <p className="eyebrow">Technical arsenal</p>
        <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-ink">
          A stack built around backend depth.
        </h2>

        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {SKILL_CARDS.map((card) => (
            <article key={card.title} className="blueprint-panel p-6">
              <h3 className="font-display text-lg font-semibold text-ink">{card.title}</h3>
              <ul className="mt-4 space-y-2 text-sm leading-6 text-muted">
                {card.items.map((item) => (
                  <li key={item} className="flex gap-2">
                    <span className="mt-[0.62rem] h-1 w-1 shrink-0 rounded-full bg-blueprint" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="border-t border-line py-14">
        <p className="eyebrow">Experience</p>
        <div className="mt-8 border-l-2 border-line pl-6 sm:pl-8">
          <p className="font-mono text-xs uppercase tracking-[0.08em] text-blueprint-deep">
            {EXPERIENCE.dates}
          </p>
          <h2 className="mt-2 font-display text-2xl font-semibold text-ink">
            {EXPERIENCE.role} · {EXPERIENCE.company}
          </h2>
          <p className="mt-1 text-sm text-muted">{EXPERIENCE.location}</p>
          <ul className="mt-5 space-y-3 text-sm leading-7 text-muted">
            {EXPERIENCE.bullets.map((bullet) => (
              <li key={bullet} className="flex gap-3">
                <span className="mt-[0.78rem] h-1 w-1 shrink-0 rounded-full bg-blueprint" />
                <span>{bullet}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-t border-line py-14">
        <div className="grid gap-12 sm:grid-cols-2">
          <div>
            <p className="eyebrow">Education</p>
            <div className="mt-5 border-l-2 border-line pl-6">
              <p className="font-mono text-xs uppercase tracking-[0.08em] text-blueprint-deep">
                {EDUCATION.dates}
              </p>
              <h2 className="mt-2 font-display text-xl font-semibold text-ink">
                {EDUCATION.degree}
              </h2>
              <p className="mt-2 text-sm leading-6 text-muted">
                {EDUCATION.school}, {EDUCATION.location} · {EDUCATION.detail}
              </p>
            </div>
          </div>

          <div>
            <p className="eyebrow">Achievements &amp; certifications</p>
            <ul className="mt-5 space-y-3 text-sm leading-7 text-muted">
              {ACHIEVEMENTS.map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-[0.78rem] h-1 w-1 shrink-0 rounded-full bg-blueprint" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="blueprint-panel mt-4 p-7 sm:p-9">
        <div className="grid gap-8 sm:grid-cols-[1fr_auto] sm:items-end">
          <div>
            <p className="eyebrow">Let&apos;s connect</p>
            <h2 className="mt-3 font-display text-2xl font-semibold tracking-tight text-ink">
              Looking for backend, full-stack, or distributed-systems work.
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-muted">
              I&apos;m most interested in roles where I can own meaningful backend
              problems and keep growing through production systems, not just tickets.
            </p>
          </div>
          <Link
            href="/contact"
            className="inline-flex h-10 items-center justify-center rounded-sm bg-ink px-5 text-sm font-semibold text-paper hover:bg-blueprint-deep"
          >
            Get in touch
          </Link>
        </div>
      </section>
    </div>
  );
}
