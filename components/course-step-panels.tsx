"use client"

import * as React from "react"
import Image from "next/image"
import { Copy, ExternalLink } from "lucide-react"

import { Button } from "@/components/ui/button"
import type { CourseStep } from "@/lib/course-data"

export type CloneRepoPanelProps = {
  step: CourseStep
  stepIndex: number
  isDone: boolean
  copiedId: string | null
  copiedSnippetKey: string | null
  onCopyClone: () => void
  onCopySnippet: (text: string, snippetKey: string) => void
  onMarkComplete: () => void
}

export function CloneRepoPanel({
  step,
  stepIndex,
  isDone,
  copiedId,
  copiedSnippetKey,
  onCopyClone,
  onCopySnippet,
  onMarkComplete,
}: CloneRepoPanelProps) {
  const data = step.interactive
  if (!data || data.kind !== "clone-repo") return null

  const firstEpilogueNote = data.epilogue[0]
  const restEpilogueNotes = data.epilogue.slice(1)

  return (
    <div className="space-y-6 text-sm leading-relaxed">
      <div className="space-y-3">
        {data.preamble.map((line, i) => (
          <p key={`pre-${i}`}>{line}</p>
        ))}
      </div>

      <div className="flex flex-wrap gap-2">
        <Button variant="outline" size="sm" asChild>
          <a href={data.templateRepoUrl} target="_blank" rel="noopener noreferrer">
            <ExternalLink className="size-4" data-icon="inline-start" aria-hidden />
            Ver plantilla en GitHub
          </a>
        </Button>
      </div>

      <figure className="space-y-2">
        <div className="overflow-hidden rounded-xl border border-border bg-muted/20">
          <Image
            src={data.visualAid.src}
            alt={data.visualAid.alt}
            width={1200}
            height={720}
            className="h-auto w-full"
            sizes="(max-width: 768px) 100vw, 42rem"
            priority={stepIndex === 0}
          />
        </div>
        <figcaption className="text-xs leading-relaxed text-muted-foreground">
          {data.visualAid.caption}
        </figcaption>
      </figure>

      <div>
        <p className="font-medium text-foreground">Crear tu copia desde GitHub</p>
        <p className="mt-1 text-muted-foreground">
          Sigue estos pasos en el navegador (no hace falta terminal todavía):
        </p>
        <ol className="mt-3 list-decimal space-y-2 pl-5 marker:text-muted-foreground">
          {data.githubWorkflowSteps.map((line, i) => (
            <li key={i} className="pl-1">
              {line}
            </li>
          ))}
        </ol>
      </div>

      <div>
        <p className="font-medium text-foreground">Clonar con la terminal</p>
        <p className="mt-1 text-muted-foreground">
          La terminal es la ventana de texto donde escribes comandos. Primero sitúate en la carpeta
          donde quieras el proyecto (por ejemplo el Escritorio):
        </p>
        <pre className="mt-3 overflow-x-auto rounded-xl border border-border bg-muted/50 p-3 font-mono text-xs text-foreground">
          {data.cdExample}
        </pre>
        <p className="mt-4 text-muted-foreground">
          Luego copia el comando de abajo y pégalo en la terminal. Al usar el botón «Copiar comando»,
          este paso se marcará como hecho.
        </p>
        <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-center">
          <pre className="min-w-0 flex-1 overflow-x-auto rounded-xl border border-border bg-muted/50 p-3 font-mono text-xs text-foreground">
            {data.cloneCommand}
          </pre>
          <Button type="button" className="shrink-0 sm:self-start" onClick={onCopyClone}>
            <Copy className="size-4" data-icon="inline-start" aria-hidden />
            {copiedId === step.id ? "Copiado" : "Copiar comando"}
          </Button>
        </div>
      </div>

      {firstEpilogueNote ? (
        <p className="text-muted-foreground">{firstEpilogueNote}</p>
      ) : null}

      <div>
        <p className="font-medium text-foreground">Siguiente en la terminal</p>
        <p className="mt-1 text-muted-foreground">
          Ejecuta estos comandos uno tras otro (pega cada uno y pulsa Intro):
        </p>
        <div className="mt-4 space-y-5">
          {data.postCloneCommands.map((cmd) => {
            const snippetKey = `${step.id}-${cmd.id}`
            return (
              <div key={cmd.id} className="space-y-2">
                <p className="text-muted-foreground">{cmd.caption}</p>
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                  <pre className="min-w-0 flex-1 overflow-x-auto rounded-xl border border-border bg-muted/50 p-3 font-mono text-xs text-foreground">
                    {cmd.command}
                  </pre>
                  <Button
                    type="button"
                    variant="secondary"
                    className="shrink-0 sm:self-start"
                    onClick={() => void onCopySnippet(cmd.command, snippetKey)}
                  >
                    <Copy className="size-4" data-icon="inline-start" aria-hidden />
                    {copiedSnippetKey === snippetKey ? "Copiado" : "Copiar comando"}
                  </Button>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {restEpilogueNotes.length > 0 ? (
        <div className="space-y-2 border-t border-border/80 pt-4 text-muted-foreground">
          {restEpilogueNotes.map((line, epilogueIndex) => (
            <p key={`epilogue-${epilogueIndex}`}>{line}</p>
          ))}
        </div>
      ) : null}

      {!isDone ? (
        <p className="text-xs text-muted-foreground">
          Si no puedes copiar al portapapeles, puedes marcar el paso como hecho a mano.
        </p>
      ) : null}
      {!isDone ? (
        <Button type="button" variant="outline" size="sm" className="mt-1" onClick={onMarkComplete}>
          Marcar como hecho sin copiar
        </Button>
      ) : null}
    </div>
  )
}

export type SingleCommandPanelProps = {
  step: CourseStep
  isDone: boolean
  copiedId: string | null
  onCopyCommand: () => void
  onMarkComplete: () => void
}

export function SingleCommandPanel({
  step,
  isDone,
  copiedId,
  onCopyCommand,
  onMarkComplete,
}: SingleCommandPanelProps) {
  const data = step.interactive
  if (!data || data.kind !== "single-command") return null

  return (
    <div className="space-y-4 text-sm leading-relaxed">
      <div className="space-y-3">
        {data.preamble.map((line, i) => (
          <p key={`sc-pre-${i}`}>{line}</p>
        ))}
      </div>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <pre className="min-w-0 flex-1 overflow-x-auto rounded-xl border border-border bg-muted/50 p-3 font-mono text-xs text-foreground">
          {data.command}
        </pre>
        <Button type="button" className="shrink-0 sm:self-start" onClick={onCopyCommand}>
          <Copy className="size-4" data-icon="inline-start" aria-hidden />
          {copiedId === step.id ? "Copiado" : "Copiar comando"}
        </Button>
      </div>
      <p className="text-xs text-muted-foreground">
        Al copiar el comando, este paso se marca como hecho. Luego pégalo en la terminal y pulsa
        Intro.
      </p>
      <div className="space-y-2 text-muted-foreground">
        {data.afterNotes.map((line, i) => (
          <p key={`sc-after-${i}`}>{line}</p>
        ))}
      </div>
      {!isDone ? (
        <Button type="button" variant="outline" size="sm" onClick={onMarkComplete}>
          Marcar como hecho sin copiar
        </Button>
      ) : null}
    </div>
  )
}
