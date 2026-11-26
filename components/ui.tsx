import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { Reveal } from "@/components/reveal"

export function Section({ id, eyebrow, title, intro, children, className }: {
  id?: string
  eyebrow: string
  title: string
  intro?: string
  children: React.ReactNode
  className?: string
}) {
  return (
    <section id={id} className={cn("border-t border-hair py-20 md:py-24", className)}>
      <div className="mx-auto max-w-[1160px] px-5 md:px-8">
        <Reveal className="mb-10 max-w-[720px]">
          <p className="eyebrow">{eyebrow}</p>
          <h2 className="mt-2 text-[28px] font-bold leading-tight tracking-[-0.01em] text-ink md:text-[34px]">{title}</h2>
          {intro && <p className="mt-3 text-[16px] leading-relaxed text-ink-700">{intro}</p>}
        </Reveal>
        {children}
      </div>
    </section>
  )
}

const buttonStyles = {
  primary: "border border-blue bg-blue text-white hover:bg-blue-700 hover:border-blue-700",
  secondary: "border border-hair-strong bg-card text-ink hover:border-ink-400",
  lime: "border border-lime bg-lime-400 text-ink hover:bg-lime",
}

export function ButtonLink({ href, children, variant = "primary", download, className }: {
  href: string
  children: React.ReactNode
  variant?: keyof typeof buttonStyles
  download?: boolean
  className?: string
}) {
  const classes = cn("inline-flex h-11 items-center gap-2 px-5 text-[14px] font-semibold transition-colors", buttonStyles[variant], className)
  return download || href.startsWith("http") ? (
    <a href={href} className={classes} download={download || undefined} target={download ? undefined : "_blank"} rel={download ? undefined : "noreferrer"}>
      {children}
    </a>
  ) : (
    <Link href={href} className={classes}>
      {children}
    </Link>
  )
}

export function Tag({ children }: { children: React.ReactNode }) {
  return <span className="inline-flex h-7 items-center border border-hair bg-sub px-2.5 text-[12.5px] font-medium text-ink-700">{children}</span>
}

/** A link that leaves the site: new tab, with the tilted arrow. */
export function ExternalLink({ href, children, className }: { href: string; children: React.ReactNode; className?: string }) {
  return (
    <a href={href} target="_blank" rel="noreferrer" className={cn("inline-flex items-center gap-1 text-blue-700 underline-offset-4 hover:underline", className)}>
      {children}
      <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
    </a>
  )
}
