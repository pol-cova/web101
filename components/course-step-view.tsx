"use client"

import * as React from "react"

import { CloneRepoPanel, SingleCommandPanel } from "@/components/course-step-panels"
import type { CourseStep } from "@/lib/course-data"
import {
  COURSE_PROGRESS_STORAGE_KEY,
  loadCourseProgress,
  notifyCourseProgressChanged,
} from "@/lib/course-progress-storage"

function saveCompleted(next: Record<string, boolean>) {
  try {
    localStorage.setItem(COURSE_PROGRESS_STORAGE_KEY, JSON.stringify(next))
    notifyCourseProgressChanged()
  } catch {
    /* ignore */
  }
}

type CourseStepViewProps = {
  step: CourseStep
  stepIndex: number
}

export function CourseStepView({ step, stepIndex }: CourseStepViewProps) {
  const [completed, setCompleted] = React.useState<Record<string, boolean>>({})
  const [copiedId, setCopiedId] = React.useState<string | null>(null)
  const [copiedSnippetKey, setCopiedSnippetKey] = React.useState<string | null>(null)
  const [hydrated, setHydrated] = React.useState(false)

  React.useEffect(() => {
    setCompleted(loadCourseProgress())
    setHydrated(true)
  }, [])

  const isDone = hydrated && completed[step.id]

  const markComplete = (id: string) => {
    setCompleted((prev) => {
      const next = { ...prev, [id]: true }
      saveCompleted(next)
      return next
    })
  }

  const copyCloneCommand = async () => {
    if (step.interactive?.kind !== "clone-repo") return
    try {
      await navigator.clipboard.writeText(step.interactive.cloneCommand)
      setCopiedId(step.id)
      window.setTimeout(() => setCopiedId((c) => (c === step.id ? null : c)), 2000)
      markComplete(step.id)
    } catch {
      setCopiedId(null)
    }
  }

  const copySingleCommand = async () => {
    if (step.interactive?.kind !== "single-command") return
    try {
      await navigator.clipboard.writeText(step.interactive.command)
      setCopiedId(step.id)
      window.setTimeout(() => setCopiedId((c) => (c === step.id ? null : c)), 2000)
      markComplete(step.id)
    } catch {
      setCopiedId(null)
    }
  }

  const copySnippet = async (text: string, snippetKey: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedSnippetKey(snippetKey)
      window.setTimeout(
        () => setCopiedSnippetKey((c) => (c === snippetKey ? null : c)),
        2000
      )
    } catch {
      setCopiedSnippetKey(null)
    }
  }

  const interactive = step.interactive
  const hasInteractive = Boolean(interactive)

  return (
    <div className="rounded-2xl border border-border/80 bg-card p-5 shadow-sm sm:p-6">
      {interactive?.kind === "clone-repo" ? (
        <CloneRepoPanel
          step={step}
          stepIndex={stepIndex}
          isDone={Boolean(isDone)}
          copiedId={copiedId}
          copiedSnippetKey={copiedSnippetKey}
          onCopyClone={() => void copyCloneCommand()}
          onCopySnippet={copySnippet}
          onMarkComplete={() => markComplete(step.id)}
        />
      ) : interactive?.kind === "single-command" ? (
        <SingleCommandPanel
          step={step}
          isDone={Boolean(isDone)}
          copiedId={copiedId}
          onCopyCommand={() => void copySingleCommand()}
          onMarkComplete={() => markComplete(step.id)}
        />
      ) : hasInteractive ? (
        <p className="text-sm text-muted-foreground">
          Contenido interactivo no disponible para este paso.
        </p>
      ) : (
        <p className="text-sm leading-relaxed text-muted-foreground">
          Contenido de la lección: próximamente. Mientras tanto, revisa el código del proyecto y la
          documentación de Next.js en tu editor.
        </p>
      )}
    </div>
  )
}
