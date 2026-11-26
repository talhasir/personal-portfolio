"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { ArrowUpRight, Award, Briefcase, FileText, LayoutDashboard, LogOut, MessageSquareQuote, Type, UserRound, Wrench } from "lucide-react"
import { Signature } from "@/components/signature"
import { cn } from "@/lib/utils"

const icons: Record<string, typeof UserRound> = {
  profile: UserRound, work: Briefcase, achievements: Award, experience: FileText, skills: Wrench, reviews: MessageSquareQuote, site: Type,
}

const modeLabel = { github: "Saves to GitHub", local: "Saves to local files", none: "Saving not set up" }

export function AdminNav({ sections, username, mode }: { sections: { name: string; title: string }[]; username: string; mode: "github" | "local" | "none" }) {
  const pathname = usePathname()
  const router = useRouter()

  async function signOut() {
    await fetch("/api/admin/logout", { method: "POST" })
    router.replace("/admin/login")
    router.refresh()
  }

  const item = (href: string, label: string, Icon: typeof UserRound) => (
    <Link
      key={href}
      href={href}
      className={cn("flex items-center gap-2.5 border-l-2 px-4 py-2.5 text-[14px] font-medium transition-colors", pathname === href ? "border-blue bg-blue-50 text-blue-700" : "border-transparent text-ink-700 hover:bg-page")}
    >
      <Icon className="h-4 w-4 flex-none" aria-hidden />
      {label}
    </Link>
  )

  return (
    <aside className="border-b border-hair bg-card lg:sticky lg:top-0 lg:h-screen lg:border-b-0 lg:border-r">
      <div className="flex h-full flex-col">
        <div className="flex items-center justify-between gap-3 px-4 py-4">
          <Signature className="h-10 w-auto" />
          <span className="text-[11px] font-bold uppercase tracking-[0.12em] text-ink-500">Portal</span>
        </div>
        <nav className="flex gap-0 overflow-x-auto pb-2 max-lg:[&>a]:whitespace-nowrap lg:block">
          {item("/admin", "Overview", LayoutDashboard)}
          {sections.map((section) => item(`/admin/${section.name}`, section.title, icons[section.name] ?? FileText))}
        </nav>
        <div className="mt-auto hidden space-y-3 border-t border-hair p-4 lg:block">
          <p className={cn("text-[12px] font-semibold", mode === "none" ? "text-red-700" : "text-ink-500")}>{modeLabel[mode]}</p>
          <a href="/" target="_blank" rel="noreferrer" className="flex items-center gap-1.5 text-[13.5px] font-semibold text-blue-700 hover:underline">
            View site
            <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
          </a>
          <p className="truncate text-[12.5px] text-ink-500">{username}</p>
          <button type="button" onClick={signOut} className="flex items-center gap-1.5 text-[13.5px] font-semibold text-ink-700 hover:text-ink">
            <LogOut className="h-3.5 w-3.5" aria-hidden />
            Sign out
          </button>
        </div>
      </div>
    </aside>
  )
}
