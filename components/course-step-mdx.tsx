import { createElement } from "react"

import { getCourseMdx } from "@/lib/course-mdx-registry"
import type { CourseMdxSlug } from "@/lib/course-mdx-registry"

/** Resuelve el MDX del paso sin instanciar `<Variable />` en la página (regla eslint de componentes estáticos). */
export function CourseStepMdx({ slug }: { slug: CourseMdxSlug }) {
  const Comp = getCourseMdx(slug)
  if (!Comp) return null
  return createElement(Comp)
}
