"use client"

import { useState } from "react"
import Image from "next/image"
import { Lightbulb, Target } from "lucide-react"
import { profile } from "@/content/profile"
import { cn } from "@/lib/utils"

const icons = { tech: Lightbulb, leadership: Target } as const

/** The vision: one tab per theme, one statement per tab. */
export function VisionTabs() {
  const [active, setActive] = useState(profile.vision[0].key)
  const current = profile.vision.find((item) => item.key === active) ?? profile.vision[0]

  return (
    <div>
      <div role="tablist" aria-label="Vision" className="grid grid-cols-2 border border-hair">
        {profile.vision.map((item) => {
          const Icon = icons[item.key as keyof typeof icons]
          const selected = item.key === active
          return (
            <button
              key={item.key}
              role="tab"
              type="button"
              aria-selected={selected}
              onClick={() => setActive(item.key)}
              className={cn(
                "flex items-center justify-center gap-2.5 px-4 py-4 text-[15px] font-semibold transition",
                selected && item.key === "tech" && "bg-blue text-white",
                selected && item.key === "leadership" && "bg-lime-400 text-ink",
                !selected && "bg-card text-ink-700 hover:bg-page",
              )}
            >
              <Icon className="h-5 w-5" aria-hidden />
              {item.tab}
            </button>
          )
        })}
      </div>
      <div role="tabpanel" className="panel mt-6 px-6 py-8 md:px-10 md:py-10">
        {current.logo && (
          <div className="mb-5 flex items-center justify-center gap-3">
            <Image src={current.logo} alt="" width={44} height={44} unoptimized className="h-11 w-11" />
            <span className="text-[22px] font-extrabold tracking-[0.06em] text-ink">AUTONOMIA</span>
          </div>
        )}
        <h3 className="text-center text-[24px] font-bold leading-tight text-ink md:text-[30px]">{current.title}</h3>
        <div className="mx-auto mt-6 max-w-[860px] space-y-4 text-[16.5px] leading-relaxed text-ink-700">
          {current.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        </div>
      </div>
    </div>
  )
}
