import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { CourseStepMdx } from "@/components/course-step-mdx"
import { CourseStepPagination } from "@/components/course-step-pagination"
import { CourseStepView } from "@/components/course-step-view"
import {
  allStepStaticParams,
  findStep,
  globalStepIndex,
  totalCourseSteps,
} from "@/lib/course-navigation"

type Props = {
  params: Promise<{ section: string; step: string }>
}

export function generateStaticParams() {
  return allStepStaticParams()
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { section, step } = await params
  const found = findStep(section, step)
  if (!found) return { title: "Lección" }
  return {
    title: found.step.title,
    description: found.step.summary,
  }
}

export default async function CourseStepPage({ params }: Props) {
  const { section, step: stepId } = await params
  const found = findStep(section, stepId)
  if (!found) notFound()

  const { section: sec, step } = found
  const idx = globalStepIndex(section, stepId)
  const total = totalCourseSteps()
  const stepNum = idx >= 0 ? idx + 1 : 0
  return (
    <article className="mx-auto w-full min-w-0 max-w-4xl flex-1 px-4 py-8 sm:px-6 sm:py-10">
      <p className="text-xs font-medium text-muted-foreground">
        {sec.navLabel}
        {stepNum > 0 && total > 0 ? (
          <span className="text-muted-foreground/80">
            {" "}
            · Paso {stepNum} de {total}
          </span>
        ) : null}
      </p>
      <h1 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">{step.title}</h1>
      <p className="mt-3 text-pretty leading-relaxed text-muted-foreground">{step.summary}</p>

      <div className="mt-8">
        <CourseStepView
          step={step}
          stepIndex={idx >= 0 ? idx : 0}
          readingMdx={
            step.readingMdxSlug ? <CourseStepMdx slug={step.readingMdxSlug} /> : undefined
          }
        />
      </div>

      <CourseStepPagination sectionId={section} stepId={stepId} />
    </article>
  )
}
