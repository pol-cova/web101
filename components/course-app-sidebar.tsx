"use client"

import { Fragment } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { BookOpen, Check, Home } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarSeparator,
} from "@/components/ui/sidebar"
import { courseSections } from "@/lib/course-data"
import { useCourseProgress } from "@/hooks/use-course-progress"
import {
  courseStepPath,
  globalStepIndex,
  globalStepOrdinalLabel,
  sectionStepOrdinalLabel,
} from "@/lib/course-navigation"
import { cn } from "@/lib/utils"

export function CourseAppSidebar() {
  const pathname = usePathname()
  const progress = useCourseProgress()

  return (
    <Sidebar
      collapsible="icon"
      className="[--sidebar-width:clamp(17rem,min(92vw,20rem),22rem)] md:[--sidebar-width:19.5rem]"
    >
      <SidebarHeader className="gap-3 border-b border-sidebar-border px-2 py-3 max-md:px-0 sm:py-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="Inicio">
              <Link href="/" aria-label="Inicio">
                <Home />
                <span className="group-data-[collapsible=icon]:hidden">Web101</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
        <p className="px-2 text-xs leading-snug text-sidebar-foreground/70 group-data-[collapsible=icon]:hidden">
          Curso: entorno local, API, HTTP, datos y Prisma.
        </p>
      </SidebarHeader>
      <SidebarContent className="overflow-x-hidden overflow-y-auto px-2 max-md:px-0">
        <SidebarGroup className="px-0">
          <SidebarGroupLabel className="flex items-center gap-2 px-0">
            <BookOpen className="size-4 shrink-0" aria-hidden />
            <span className="truncate">Lecciones</span>
          </SidebarGroupLabel>
          <SidebarGroupContent className="flex flex-col gap-5 sm:gap-6">
            {courseSections.map((section, sectionIndex) => {
              const totalInSection = section.steps.length
              const doneInSection = section.steps.filter((st) => progress[st.id]).length
              const modulePct = totalInSection ? (doneInSection / totalInSection) * 100 : 0

              return (
                <Fragment key={section.id}>
                  {sectionIndex > 0 ? (
                    <SidebarSeparator className="hidden group-data-[collapsible=icon]:block" />
                  ) : null}
                  <div className="min-w-0">
                    <p id={`nav-section-${section.id}`} className="sr-only">
                      {section.navLabel}
                    </p>
                    <div
                      className="mb-2 px-0 group-data-[collapsible=icon]:hidden"
                      aria-hidden
                    >
                      <div className="flex min-w-0 items-baseline justify-between gap-2">
                        <p className="min-w-0 truncate text-[11px] font-semibold uppercase tracking-wide text-sidebar-foreground/90">
                          {section.navLabel}
                        </p>
                        <span
                          className="shrink-0 text-[10px] font-medium tabular-nums text-sidebar-foreground/70"
                          title={`${doneInSection} de ${totalInSection} lecciones en este módulo`}
                        >
                          {doneInSection}/{totalInSection}
                        </span>
                      </div>
                      <div
                        className="mt-2 h-1 w-full overflow-hidden rounded-full bg-sidebar-accent/35"
                        role="progressbar"
                        aria-valuenow={doneInSection}
                        aria-valuemin={0}
                        aria-valuemax={totalInSection}
                        aria-label={`Progreso del módulo: ${doneInSection} de ${totalInSection}`}
                      >
                        <div
                          className="h-full rounded-full bg-emerald-500 transition-[width] duration-300"
                          style={{ width: `${modulePct}%` }}
                        />
                      </div>
                    </div>
                    <SidebarMenu aria-labelledby={`nav-section-${section.id}`}>
                      {section.steps.map((step) => {
                        const href = courseStepPath(section.id, step.id)
                        const active = pathname === href
                        const globalOrd = globalStepOrdinalLabel(section.id, step.id)
                        const sectionOrd = sectionStepOrdinalLabel(section.id, step.id)
                        const done = Boolean(progress[step.id])
                        const stepNo = globalStepIndex(section.id, step.id) + 1
                        const badgeTitle = [
                          step.title,
                          globalOrd ? `Curso ${globalOrd}` : "",
                          sectionOrd ? `Módulo ${sectionOrd}` : "",
                          done ? "Completada" : "Pendiente",
                        ]
                          .filter(Boolean)
                          .join(" · ")

                        return (
                          <SidebarMenuItem key={step.id}>
                            <SidebarMenuButton
                              asChild
                              isActive={active}
                              tooltip={badgeTitle}
                              className="items-start py-2 sm:py-2.5 group-data-[collapsible=icon]:!size-8 group-data-[collapsible=icon]:!items-center group-data-[collapsible=icon]:!p-2 group-data-[collapsible=icon]:!py-2"
                            >
                              <Link
                                href={href}
                                aria-current={active ? "page" : undefined}
                                aria-label={step.title}
                                className={cn(
                                  "flex w-full min-w-0 items-start gap-2 text-left sm:gap-2.5",
                                  "group-data-[collapsible=icon]:items-center group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:gap-0"
                                )}
                                title={badgeTitle}
                              >
                                <span
                                  className={cn(
                                    "hidden size-7 shrink-0 items-center justify-center rounded-md border text-[11px] font-semibold tabular-nums leading-none transition-colors",
                                    "group-data-[collapsible=icon]:inline-flex",
                                    done
                                      ? "border-emerald-500/45 bg-emerald-500/15 text-emerald-400"
                                      : "border-sidebar-border bg-sidebar-accent/35 text-sidebar-foreground"
                                  )}
                                  aria-hidden
                                >
                                  {stepNo}
                                </span>
                                <span className="min-w-0 flex-1 whitespace-normal text-balance text-sm leading-snug line-clamp-3 break-words [overflow-wrap:anywhere] group-data-[collapsible=icon]:hidden sm:line-clamp-2">
                                  {step.title}
                                </span>
                                {done ? (
                                  <Check
                                    className="mt-0.5 size-4 shrink-0 text-emerald-500 group-data-[collapsible=icon]:hidden"
                                    strokeWidth={2.5}
                                    aria-hidden
                                  />
                                ) : null}
                              </Link>
                            </SidebarMenuButton>
                          </SidebarMenuItem>
                        )
                      })}
                    </SidebarMenu>
                  </div>
                </Fragment>
              )
            })}
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarSeparator />
      <SidebarRail />
    </Sidebar>
  )
}
