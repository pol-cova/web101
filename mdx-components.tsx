import type { MDXComponents } from "mdx/types"
import type { ComponentPropsWithoutRef } from "react"

import { cn } from "@/lib/utils"

function Heading2({ children, ...props }: ComponentPropsWithoutRef<"h2">) {
  return (
    <h2
      className="mt-8 scroll-mt-20 text-base font-semibold tracking-tight text-foreground first:mt-0"
      {...props}
    >
      {children}
    </h2>
  )
}

function Paragraph({ children, ...props }: ComponentPropsWithoutRef<"p">) {
  return (
    <p className="text-pretty leading-relaxed text-muted-foreground [&+&]:mt-2.5" {...props}>
      {children}
    </p>
  )
}

function InlineCode({ children, ...props }: ComponentPropsWithoutRef<"code">) {
  return (
    <code
      className="rounded-md border border-border/80 bg-muted/60 px-1.5 py-0.5 font-mono text-[0.9em] text-foreground"
      {...props}
    >
      {children}
    </code>
  )
}

function Pre({ children, ...props }: ComponentPropsWithoutRef<"pre">) {
  return (
    <pre
      className="my-4 overflow-x-auto rounded-xl border border-border/80 bg-muted/40 p-4 text-xs leading-relaxed text-foreground shadow-inner"
      {...props}
    >
      {children}
    </pre>
  )
}

function Code({ className, children, ...props }: ComponentPropsWithoutRef<"code">) {
  const isFencedBlock = Boolean(className?.startsWith("language-"))
  if (isFencedBlock) {
    return (
      <code className={cn("font-mono text-xs text-foreground", className)} {...props}>
        {children}
      </code>
    )
  }
  return <InlineCode {...props}>{children}</InlineCode>
}

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    h2: Heading2,
    p: Paragraph,
    pre: Pre,
    code: Code,
  }
}
