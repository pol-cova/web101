import type { ComponentType } from "react"

import ApiErPosSimple from "@/content/course/api/er-pos-simple.mdx"
import ApiPrimerCrudProductos from "@/content/course/api/primer-crud-productos.mdx"
import ApiPrimerEndpoint from "@/content/course/api/primer-endpoint.mdx"
import ApiPrismaCliente from "@/content/course/api/prisma-cliente.mdx"
import ApiPrismaEsquemaTpv from "@/content/course/api/prisma-esquema-tpv.mdx"

/**
 * Mapa slug → componente MDX en `content/course/`.
 * Añade aquí nuevas lecciones y el tipo `CourseMdxSlug` se actualiza solo.
 */
export const courseMdxBySlug = {
  "api/er-pos-simple": ApiErPosSimple,
  "api/primer-endpoint": ApiPrimerEndpoint,
  "api/prisma-cliente": ApiPrismaCliente,
  "api/prisma-esquema-tpv": ApiPrismaEsquemaTpv,
  "api/primer-crud-productos": ApiPrimerCrudProductos,
} as const

export type CourseMdxSlug = keyof typeof courseMdxBySlug

export function getCourseMdx(slug: string): ComponentType | null {
  if (slug in courseMdxBySlug) {
    return courseMdxBySlug[slug as CourseMdxSlug]
  }
  return null
}
