import { ArrowDown, Brain, FileJson, MessageSquare, Puzzle, Wand2, Zap } from "lucide-react"

/**
 * Diagrama: Arquitectura de Foundation Models.
 * Muestra las capacidades principales: generación, structured output, tool calling y streaming.
 */
export function DiagramFoundationModelsArch() {
  return (
    <figure
      className="mx-auto w-full max-w-2xl"
      role="img"
      aria-label="Diagrama de Foundation Models: sesión de lenguaje con cuatro capacidades principales: generación de texto, salida estructurada, llamada a herramientas y streaming."
    >
      <div className="rounded-2xl border border-border/80 bg-muted/25 p-4 sm:p-5">
        <p className="mb-4 text-center text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          Arquitectura Foundation Models (iOS 26+)
        </p>

        {/* Centro: Sesión */}
        <div className="mx-auto max-w-xs">
          <div className="flex flex-col items-center gap-2 rounded-xl border border-purple-500/25 bg-purple-500/5 px-4 py-4 text-center shadow-sm ring-1 ring-purple-500/15">
            <Brain className="size-8 text-purple-600" aria-hidden />
            <p className="text-sm font-semibold text-purple-700 dark:text-purple-400">LanguageModelSession</p>
            <p className="text-[10px] text-muted-foreground">Contexto + Instructions + Historial</p>
          </div>
        </div>

        {/* Conectores hacia abajo */}
        <div className="relative mx-auto h-6 w-full max-w-lg">
          <div className="absolute top-0 left-[12.5%] h-full w-[2px] bg-border" />
          <div className="absolute top-0 left-[37.5%] h-full w-[2px] bg-border" />
          <div className="absolute top-0 left-[62.5%] h-full w-[2px] bg-border" />
          <div className="absolute top-0 left-[87.5%] h-full w-[2px] bg-border" />
        </div>

        {/* Cuatro capacidades */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          <div className="flex flex-col items-center gap-2 rounded-lg border border-border/60 bg-card/80 px-2 py-3 text-center">
            <MessageSquare className="size-5 text-primary" aria-hidden />
            <p className="text-[11px] font-semibold">Generación</p>
            <p className="text-[9px] text-muted-foreground">respond(to:)</p>
            <p className="text-[9px] text-muted-foreground">Texto libre</p>
          </div>

          <div className="flex flex-col items-center gap-2 rounded-lg border border-border/60 bg-card/80 px-2 py-3 text-center">
            <FileJson className="size-5 text-primary" aria-hidden />
            <p className="text-[11px] font-semibold">Estructurado</p>
            <p className="text-[9px] text-muted-foreground">@Generable</p>
            <p className="text-[9px] text-muted-foreground">Tipos Swift</p>
          </div>

          <div className="flex flex-col items-center gap-2 rounded-lg border border-border/60 bg-card/80 px-2 py-3 text-center">
            <Puzzle className="size-5 text-primary" aria-hidden />
            <p className="text-[11px] font-semibold">Tool Calling</p>
            <p className="text-[9px] text-muted-foreground">Tool protocol</p>
            <p className="text-[9px] text-muted-foreground">Código propio</p>
          </div>

          <div className="flex flex-col items-center gap-2 rounded-lg border border-border/60 bg-card/80 px-2 py-3 text-center">
            <Zap className="size-5 text-primary" aria-hidden />
            <p className="text-[11px] font-semibold">Streaming</p>
            <p className="text-[9px] text-muted-foreground">streamResponse</p>
            <p className="text-[9px] text-muted-foreground">UI progresiva</p>
          </div>
        </div>

        {/* Flujo de datos */}
        <div className="mt-4 flex items-center justify-center gap-2">
          <ArrowDown className="size-4 text-muted-foreground" aria-hidden />
          <p className="text-[11px] text-muted-foreground">Todo en el Neural Engine — sin conexión a internet</p>
        </div>
      </div>
    </figure>
  )
}
