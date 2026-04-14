import type { ComponentType } from "react"

import ApiPrimerEndpoint from "@/content/course/api/primer-endpoint.mdx"

/**
 * Mapa slug → componente MDX en `content/course/`.
 * Añade aquí nuevas lecciones y el tipo `CourseMdxSlug` se actualiza solo.
 */
export const courseMdxBySlug = {
  "api/primer-endpoint": ApiPrimerEndpoint,
} as const

export type CourseMdxSlug = keyof typeof courseMdxBySlug

export function getCourseMdx(slug: string): ComponentType | null {
  if (slug in courseMdxBySlug) {
    return courseMdxBySlug[slug as CourseMdxSlug]
  }
  return null
}
