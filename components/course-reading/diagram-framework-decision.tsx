import { Brain, Eye, GitBranch, MessageSquare, Search, Sliders } from "lucide-react"

/**
 * Diagrama: Árbol de decisión para elegir framework de IA on-device.
 * Guía visual para decidir entre Vision, NL, Core ML y Foundation Models.
 */
export function DiagramFrameworkDecision() {
  return (
    <figure
      className="mx-auto w-full max-w-2xl"
      role="img"
      aria-label="Diagrama de decisión: según el tipo de entrada y el objetivo, se elige Vision, Natural Language, Core ML o Foundation Models."
    >
      <div className="rounded-2xl border border-border/80 bg-muted/25 p-4 sm:p-5">
        {/* Pregunta inicial */}
        <div className="mx-auto max-w-xs">
          <div className="flex flex-col items-center gap-2 rounded-xl border border-primary/25 bg-primary/5 px-4 py-3 text-center shadow-sm">
            <GitBranch className="size-6 text-primary" aria-hidden />
            <p className="text-sm font-semibold text-foreground">¿Qué tipo de datos tienes?</p>
          </div>
        </div>

        {/* Conectores */}
        <div className="relative mx-auto h-8 w-full max-w-lg">
          <div className="absolute top-0 left-1/4 h-full w-[2px] bg-border" />
          <div className="absolute top-0 right-1/4 h-full w-[2px] bg-border" />
          <div className="absolute top-1/2 right-1/4 left-1/4 h-[2px] bg-border" />
        </div>

        {/* Primera fila: Imagen vs Texto */}
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col items-center gap-2">
            <div className="w-full rounded-lg border border-border/60 bg-card/80 px-3 py-2 text-center">
              <Eye className="mx-auto size-5 text-primary" aria-hidden />
              <p className="mt-1 text-xs font-medium">Imagen / Video</p>
            </div>
            <div className="h-6 w-[2px] bg-border" />
            <div className="w-full rounded-lg border border-emerald-500/25 bg-emerald-500/5 px-3 py-2 text-center">
              <Eye className="mx-auto size-5 text-emerald-600" aria-hidden />
              <p className="mt-1 text-xs font-semibold text-emerald-700 dark:text-emerald-400">Vision</p>
              <p className="text-[10px] text-muted-foreground">OCR, rostros, objetos</p>
            </div>
            <div className="h-4 w-[2px] bg-border" />
            <div className="w-full rounded-lg border border-dashed border-border bg-muted/15 px-2 py-1.5 text-center">
              <p className="text-[10px] text-muted-foreground">¿Modelo custom?</p>
            </div>
            <div className="h-4 w-[2px] bg-border" />
            <div className="w-full rounded-lg border border-orange-500/25 bg-orange-500/5 px-3 py-2 text-center">
              <Sliders className="mx-auto size-4 text-orange-600" aria-hidden />
              <p className="text-[10px] font-semibold text-orange-700 dark:text-orange-400">Core ML</p>
            </div>
          </div>

          <div className="flex flex-col items-center gap-2">
            <div className="w-full rounded-lg border border-border/60 bg-card/80 px-3 py-2 text-center">
              <MessageSquare className="mx-auto size-5 text-primary" aria-hidden />
              <p className="mt-1 text-xs font-medium">Texto</p>
            </div>
            <div className="h-6 w-[2px] bg-border" />
            <div className="w-full rounded-lg border border-blue-500/25 bg-blue-500/5 px-3 py-2 text-center">
              <MessageSquare className="mx-auto size-5 text-blue-600" aria-hidden />
              <p className="mt-1 text-xs font-semibold text-blue-700 dark:text-blue-400">Natural Language</p>
              <p className="text-[10px] text-muted-foreground">Sentimiento, idioma</p>
            </div>
            <div className="h-4 w-[2px] bg-border" />
            <div className="w-full rounded-lg border border-dashed border-border bg-muted/15 px-2 py-1.5 text-center">
              <p className="text-[10px] text-muted-foreground">¿Generar / Razonar?</p>
            </div>
            <div className="h-4 w-[2px] bg-border" />
            <div className="w-full rounded-lg border border-purple-500/25 bg-purple-500/5 px-3 py-2 text-center">
              <Brain className="mx-auto size-4 text-purple-600" aria-hidden />
              <p className="text-[10px] font-semibold text-purple-700 dark:text-purple-400">Foundation Models</p>
            </div>
          </div>
        </div>

        {/* Nota */}
        <div className="mt-4 rounded-lg border border-dashed border-border bg-muted/15 px-3 py-2 text-center">
          <p className="text-[11px] text-muted-foreground">
            <Search className="inline-block size-3 mr-1 align-text-bottom" aria-hidden />
            Si ninguno cubre tu caso exacto, combina frameworks (ver Parte 3).
          </p>
        </div>
      </div>
    </figure>
  )
}
