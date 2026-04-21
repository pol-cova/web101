"use client"

import type { ComponentType } from "react"
import { Check } from "lucide-react"

import { Button } from "@/components/ui/button"
import type { CourseReadingDiagram, CourseStep } from "@/lib/course-data"
import { CodeBlock } from "@/components/code-block"
import { CourseMarkdown } from "@/components/course-reading/course-markdown"
import { DiagramApiBridge } from "./diagram-api-bridge"
import { DiagramCombinedPipeline } from "./diagram-combined-pipeline"
import { DiagramFrameworkDecision } from "./diagram-framework-decision"
import { DiagramFoundationModelsArch } from "./diagram-foundation-models-arch"
import { DiagramHttpRoundtrip } from "./diagram-http-roundtrip"
import { DiagramOnDeviceVsCloud } from "./diagram-ondevice-vs-cloud"
import { DiagramVisionPipeline } from "./diagram-vision-pipeline"

const DIAGRAMS: Record<CourseReadingDiagram, ComponentType> = {
  "api-bridge": DiagramApiBridge,
  "http-roundtrip": DiagramHttpRoundtrip,
  "ondevice-vs-cloud": DiagramOnDeviceVsCloud,
  "framework-decision": DiagramFrameworkDecision,
  "vision-pipeline": DiagramVisionPipeline,
  "foundation-models-arch": DiagramFoundationModelsArch,
  "combined-pipeline": DiagramCombinedPipeline,
}

export type CourseReadingPanelProps = {
  step: CourseStep
  isDone: boolean
  onMarkComplete: () => void
  /** Contenido MDX compilado (sustituye `step.reading` cuando viene de `content/course/`). */
  mdxContent?: React.ReactNode
}

export function CourseReadingPanel({
  step,
  isDone,
  onMarkComplete,
  mdxContent,
}: CourseReadingPanelProps) {
  const reading = step.reading

  if (mdxContent) {
    return (
      <div className="space-y-8 text-sm leading-relaxed">
        <div className="course-mdx space-y-4 text-muted-foreground">{mdxContent}</div>
        <ReadingFooter isDone={isDone} onMarkComplete={onMarkComplete} />
      </div>
    )
  }

  if (!reading) return null

  const Diagram = reading.diagram ? DIAGRAMS[reading.diagram] : null

  return (
    <div className="space-y-8 text-sm leading-relaxed">
      <div className="space-y-3">
        {reading.lead.map((line, i) => (
          <CourseMarkdown
            key={`lead-${i}`}
            content={line}
            className="text-foreground [&_p]:text-foreground/90"
          />
        ))}
      </div>

      {reading.sections.map((section) => (
        <section key={section.heading} className="space-y-3">
          <h3 className="text-base font-semibold tracking-tight text-foreground">{section.heading}</h3>
          <div className="space-y-2.5">
            {section.body.map((para, i) => (
              <CourseMarkdown key={`${section.heading}-${i}`} content={para} className="text-muted-foreground" />
            ))}
          </div>
          {section.snippet ? (
            <CodeBlock filename={section.snippet.file}>
              {section.snippet.code.trim()}
            </CodeBlock>
          ) : null}
        </section>
      ))}

      {Diagram ? (
        <div className="space-y-3 pt-2">
          <Diagram />
          {reading.diagramCaption ? (
            <div className="text-center text-xs leading-relaxed text-muted-foreground">
              <CourseMarkdown content={reading.diagramCaption} />
            </div>
          ) : null}
        </div>
      ) : null}

      <ReadingFooter isDone={isDone} onMarkComplete={onMarkComplete} />
    </div>
  )
}

function ReadingFooter({
  isDone,
  onMarkComplete,
}: {
  isDone: boolean
  onMarkComplete: () => void
}) {
  return (
    <div className="border-t border-border/80 pt-6">
      {isDone ? (
        <p className="flex items-center gap-2 text-sm font-medium text-emerald-600 dark:text-emerald-400">
          <Check className="size-4 shrink-0" strokeWidth={2.5} aria-hidden />
          Lección marcada como vista
        </p>
      ) : (
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-muted-foreground">
            Cuando hayas leído el texto, marca la lección para seguir el progreso.
          </p>
          <Button type="button" size="sm" className="shrink-0" onClick={onMarkComplete}>
            Marcar como leída
          </Button>
        </div>
      )}
    </div>
  )
}
