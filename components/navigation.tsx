"use client"

import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu } from "lucide-react"

export function Navigation() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled ? "glass py-4" : "bg-transparent py-6",
      )}
    >
      <div className="max-w-[1440px] mx-auto px-6 md:px-20 flex items-center justify-between">
        <a href="#" className="text-xl font-semibold text-foreground">
          HT<span className="text-primary">.</span>
        </a>
        <div className="hidden md:flex items-center gap-8">
          <a href="#work" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Work
          </a>
          <a href="#autonomia" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Autonomia
          </a>
          <a href="#experience" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Experience
          </a>
          <a href="#contact" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Contact
          </a>
        </div>
        <div className="hidden md:block">
          <a
            href="#contact"
            className="px-4 py-2 bg-primary text-primary-foreground text-sm font-medium rounded-lg hover:bg-[#00FFF0] transition-colors"
          >
            Let's Talk
          </a>
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <button className="p-2 text-foreground hover:bg-secondary rounded-md transition-colors">
                <Menu className="h-6 w-6" />
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] bg-background/95 backdrop-blur-xl border-l border-border p-6">
              <div className="flex flex-col h-full">
                {/* Mobile Logo */}
                <div className="mb-8">
                  <a href="#" className="text-xl font-semibold text-foreground">
                    HT<span className="text-primary">.</span>
                  </a>
                </div>

                <div className="flex flex-col gap-6">
                  <a href="#work" className="text-lg font-medium text-muted-foreground hover:text-foreground hover:translate-x-2 transition-all">
                    Work
                  </a>
                  <a href="#autonomia" className="text-lg font-medium text-muted-foreground hover:text-foreground hover:translate-x-2 transition-all">
                    Autonomia
                  </a>
                  <a href="#experience" className="text-lg font-medium text-muted-foreground hover:text-foreground hover:translate-x-2 transition-all">
                    Experience
                  </a>
                  <a href="#contact" className="text-lg font-medium text-muted-foreground hover:text-foreground hover:translate-x-2 transition-all">
                    Contact
                  </a>
                </div>

                <div className="mt-auto mb-8">
                  <a
                    href="#contact"
                    className="block w-full py-3 bg-primary text-primary-foreground text-center text-sm font-medium rounded-lg hover:bg-[#00FFF0] transition-colors shadow-lg shadow-primary/20"
                  >
                    Let's Talk
                  </a>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  )
}
