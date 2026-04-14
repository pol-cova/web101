"use client"

import { useEffect, useId, useRef, useState } from "react"
import mermaid from "mermaid"

type MermaidProps = {
  chart: string
}

export function Mermaid({ chart }: MermaidProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const instanceId = useId().replace(/:/g, "")
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    let cancelled = false
    const source = chart.trim()
    if (!source) return

    mermaid.initialize({
      startOnLoad: false,
      theme: "neutral",
      securityLevel: "strict",
    })

    const run = async () => {
      try {
        const { svg } = await mermaid.render(`mmd-${instanceId}`, source)
        if (!cancelled && containerRef.current) {
          containerRef.current.innerHTML = svg
          setError(null)
        }
      } catch (e) {
        if (!cancelled) {
          setError(e instanceof Error ? e.message : "No se pudo renderizar el diagrama")
        }
      }
    }

    void run()
    return () => {
      cancelled = true
    }
  }, [chart, instanceId])

  if (error) {
    return (
      <p className="my-4 rounded-xl border border-destructive/40 bg-destructive/5 px-4 py-3 text-sm text-destructive">
        {error}
      </p>
    )
  }

  return (
    <div
      ref={containerRef}
      className="my-4 overflow-x-auto rounded-xl border border-border/80 bg-muted/20 p-4 [&_svg]:mx-auto [&_svg]:max-h-[min(28rem,70vh)] [&_svg]:max-w-full [&_svg]:min-w-0"
      role="img"
      aria-label="Diagrama entidad-relación"
    />
  )
}
