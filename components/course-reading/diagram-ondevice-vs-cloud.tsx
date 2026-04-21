import { CloudOff, Globe, Lock, Server, Smartphone, Zap } from "lucide-react"

/**
 * Diagrama: IA On-Device vs IA en la Nube
 * Muestra el flujo de datos y las diferencias clave para explicar por qué on-device.
 */
export function DiagramOnDeviceVsCloud() {
  return (
    <figure
      className="mx-auto w-full max-w-2xl"
      role="img"
      aria-label="Diagrama comparativo: IA on-device mantiene los datos en el teléfono, mientras que la IA en la nube envía datos a servidores remotos."
    >
      <div className="rounded-2xl border border-border/80 bg-muted/25 p-4 sm:p-5">
        <div className="grid gap-4 sm:grid-cols-2">
          {/* On-Device */}
          <div className="flex flex-col gap-3 rounded-xl border border-emerald-500/25 bg-emerald-500/5 px-4 py-4 shadow-sm">
            <div className="flex items-center gap-2">
              <Smartphone className="size-5 text-emerald-600" aria-hidden />
              <p className="text-sm font-semibold text-emerald-700 dark:text-emerald-400">IA On-Device</p>
            </div>
            
            <div className="flex flex-col items-center gap-2 rounded-lg border border-dashed border-emerald-500/30 bg-emerald-500/10 px-3 py-3 text-center">
              <Smartphone className="size-8 text-emerald-600" aria-hidden />
              <p className="text-xs font-medium text-emerald-700 dark:text-emerald-400">Tu App</p>
            </div>
            
            <div className="flex justify-center">
              <div className="flex flex-col items-center gap-1">
                <Lock className="size-4 text-emerald-500" aria-hidden />
                <p className="text-[10px] text-emerald-600">Datos seguros</p>
              </div>
            </div>
            
            <div className="flex flex-col items-center gap-2 rounded-lg border border-dashed border-emerald-500/30 bg-emerald-500/10 px-3 py-3 text-center">
              <CpuIcon className="size-8 text-emerald-600" aria-hidden />
              <p className="text-xs font-medium text-emerald-700 dark:text-emerald-400">Neural Engine</p>
            </div>
            
            <div className="space-y-1.5 pt-1">
              <div className="flex items-center gap-2 text-[11px] text-emerald-700 dark:text-emerald-400">
                <Zap className="size-3 shrink-0" aria-hidden />
                <span>Latencia &lt; 50ms</span>
              </div>
              <div className="flex items-center gap-2 text-[11px] text-emerald-700 dark:text-emerald-400">
                <CloudOff className="size-3 shrink-0" aria-hidden />
                <span>Funciona sin internet</span>
              </div>
              <div className="flex items-center gap-2 text-[11px] text-emerald-700 dark:text-emerald-400">
                <Lock className="size-3 shrink-0" aria-hidden />
                <span>Privacidad total</span>
              </div>
            </div>
          </div>

          {/* Cloud */}
          <div className="flex flex-col gap-3 rounded-xl border border-border/60 bg-card/80 px-4 py-4 shadow-sm opacity-80">
            <div className="flex items-center gap-2">
              <Globe className="size-5 text-muted-foreground" aria-hidden />
              <p className="text-sm font-semibold text-muted-foreground">IA en la Nube</p>
            </div>
            
            <div className="flex flex-col items-center gap-2 rounded-lg border border-dashed border-border bg-muted/15 px-3 py-3 text-center">
              <Smartphone className="size-8 text-muted-foreground" aria-hidden />
              <p className="text-xs font-medium text-muted-foreground">Tu App</p>
            </div>
            
            <div className="flex items-center justify-center gap-2">
              <div className="h-[2px] flex-1 bg-gradient-to-r from-transparent via-border to-border" />
              <Globe className="size-4 text-muted-foreground" aria-hidden />
              <div className="h-[2px] flex-1 bg-gradient-to-l from-transparent via-border to-border" />
            </div>
            
            <div className="flex flex-col items-center gap-2 rounded-lg border border-dashed border-border bg-muted/15 px-3 py-3 text-center">
              <Server className="size-8 text-muted-foreground" aria-hidden />
              <p className="text-xs font-medium text-muted-foreground">Servidor Remoto</p>
            </div>
            
            <div className="space-y-1.5 pt-1">
              <div className="flex items-center gap-2 text-[11px] text-muted-foreground">
                <Zap className="size-3 shrink-0" aria-hidden />
                <span>Latencia 200-1000ms</span>
              </div>
              <div className="flex items-center gap-2 text-[11px] text-muted-foreground">
                <Globe className="size-3 shrink-0" aria-hidden />
                <span>Requiere conexión</span>
              </div>
              <div className="flex items-center gap-2 text-[11px] text-muted-foreground">
                <Lock className="size-3 shrink-0" aria-hidden />
                <span>Datos en terceros</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </figure>
  )
}

function CpuIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <rect x="4" y="4" width="16" height="16" rx="2" />
      <rect x="9" y="9" width="6" height="6" />
      <path d="M15 2v2" /><path d="M15 20v2" /><path d="M2 15h2" /><path d="M2 9h2" />
      <path d="M20 15h2" /><path d="M20 9h2" /><path d="M9 2v2" /><path d="M9 20v2" />
    </svg>
  )
}
