import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-3xl flex-col items-start justify-center px-4 py-16 sm:px-6">
      <p className="eyebrow">404</p>
      <h1 className="mt-3 font-display text-4xl font-semibold tracking-tight text-ink">
        This page doesn&apos;t exist.
      </h1>
      <p className="mt-4 max-w-xl text-muted">
        The page may have moved, or the content slug is no longer available.
      </p>
      <div className="mt-7 flex flex-wrap gap-3">
        <Link
          href="/"
          className="inline-flex h-10 items-center justify-center rounded-sm bg-ink px-5 text-sm font-semibold text-paper hover:bg-blueprint-deep"
        >
          Back home
        </Link>
        <Link
          href="/projects"
          className="inline-flex h-10 items-center justify-center rounded-sm border border-line bg-white px-5 text-sm font-semibold text-ink hover:border-blueprint hover:text-blueprint-deep"
        >
          Browse projects
        </Link>
      </div>
    </div>
  );
}
