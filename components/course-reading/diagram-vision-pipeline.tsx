import { ArrowDown, Camera, Eye, FileText, ImageIcon, Layers } from "lucide-react"

/**
 * Diagrama: Pipeline de procesamiento con Vision.
 * Muestra el flujo desde la cámara hasta el resultado de texto en la UI.
 */
export function DiagramVisionPipeline() {
  return (
    <figure
      className="mx-auto w-full max-w-xl"
      role="img"
      aria-label="Diagrama del pipeline de Vision: cámara captura frame, se convierte a pixel buffer, Vision ejecuta OCR, y el resultado se muestra en la interfaz."
    >
      <div className="rounded-2xl border border-border/80 bg-muted/25 p-4 sm:p-5">
        <p className="mb-4 text-center text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          Pipeline Vision — OCR en tiempo real
        </p>

        <div className="flex flex-col items-center gap-3">
          {/* Paso 1: Cámara */}
          <div className="flex w-full max-w-xs flex-col items-center gap-2 rounded-xl border border-border/60 bg-card/80 px-4 py-3 text-center shadow-sm">
            <Camera className="size-7 text-primary" aria-hidden />
            <p className="text-xs font-medium">Cámara</p>
            <p className="text-[10px] text-muted-foreground">AVCaptureSession</p>
          </div>

          <ArrowDown className="size-5 text-primary/60" aria-hidden />

          {/* Paso 2: Frame */}
          <div className="flex w-full max-w-xs flex-col items-center gap-2 rounded-xl border border-border/60 bg-card/80 px-4 py-3 text-center shadow-sm">
            <ImageIcon className="size-7 text-primary" aria-hidden />
            <p className="text-xs font-medium">Frame</p>
            <p className="text-[10px] text-muted-foreground">CMSampleBuffer → CVPixelBuffer</p>
          </div>

          <ArrowDown className="size-5 text-primary/60" aria-hidden />

          {/* Paso 3: Vision Request */}
          <div className="flex w-full max-w-xs flex-col items-center gap-2 rounded-xl border border-emerald-500/25 bg-emerald-500/5 px-4 py-3 text-center shadow-sm ring-1 ring-emerald-500/15">
            <Eye className="size-7 text-emerald-600" aria-hidden />
            <p className="text-xs font-semibold text-emerald-700 dark:text-emerald-400">Vision Request</p>
            <p className="text-[10px] text-muted-foreground">VNRecognizeTextRequest</p>
            <div className="flex gap-2 pt-1">
              <span className="rounded bg-emerald-500/15 px-1.5 py-0.5 text-[9px] font-medium text-emerald-700 dark:text-emerald-400">.accurate</span>
              <span className="rounded bg-emerald-500/15 px-1.5 py-0.5 text-[9px] font-medium text-emerald-700 dark:text-emerald-400">.fast</span>
            </div>
          </div>

          <ArrowDown className="size-5 text-primary/60" aria-hidden />

          {/* Paso 4: Resultados */}
          <div className="flex w-full max-w-xs flex-col items-center gap-2 rounded-xl border border-border/60 bg-card/80 px-4 py-3 text-center shadow-sm">
            <FileText className="size-7 text-primary" aria-hidden />
            <p className="text-xs font-medium">Resultados</p>
            <p className="text-[10px] text-muted-foreground">[VNRecognizedTextObservation]</p>
          </div>

          <ArrowDown className="size-5 text-primary/60" aria-hidden />

          {/* Paso 5: UI */}
          <div className="flex w-full max-w-xs flex-col items-center gap-2 rounded-xl border border-primary/25 bg-primary/5 px-4 py-3 text-center shadow-sm">
            <Layers className="size-7 text-primary" aria-hidden />
            <p className="text-xs font-semibold text-foreground">SwiftUI</p>
            <p className="text-[10px] text-muted-foreground">Lista de textos detectados</p>
          </div>
        </div>
      </div>
    </figure>
  )
}
