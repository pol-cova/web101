import { ArrowDown, ArrowRight, Database, Globe, Layers } from "lucide-react"

/**
 * Diagrama: interfaz → API → datos (animación suave en flechas; respeta prefers-reduced-motion).
 */
export function DiagramApiBridge() {
  return (
    <figure
      className="mx-auto w-full max-w-lg"
      role="img"
      aria-label="Diagrama: la aplicación envía peticiones a la API, y la API se comunica con los datos del servidor."
    >
      <div className="rounded-2xl border border-border/80 bg-muted/25 p-4 sm:p-5">
        <div className="flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-3">
          <div className="flex flex-1 flex-col items-center gap-2 rounded-xl border border-border/60 bg-card/80 px-3 py-4 text-center shadow-sm">
            <Globe className="size-8 text-primary" aria-hidden />
            <p className="text-xs font-medium text-foreground">Tu app</p>
            <p className="text-[11px] leading-snug text-muted-foreground">
              Pantalla, botones, formularios
            </p>
          </div>

          <div className="flex justify-center py-0.5 sm:px-1">
            <ArrowDown
              className="size-6 text-primary/80 sm:hidden motion-safe:animate-[course-arrow-pulse_1.6s_ease-in-out_infinite] motion-reduce:animate-none"
              aria-hidden
            />
            <ArrowRight
              className="hidden size-6 shrink-0 text-primary/80 sm:block motion-safe:animate-[course-arrow-pulse_1.6s_ease-in-out_infinite_0.2s] motion-reduce:animate-none"
              aria-hidden
            />
          </div>

          <div className="flex flex-1 flex-col items-center gap-2 rounded-xl border border-primary/25 bg-primary/5 px-3 py-4 text-center shadow-sm ring-1 ring-primary/15">
            <Layers className="size-8 text-primary" aria-hidden />
            <p className="text-xs font-semibold text-foreground">API</p>
            <p className="text-[11px] leading-snug text-muted-foreground">
              Ordena, valida y responde
            </p>
          </div>

          <div className="flex justify-center py-0.5 sm:px-1">
            <ArrowDown
              className="size-6 text-primary/80 sm:hidden motion-safe:animate-[course-arrow-pulse_1.6s_ease-in-out_infinite_0.35s] motion-reduce:animate-none"
              aria-hidden
            />
            <ArrowRight
              className="hidden size-6 shrink-0 text-primary/80 sm:block motion-safe:animate-[course-arrow-pulse_1.6s_ease-in-out_infinite_0.45s] motion-reduce:animate-none"
              aria-hidden
            />
          </div>

          <div className="flex flex-1 flex-col items-center gap-2 rounded-xl border border-border/60 bg-card/80 px-3 py-4 text-center shadow-sm">
            <Database className="size-8 text-muted-foreground" aria-hidden />
            <p className="text-xs font-medium text-foreground">Servidor / datos</p>
            <p className="text-[11px] leading-snug text-muted-foreground">
              Base de datos y lógica interna
            </p>
          </div>
        </div>
      </div>
    </figure>
  )
}
