import { cn } from "@/lib/utils"

export function SiteFooter({ className }: { className?: string }) {
  return (
    <footer
      className={cn("border-t border-border/80 py-8 text-center text-muted-foreground", className)}
    >
      <p className="mx-auto max-w-lg px-4 text-sm leading-relaxed">
        Curso introductorio: Next.js como stack fullstack y Prisma para modelar y consultar datos.
      </p>
    </footer>
  )
}
