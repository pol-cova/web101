import { ArrowRight, Brain, Camera, Eye, Layers, MessageSquare, Sliders } from "lucide-react"

/**
 * Diagrama: Pipeline combinado multi-framework.
 * Muestra cómo Vision + Core ML y Natural Language + Foundation Models trabajan juntos.
 */
export function DiagramCombinedPipeline() {
  return (
    <figure
      className="mx-auto w-full max-w-2xl"
      role="img"
      aria-label="Diagrama de pipelines combinados: Vision detecta una imagen, Core ML la clasifica; Natural Language analiza texto, Foundation Models genera una respuesta."
    >
      <div className="rounded-2xl border border-border/80 bg-muted/25 p-4 sm:p-5">
        <p className="mb-4 text-center text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          Patrones de combinación de frameworks
        </p>

        {/* Pipeline 1: Vision + Core ML */}
        <div className="mb-5">
          <p className="mb-3 text-center text-xs font-medium text-foreground">Pipeline 1: Ver + Clasificar</p>
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
            <div className="flex flex-col items-center gap-1.5 rounded-lg border border-border/60 bg-card/80 px-3 py-2 text-center">
              <Camera className="size-5 text-primary" aria-hidden />
              <p className="text-[10px] font-medium">Cámara</p>
            </div>

            <ArrowRight className="size-4 text-primary/60" aria-hidden />

            <div className="flex flex-col items-center gap-1.5 rounded-lg border border-emerald-500/25 bg-emerald-500/5 px-3 py-2 text-center">
              <Eye className="size-5 text-emerald-600" aria-hidden />
              <p className="text-[10px] font-semibold text-emerald-700 dark:text-emerald-400">Vision</p>
              <p className="text-[9px] text-muted-foreground">Detecta región</p>
            </div>

            <ArrowRight className="size-4 text-primary/60" aria-hidden />

            <div className="flex flex-col items-center gap-1.5 rounded-lg border border-orange-500/25 bg-orange-500/5 px-3 py-2 text-center">
              <Sliders className="size-5 text-orange-600" aria-hidden />
              <p className="text-[10px] font-semibold text-orange-700 dark:text-orange-400">Core ML</p>
              <p className="text-[9px] text-muted-foreground">Clasifica</p>
            </div>

            <ArrowRight className="size-4 text-primary/60" aria-hidden />

            <div className="flex flex-col items-center gap-1.5 rounded-lg border border-primary/25 bg-primary/5 px-3 py-2 text-center">
              <Layers className="size-5 text-primary" aria-hidden />
              <p className="text-[10px] font-semibold">UI</p>
              <p className="text-[9px] text-muted-foreground">Resultado</p>
            </div>
          </div>
        </div>

        <div className="my-4 border-t border-border/60" />

        {/* Pipeline 2: NL + Foundation Models */}
        <div>
          <p className="mb-3 text-center text-xs font-medium text-foreground">Pipeline 2: Analizar + Generar</p>
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
            <div className="flex flex-col items-center gap-1.5 rounded-lg border border-border/60 bg-card/80 px-3 py-2 text-center">
              <MessageSquare className="size-5 text-primary" aria-hidden />
              <p className="text-[10px] font-medium">Texto</p>
            </div>

            <ArrowRight className="size-4 text-primary/60" aria-hidden />

            <div className="flex flex-col items-center gap-1.5 rounded-lg border border-blue-500/25 bg-blue-500/5 px-3 py-2 text-center">
              <MessageSquare className="size-5 text-blue-600" aria-hidden />
              <p className="text-[10px] font-semibold text-blue-700 dark:text-blue-400">NL</p>
              <p className="text-[9px] text-muted-foreground">Sentimiento</p>
            </div>

            <ArrowRight className="size-4 text-primary/60" aria-hidden />

            <div className="flex flex-col items-center gap-1.5 rounded-lg border border-purple-500/25 bg-purple-500/5 px-3 py-2 text-center">
              <Brain className="size-5 text-purple-600" aria-hidden />
              <p className="text-[10px] font-semibold text-purple-700 dark:text-purple-400">Foundation</p>
              <p className="text-[9px] text-muted-foreground">Genera respuesta</p>
            </div>

            <ArrowRight className="size-4 text-primary/60" aria-hidden />

            <div className="flex flex-col items-center gap-1.5 rounded-lg border border-primary/25 bg-primary/5 px-3 py-2 text-center">
              <Layers className="size-5 text-primary" aria-hidden />
              <p className="text-[10px] font-semibold">UI</p>
              <p className="text-[9px] text-muted-foreground">Consejo personalizado</p>
            </div>
          </div>
        </div>
      </div>
    </figure>
  )
}
