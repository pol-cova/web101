import { cn } from "@/lib/utils"

const socials = [
  {
    label: "GitHub @pol-cova",
    href: "https://github.com/pol-cova",
  },
  {
    label: "paulcontre.com",
    href: "https://paulcontre.com",
  },
  {
    label: "devspartans",
  },
] as const

export function SiteFooter({ className }: { className?: string }) {
  return (
    <footer
      className={cn("border-t border-border/80 py-8 text-center text-muted-foreground", className)}
    >
      <p className="mx-auto max-w-lg px-4 text-sm leading-relaxed text-foreground/90">
        AI Taller — Swift Changemakers Hackathon 2026.
      </p>
      <nav
        aria-label="Enlaces del autor"
        className="mx-auto mt-4 flex max-w-lg flex-wrap items-center justify-center gap-x-1 gap-y-2 px-4 text-sm"
      >
        {socials.map((item, i) => (
          <span key={item.label} className="inline-flex items-center gap-x-1">
            {i > 0 ? (
              <span className="px-1 text-muted-foreground/50" aria-hidden>
                |
              </span>
            ) : null}
            {"href" in item && item.href ? (
              <a
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground underline-offset-4 transition-colors hover:text-foreground hover:underline"
              >
                {item.label}
              </a>
            ) : (
              <span className="text-muted-foreground">{item.label}</span>
            )}
          </span>
        ))}
      </nav>
    </footer>
  )
}
