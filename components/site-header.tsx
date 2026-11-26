"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { profile } from "@/content/profile"
import { cn } from "@/lib/utils"
import { Signature } from "@/components/signature"

const NAV = [
  { href: "/#about", label: "About" },
  { href: "/#work", label: "Collaborations" },
  { href: "/#experience", label: "Experience" },
  { href: "/#skills", label: "Skills" },
  { href: "/#contact", label: "Contact" },
]

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <header className={cn("sticky top-0 z-40 border-b bg-card/95 backdrop-blur-sm transition-colors", scrolled ? "border-hair" : "border-transparent")}>
      <div className="mx-auto flex h-16 max-w-[1160px] items-center justify-between px-5 md:px-8">
        <Link href="/" className="flex items-center gap-3" onClick={() => setOpen(false)} aria-label={`${profile.name}, home`}>
          <Signature className="h-[54px] w-auto" />
          <span className="hidden border-l border-hair pl-3 text-[12.5px] text-ink-500 sm:inline">{profile.titles[0]}</span>
        </Link>
        <nav className="hidden items-center gap-7 md:flex" aria-label="Main">
          {NAV.map((item) => (
            <Link key={item.href} href={item.href} className="text-[14px] font-medium text-ink-700 hover:text-blue-700">
              {item.label}
            </Link>
          ))}
        </nav>
        <button type="button" className="inline-flex h-10 w-10 items-center justify-center border border-hair md:hidden" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} onClick={() => setOpen((value) => !value)}>
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>
      {open && (
        <nav className="border-t border-hair bg-card px-5 pb-5 pt-2 md:hidden" aria-label="Main">
          {NAV.map((item) => (
            <Link key={item.href} href={item.href} onClick={() => setOpen(false)} className="block border-b border-hair py-3 text-[15px] font-medium text-ink">
              {item.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  )
}
