import Image from "next/image"
import type { CaseStudy } from "@/content/work"

/** A product's logo, kept to a set height whatever its shape. */
export function WorkLogo({ study, className = "h-7" }: { study: CaseStudy; className?: string }) {
  if (!study.logo) return null
  return <Image src={study.logo} alt={`${study.title} logo`} width={240} height={72} unoptimized={study.logo.endsWith(".svg")} className={`${className} w-auto max-w-[150px] object-contain object-left`} />
}

/**
 * A case study's picture: a screenshot or a designed cover, shown edge to
 * edge. Without one: a neutral panel with the logo (or the name) and the key
 * figures. One look for every project, in the site's own colours.
 */
export function WorkCover({ study, priority = false }: { study: CaseStudy; priority?: boolean }) {
  if (study.image) {
    return <Image src={study.image.src} alt={study.image.alt} width={2400} height={1500} quality={90} sizes="(min-width: 1024px) 720px, 100vw" priority={priority} className="block aspect-[16/10] w-full border-b border-hair object-cover object-top" />
  }

  return (
    <div className="flex aspect-[16/10] flex-col items-center justify-center gap-5 border-b border-hair bg-sub p-5">
      {study.logo && <WorkLogo study={study} className="h-10" />}
      <div className="grid w-full gap-2" style={{ gridTemplateColumns: `repeat(${Math.min(3, study.figures.length)}, minmax(0, 1fr))` }}>
        {study.figures.slice(0, 3).map((figure) => (
          <div key={figure.label} className="border border-hair bg-card px-3 py-2.5">
            <p className="num text-[17px] font-bold leading-tight text-ink">{figure.value}</p>
            <p className="text-[11px] leading-snug text-ink-500">{figure.label}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
