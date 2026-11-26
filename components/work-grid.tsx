"use client"

import Link from "next/link"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { ArrowRight } from "lucide-react"
import { WORK_CATEGORIES, type CaseStudy, type WorkCategory } from "@/content/work"
import { WorkCover } from "@/components/work-cover"
import { cn } from "@/lib/utils"

/** Every case study, with filters kept in the address (?work=ai). */
export function WorkGrid({ studies }: { studies: CaseStudy[] }) {
  const params = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()
  const active = (WORK_CATEGORIES.find((c) => c.key === params.get("work"))?.key ?? "all") as WorkCategory | "all"
  const shown = active === "all" ? studies : studies.filter((study) => study.categories.includes(active))
  const choose = (key: WorkCategory | "all") => {
    const next = new URLSearchParams(params.toString())
    if (key === "all") next.delete("work")
    else next.set("work", key)
    const query = next.toString()
    router.replace(`${pathname}${query ? `?${query}` : ""}#work`, { scroll: false })
  }

  return (
    <>
      <div className="mb-6 flex flex-wrap gap-2" role="tablist" aria-label="Filter work">
        {WORK_CATEGORIES.map((category) => {
          const count = category.key === "all" ? studies.length : studies.filter((s) => s.categories.includes(category.key as WorkCategory)).length
          return (
            <button
              key={category.key}
              type="button"
              role="tab"
              aria-selected={active === category.key}
              onClick={() => choose(category.key)}
              className={cn(
                "inline-flex h-9 items-center gap-2 border px-3.5 text-[13.5px] font-semibold transition-colors",
                active === category.key ? "border-lime-400 bg-lime-400 text-ink" : "border-white/15 bg-white/5 text-white/80 hover:border-white/30",
              )}
            >
              {category.label}
              <span className={cn("num text-[12px] font-medium", active === category.key ? "text-ink-700" : "text-white/50")}>{count}</span>
            </button>
          )
        })}
      </div>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {shown.map((study) => (
          <Link key={study.slug} href={`/work/${study.slug}`} className="group flex flex-col overflow-hidden border border-white/10 bg-[#1d2126] transition hover:border-lime-400/60">
            <div className="overflow-hidden [&_img]:border-b-0 [&_img]:transition-transform [&_img]:duration-500 group-hover:[&_img]:scale-[1.03]">
              <WorkCover study={study} />
            </div>
            <div className="flex flex-1 flex-col border-t-2 border-lime-400 p-5">
              <p className="text-[11.5px] font-bold uppercase tracking-[0.12em] text-lime-400">{study.context}</p>
              <p className="mt-1.5 text-[19px] font-bold leading-tight text-white">{study.title}</p>
              <p className="mt-2 text-[14.5px] leading-relaxed text-white/70">{study.summary}</p>
              <span className="mt-auto inline-flex items-center gap-1.5 pt-5 text-[13.5px] font-semibold text-white">
                Read the case study
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </>
  )
}
