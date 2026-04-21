import Link from "next/link"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function SiteHeader({ className }: { className?: string }) {
  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b border-border/80 bg-background/80 backdrop-blur-md",
        className
      )}
    >
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link href="/" className="font-semibold tracking-tight text-foreground">
          AI Taller
        </Link>
        <nav className="flex items-center gap-1 sm:gap-2" aria-label="Principal">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/">Inicio</Link>
          </Button>
          <Button size="sm" asChild>
            <Link href="/curso">Taller</Link>
          </Button>
        </nav>
      </div>
    </header>
  )
}
