"use client"

import { useState } from "react"
import { Check, Copy } from "lucide-react"

import { cn } from "@/lib/utils"

interface CodeBlockProps {
  children: React.ReactNode
  className?: string
  filename?: string
}

export function CodeBlock({ children, className, filename }: CodeBlockProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    const text = extractText(children)
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // ignore
    }
  }

  return (
    <figure className={cn("group relative my-4 overflow-hidden rounded-xl border border-border/80 bg-muted/40 shadow-inner", className)}>
      {filename ? (
        <figcaption className="flex items-center justify-between border-b border-border/60 bg-muted/60 px-4 py-2">
          <span className="font-mono text-xs text-muted-foreground">{filename}</span>
          <CopyButton copied={copied} onClick={handleCopy} />
        </figcaption>
      ) : (
        <div className="absolute right-2 top-2 z-10 opacity-0 transition-opacity group-hover:opacity-100">
          <CopyButton copied={copied} onClick={handleCopy} />
        </div>
      )}
      <div className="overflow-x-auto p-4">
        <pre className="text-xs leading-relaxed text-foreground">
          <code className="font-mono whitespace-pre">{children}</code>
        </pre>
      </div>
    </figure>
  )
}

function CopyButton({ copied, onClick }: { copied: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-[11px] font-medium transition-colors",
        copied
          ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400"
          : "bg-background/80 text-muted-foreground hover:bg-background hover:text-foreground"
      )}
      aria-label={copied ? "Copiado" : "Copiar código"}
    >
      {copied ? (
        <>
          <Check className="size-3" aria-hidden />
          Copiado
        </>
      ) : (
        <>
          <Copy className="size-3" aria-hidden />
          Copiar
        </>
      )}
    </button>
  )
}

function extractText(node: React.ReactNode): string {
  if (node == null || typeof node === "boolean") return ""
  if (typeof node === "string" || typeof node === "number") return String(node)
  if (Array.isArray(node)) return node.map(extractText).join("")
  if (typeof node === "object" && "props" in node) {
    return extractText((node as { props?: { children?: React.ReactNode } }).props?.children)
  }
  return ""
}
