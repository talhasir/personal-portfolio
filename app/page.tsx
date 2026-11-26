import { Suspense } from "react"
import { SiteHeader } from "@/components/site-header"
import { Hero } from "@/components/hero"
import { WorkGrid } from "@/components/work-grid"
import { About, Achievements, Contact, Experience, SiteFooter, Skills } from "@/components/sections"
import { Section } from "@/components/ui"
import { VisionTabs } from "@/components/vision"
import { work } from "@/content/work"
import { site } from "@/content/site"

export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        <About />
        <Section id="vision" eyebrow={site.vision.eyebrow} title={site.vision.title}>
          <VisionTabs />
        </Section>
        <Achievements />
        <section id="work" className="bg-[#16191d] py-20 md:py-24">
          <div className="mx-auto max-w-[1160px] px-5 md:px-8">
            <div className="mb-10 max-w-[760px]">
              <p className="text-[11.5px] font-bold uppercase tracking-[0.14em] text-lime-400">{site.collaborations.eyebrow}</p>
              <h2 className="mt-2 text-[28px] font-bold leading-tight tracking-[-0.01em] text-white md:text-[34px]">{site.collaborations.title}</h2>
              <p className="mt-3 text-[16px] leading-relaxed text-white/70">{site.collaborations.intro}</p>
            </div>
            {/* The filters read the address, so the grid renders on the client. */}
            <Suspense fallback={null}>
              <WorkGrid studies={work} />
            </Suspense>
          </div>
        </section>
        <Experience />
        <Skills />
        <Contact />
      </main>
      <SiteFooter />
    </>
  )
}
