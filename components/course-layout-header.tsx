"use client"

import Link from "next/link"

import { SidebarTrigger, useSidebar } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"

export function CourseLayoutHeader() {
  const { open, isMobile } = useSidebar()

  const triggerLabel = isMobile
    ? "Menú"
    : open
      ? "Ocultar"
      : "Lecciones"

  const triggerTitle = isMobile
    ? "Abrir menú de lecciones"
    : open
      ? "Ocultar panel de lecciones y ampliar el contenido"
      : "Mostrar lista de lecciones"

  return (
    <header className="sticky top-0 z-40 flex min-h-14 shrink-0 flex-wrap items-center gap-x-2 gap-y-2 border-b border-border bg-background/95 px-3 py-2 backdrop-blur-md supports-[backdrop-filter]:bg-background/75 sm:gap-3 sm:px-4">
      <div className="flex min-w-0 items-center gap-2">
        <SidebarTrigger
          className="touch-manipulation"
          label={triggerLabel}
          title={triggerTitle}
          aria-label={triggerTitle}
        />
      </div>
      <Separator orientation="vertical" className="hidden h-6 md:block" />
      <Link
        href="/"
        className="min-w-0 flex-1 text-sm text-muted-foreground transition-colors hover:text-foreground md:flex-initial"
      >
        Volver al inicio
      </Link>
    </header>
  )
}
