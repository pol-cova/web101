/**
 * Diagrama: petición GET y respuesta 200 con JSON (puntos que recorren la línea).
 */
export function DiagramHttpRoundtrip() {
  return (
    <figure
      className="mx-auto w-full max-w-lg"
      role="img"
      aria-label="Diagrama: el navegador envía una petición GET al servidor; el servidor responde con código 200 y cuerpo JSON."
    >
      <div className="rounded-2xl border border-border/80 bg-muted/25 p-4 sm:p-5">
        <div className="grid gap-4 sm:grid-cols-2 sm:gap-3">
          <div className="flex flex-col gap-2 rounded-xl border border-border/60 bg-card/90 px-4 py-3 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Cliente
            </p>
            <div className="flex min-h-[5rem] items-center justify-center rounded-lg border border-dashed border-border bg-muted/15 px-2 text-center text-xs leading-snug text-muted-foreground">
              Navegador o app que hace la petición
            </div>
          </div>
          <div className="flex flex-col gap-2 rounded-xl border border-border/60 bg-card/90 px-4 py-3 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Servidor
            </p>
            <div className="flex min-h-[5rem] items-center justify-center rounded-lg border border-dashed border-border bg-muted/15 px-2 text-center text-xs leading-snug text-muted-foreground">
              Tu API en Next.js
            </div>
          </div>
        </div>

        <div className="mt-8 space-y-8">
          <div>
            <p className="mb-3 text-center text-[11px] font-medium text-foreground">
              Petición — <span className="font-mono text-muted-foreground">GET /api/ejemplo</span>
            </p>
            <div className="relative mx-auto h-10 w-full max-w-sm">
              <div className="absolute top-1/2 right-3 left-3 h-[2px] -translate-y-1/2 rounded-full bg-gradient-to-r from-primary/20 via-border to-primary/30" />
              <div
                className="absolute top-1/2 size-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary shadow-md motion-safe:animate-[course-dot-move_2.8s_ease-in-out_infinite] motion-reduce:left-1/2 motion-reduce:animate-none"
                aria-hidden
              />
            </div>
            <p className="mt-2 text-center text-[10px] text-muted-foreground">
              El cliente «llama» al recurso en el servidor
            </p>
          </div>

          <div>
            <p className="mb-3 text-center text-[11px] font-medium text-foreground">
              Respuesta — <span className="font-mono text-muted-foreground">200</span> y cuerpo{" "}
              <span className="font-mono text-muted-foreground">JSON</span>
            </p>
            <div className="relative mx-auto h-10 w-full max-w-sm">
              <div className="absolute top-1/2 right-3 left-3 h-[2px] -translate-y-1/2 rounded-full bg-gradient-to-r from-emerald-500/30 via-border to-emerald-600/25" />
              <div
                className="absolute top-1/2 size-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-500 shadow-md motion-safe:animate-[course-dot-move-reverse_2.8s_ease-in-out_infinite] motion-reduce:left-1/2 motion-reduce:animate-none"
                aria-hidden
              />
            </div>
            <p className="mt-2 text-center text-[10px] text-muted-foreground">
              El servidor devuelve estado y datos
            </p>
          </div>
        </div>
      </div>
    </figure>
  )
}
