import type {
  AnchorHTMLAttributes,
  BlockquoteHTMLAttributes,
  HTMLAttributes,
  LiHTMLAttributes,
} from "react";
import { MDXRemote } from "next-mdx-remote/rsc";

interface MdxBodyProps {
  source: string;
}

const components = {
  h2: (props: HTMLAttributes<HTMLHeadingElement>) => (
    <h2
      className="mt-12 border-b border-line pb-3 font-display text-2xl font-semibold tracking-tight text-ink"
      {...props}
    />
  ),
  h3: (props: HTMLAttributes<HTMLHeadingElement>) => (
    <h3 className="mt-8 font-display text-xl font-semibold text-ink" {...props} />
  ),
  p: (props: HTMLAttributes<HTMLParagraphElement>) => (
    <p className="mt-5 text-[1.03rem] leading-8 text-muted" {...props} />
  ),
  ul: (props: HTMLAttributes<HTMLUListElement>) => (
    <ul
      className="mt-5 list-disc space-y-2 pl-6 text-[1.03rem] leading-8 text-muted"
      {...props}
    />
  ),
  ol: (props: HTMLAttributes<HTMLOListElement>) => (
    <ol
      className="mt-5 list-decimal space-y-2 pl-6 text-[1.03rem] leading-8 text-muted"
      {...props}
    />
  ),
  li: (props: LiHTMLAttributes<HTMLLIElement>) => <li {...props} />,
  code: (props: HTMLAttributes<HTMLElement>) => (
    <code
      className="rounded bg-ink/[0.06] px-1.5 py-0.5 font-mono text-[0.9em] text-ink"
      {...props}
    />
  ),
  pre: (props: HTMLAttributes<HTMLPreElement>) => (
    <pre
      className="mt-6 overflow-x-auto rounded-sm border border-line bg-[#111214] p-5 text-sm leading-7 text-white"
      {...props}
    />
  ),
  blockquote: (props: BlockquoteHTMLAttributes<HTMLQuoteElement>) => (
    <blockquote
      className="mt-6 border-l-2 border-blueprint pl-5 italic leading-7 text-muted"
      {...props}
    />
  ),
  a: (props: AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a
      className="font-medium text-blueprint-deep underline decoration-blueprint/30 underline-offset-4 hover:decoration-blueprint"
      {...props}
    />
  ),
};

export function MdxBody({ source }: MdxBodyProps) {
  return <MDXRemote source={source} components={components} />;
}
