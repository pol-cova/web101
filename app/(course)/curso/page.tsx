import { redirect } from "next/navigation"

import { courseSections } from "@/lib/course-data"
import { courseStepPath } from "@/lib/course-navigation"

export default function CursoIndexPage() {
  const first = courseSections[0]?.steps[0]
  const sectionId = courseSections[0]?.id
  if (!first || !sectionId) redirect("/")
  redirect(courseStepPath(sectionId, first.id))
}
