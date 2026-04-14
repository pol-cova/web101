import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { getAdjacentStepPaths } from "@/lib/course-navigation"

type CourseStepPaginationProps = {
  sectionId: string
  stepId: string
}

export function CourseStepPagination({ sectionId, stepId }: CourseStepPaginationProps) {
  const { prev, next } = getAdjacentStepPaths(sectionId, stepId)

  return (
    <nav
      className="mt-10 flex flex-wrap items-center justify-between gap-3 border-t border-border pt-6"
      aria-label="Navegación entre lecciones"
    >
      {prev ? (
        <Button variant="outline" asChild>
          <Link href={prev}>
            <ChevronLeft className="size-4" data-icon="inline-start" aria-hidden />
            Anterior
          </Link>
        </Button>
      ) : (
        <span />
      )}
      {next ? (
        <Button asChild>
          <Link href={next}>
            Siguiente
            <ChevronRight className="size-4" data-icon="inline-end" aria-hidden />
          </Link>
        </Button>
      ) : (
        <span />
      )}
    </nav>
  )
}
