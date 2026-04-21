import type { ComponentType } from "react"

import HandsOnVision from "@/content/course/hands-on/vision-texto-objetos.mdx"
import HandsOnNL from "@/content/course/hands-on/nl-sentimientos.mdx"
import HandsOnFoundation from "@/content/course/hands-on/foundation-generacion.mdx"

/**
 * Mapa slug → componente MDX en `content/course/`.
 * Añade aquí nuevas lecciones y el tipo `CourseMdxSlug` se actualiza solo.
 */
export const courseMdxBySlug = {
  "hands-on/vision-texto-objetos": HandsOnVision,
  "hands-on/nl-sentimientos": HandsOnNL,
  "hands-on/foundation-generacion": HandsOnFoundation,
} as const

export type CourseMdxSlug = keyof typeof courseMdxBySlug

export function getCourseMdx(slug: string): ComponentType | null {
  if (slug in courseMdxBySlug) {
    return courseMdxBySlug[slug as CourseMdxSlug]
  }
  return null
}
