import Link from "next/link";
import { siteConfig } from "@/lib/site-config";

const NAV_ITEMS = [
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/blog", label: "Engineering" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-line/80 bg-paper/90 backdrop-blur-xl">
      <div className="mx-auto flex min-h-16 max-w-6xl items-center justify-between gap-6 px-4 sm:px-6">
        <Link
          href="/"
          className="shrink-0 font-display text-base font-semibold tracking-[-0.02em] text-ink transition-colors hover:text-blueprint-deep sm:text-lg"
          aria-label={`${siteConfig.name} home`}
        >
          {siteConfig.name}
        </Link>

        <nav
          aria-label="Primary navigation"
          className="flex min-w-0 items-center gap-4 overflow-x-auto whitespace-nowrap text-xs font-semibold uppercase tracking-[0.08em] text-muted sm:gap-6 sm:text-sm"
        >
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="py-5 transition-colors hover:text-ink"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
