"use client"

import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"

import { cn } from "@/lib/utils"

type CourseMarkdownProps = {
  content: string
  className?: string
}

/**
 * Markdown ligero para textos definidos en `course-data.ts` (negritas, `código`, enlaces).
 * Para lecciones largas o con JSX, usa archivos `.mdx` en `content/course/` y `readingMdxSlug`.
 */
export function CourseMarkdown({ content, className }: CourseMarkdownProps) {
  return (
    <div className={cn("course-inline-md", className)}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          p: ({ children }) => (
            <p className="text-pretty leading-relaxed [&:not(:first-child)]:mt-2.5">{children}</p>
          ),
          strong: ({ children }) => <strong className="font-semibold text-foreground">{children}</strong>,
          a: ({ href, children }) => (
            <a
              href={href}
              className="font-medium text-primary underline-offset-4 hover:underline"
              rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
              target={href?.startsWith("http") ? "_blank" : undefined}
            >
              {children}
            </a>
          ),
          code: ({ className: codeClass, children }) => {
            const isBlock = Boolean(codeClass?.includes("language-"))
            if (isBlock) {
              return (
                <code className={cn("font-mono text-xs", codeClass)}>{children}</code>
              )
            }
            return (
              <code className="rounded-md border border-border/80 bg-muted/60 px-1.5 py-0.5 font-mono text-[0.9em] text-foreground">
                {children}
              </code>
            )
          },
          pre: ({ children }) => (
            <pre className="my-3 overflow-x-auto rounded-xl border border-border/80 bg-muted/40 p-4 text-xs shadow-inner">
              {children}
            </pre>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  )
}
