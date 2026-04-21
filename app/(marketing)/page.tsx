import Link from "next/link"
import { ArrowRight, Brain, Eye, MessageSquare } from "lucide-react"

import { Button } from "@/components/ui/button"
import { courseSections } from "@/lib/course-data"
import { courseStepPath } from "@/lib/course-navigation"

const firstLesson = courseSections[0]?.steps[0]
const firstLessonHref = firstLesson
  ? courseStepPath(courseSections[0].id, firstLesson.id)
  : "/curso"

const highlights = [
  {
    icon: Eye,
    title: "Vision",
    body: "Reconoce texto y objetos en tiempo real desde la cámara. OCR, detección de rostros y análisis de escenas directamente en el dispositivo.",
  },
  {
    icon: MessageSquare,
    title: "Natural Language",
    body: "Analiza sentimientos, detecta idiomas y extrae entidades de cualquier texto. Sin conexión, sin API keys, sin enviar datos a la nube.",
  },
  {
    icon: Brain,
    title: "Foundation Models",
    body: "Genera lenguaje, estructura datos y crea asistentes inteligentes con modelos LLM que corren localmente en tu iPhone o Mac (iOS 26+).",
  },
] as const

export default function Page() {
  return (
    <div className="relative">
      <div
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,oklch(0.92_0.04_250/0.35),transparent)] dark:bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,oklch(0.35_0.08_250/0.25),transparent)]"
        aria-hidden
      />
      <section className="mx-auto max-w-5xl px-4 pb-16 pt-12 sm:px-6 sm:pb-24 sm:pt-16">
        <p className="text-sm font-medium text-muted-foreground">Swift Changemakers Hackathon 2026</p>
        <h1 className="mt-3 max-w-3xl text-balance text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl">
          IA on-device con Swift
        </h1>
        <p className="mt-5 max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
          Taller práctico de inteligencia artificial local: Vision, Natural Language, Core ML y Foundation Models.
          Human Centered AI que respeta la privacidad y funciona sin conexión.
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-3">
          <Button size="lg" asChild>
            <Link href={firstLessonHref}>
              Empezar el taller
              <ArrowRight className="size-4" data-icon="inline-end" aria-hidden />
            </Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link href={firstLessonHref}>Ver la primera lección</Link>
          </Button>
        </div>
        <p className="mt-6 text-xs text-muted-foreground">
          Pulsa <kbd className="rounded border border-border bg-muted px-1.5 py-0.5 font-mono">d</kbd>{" "}
          para cambiar el tema claro u oscuro.
        </p>
      </section>

      <section className="border-t border-border/80 bg-muted/30 py-14 sm:py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <h2 className="text-lg font-semibold tracking-tight sm:text-xl">En el taller</h2>
          <ul className="mt-8 grid gap-6 md:grid-cols-3">
            {highlights.map(({ icon: Icon, title, body }) => (
              <li
                key={title}
                className="rounded-2xl border border-border/80 bg-card p-5 shadow-sm"
              >
                <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Icon className="size-5" aria-hidden />
                </div>
                <h3 className="mt-4 font-medium leading-snug">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  )
}
