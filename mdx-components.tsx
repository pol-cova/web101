import type { MDXComponents } from "mdx/types"
import {
  isValidElement,
  type ComponentPropsWithoutRef,
  type ReactNode,
} from "react"

import { CodeBlock } from "@/components/code-block"
import { Mermaid } from "@/components/mdx-mermaid"
import { cn } from "@/lib/utils"

function textFromReactNode(node: ReactNode): string {
  if (node == null || typeof node === "boolean") return ""
  if (typeof node === "string" || typeof node === "number") return String(node)
  if (Array.isArray(node)) return node.map(textFromReactNode).join("")
  if (isValidElement(node)) {
    const props = node.props as { children?: ReactNode }
    return textFromReactNode(props.children)
  }
  return ""
}

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
  if (isValidElement(children)) {
    const p = children.props as { className?: string; children?: ReactNode }
    if (p.className?.includes("language-mermaid")) {
      const chart = textFromReactNode(p.children).replace(/\n$/, "")
      return <Mermaid chart={chart} />
    }
    // Extract filename from data-filename attribute or comment
    const codeText = textFromReactNode(p.children)
    const filename = extractFilename(codeText)
    return (
      <CodeBlock filename={filename}>
        <code className={cn("font-mono text-xs", p.className)}>{p.children}</code>
      </CodeBlock>
    )
  }
  return (
    <pre
      className="my-4 overflow-x-auto rounded-xl border border-border/80 bg-muted/40 p-4 text-xs leading-relaxed text-foreground shadow-inner"
      {...props}
    >
      {children}
    </pre>
  )
}

function extractFilename(code: string): string | undefined {
  // Match // filename.swift or /* filename.swift */ at the start
  const match = code.trim().match(/^\/\/\s*([^\n]+?\.(?:swift|ts|js|jsx|tsx|json|prisma|env|md))\s*\n/)
  if (match) return match[1].trim()
  return undefined
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
