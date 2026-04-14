import { courseSections } from "@/lib/course-data"

export function courseStepPath(sectionId: string, stepId: string) {
  return `/curso/${sectionId}/${stepId}`
}

export function findStep(sectionId: string, stepId: string) {
  const section = courseSections.find((s) => s.id === sectionId)
  if (!section) return null
  const step = section.steps.find((st) => st.id === stepId)
  if (!step) return null
  return { section, step }
}

export function getAdjacentStepPaths(sectionId: string, stepId: string) {
  const flat = courseSections.flatMap((sec) =>
    sec.steps.map((step) => ({ sectionId: sec.id, stepId: step.id }))
  )
  const idx = flat.findIndex((x) => x.sectionId === sectionId && x.stepId === stepId)
  if (idx === -1) return { prev: null as string | null, next: null as string | null }
  const prev = idx > 0 ? flat[idx - 1] : null
  const next = idx < flat.length - 1 ? flat[idx + 1] : null
  return {
    prev: prev ? courseStepPath(prev.sectionId, prev.stepId) : null,
    next: next ? courseStepPath(next.sectionId, next.stepId) : null,
  }
}

export function allStepStaticParams() {
  return courseSections.flatMap((s) => s.steps.map((step) => ({ section: s.id, step: step.id })))
}

export function globalStepIndex(sectionId: string, stepId: string) {
  let n = 0
  for (const sec of courseSections) {
    for (const st of sec.steps) {
      if (sec.id === sectionId && st.id === stepId) return n
      n += 1
    }
  }
  return -1
}

export function totalCourseSteps() {
  return courseSections.reduce((acc, s) => acc + s.steps.length, 0)
}

/** Etiqueta tipo "2/4" para el menú lateral (paso global en el curso). */
export function globalStepOrdinalLabel(sectionId: string, stepId: string) {
  const idx = globalStepIndex(sectionId, stepId)
  if (idx < 0) return null
  const total = totalCourseSteps()
  return `${idx + 1}/${total}`
}

/** Posición dentro del bloque (p. ej. "1/2" en Entorno local). */
export function sectionStepOrdinalLabel(sectionId: string, stepId: string) {
  const section = courseSections.find((s) => s.id === sectionId)
  if (!section) return null
  const pos = section.steps.findIndex((st) => st.id === stepId)
  if (pos < 0) return null
  return `${pos + 1}/${section.steps.length}`
}
