import Image from "next/image"
import { ArrowRight, Download } from "lucide-react"
import { profile } from "@/content/profile"
import { site } from "@/content/site"
import { ButtonLink } from "@/components/ui"
import { Reveal } from "@/components/reveal"
import { SocialLinks } from "@/components/social-links"

/** The visual area (px²) every company logo is sized to. */
const LOGO_AREA = 3600

export function Hero() {
  return (
    <section className="bg-card">
      <div className="mx-auto grid max-w-[1160px] items-center gap-10 px-5 py-14 md:grid-cols-[minmax(0,1fr)_340px] md:px-8 md:py-20 lg:gap-16">
        <Reveal>
          <p className="eyebrow">{profile.titles.join(" · ")}</p>
          <h1 className="mt-3 text-[34px] font-bold leading-[1.12] tracking-[-0.02em] text-ink md:text-[48px]">{profile.headline}</h1>
          <p className="mt-5 max-w-[620px] text-[17px] leading-relaxed text-ink-700">{profile.intro}</p>
          <div className="mt-7 flex flex-wrap gap-3">
            <ButtonLink href="/#work">
              {site.hero.workButton}
              <ArrowRight className="h-4 w-4" aria-hidden />
            </ButtonLink>
            <ButtonLink href={profile.cvPath} variant="secondary" download>
              <Download className="h-4 w-4" aria-hidden />
              {site.hero.cvButton}
            </ButtonLink>
            <SocialLinks className="ml-1" />
          </div>
          <div className="mt-10">
            <p className="text-[11.5px] font-bold uppercase tracking-[0.14em] text-ink-500">{site.hero.builtForLabel}</p>
            <ul className="mt-4 grid max-w-[560px] grid-cols-2 items-center gap-x-10 gap-y-6 sm:grid-cols-3">
              {profile.companies.map((company) => (
                <li key={company.name} className="flex h-10 items-center">
                  {/* Same area for every logo: wide logos get shorter, compact ones taller. Grey at rest, brand colours on hover. */}
                  <Image src={company.logo} alt={company.name} width={640} height={Math.round(640 / company.ratio)} style={{ height: Math.round(Math.sqrt(LOGO_AREA / company.ratio)), width: "auto" }} className="max-w-none opacity-60 grayscale transition duration-300 hover:opacity-100 hover:grayscale-0" />
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
        <Reveal delay={120} className="mx-auto w-full max-w-[340px]">
          <div className="border border-hair bg-card p-2">
            <Image src={profile.photo} alt={`${profile.name}, ${profile.titles[0]}`} width={900} height={900} priority className="block h-auto w-full" />
          </div>
          <div className="group mt-3 flex items-center justify-between gap-4 border border-hair bg-card px-5 py-5">
            <div>
              <p className="text-[21px] font-bold leading-tight tracking-[-0.01em] text-ink">{profile.name}</p>
              <div className="mt-1.5 space-y-0.5 text-[15px] text-ink-700">
                {profile.roles.map((role) => <p key={role.label}>{role.label}</p>)}
              </div>
            </div>
            {/* Grey at rest, Autonomia's own colours on hover. */}
            <span className="relative h-10 w-10 flex-none">
              <Image src="/logos/autonomia-mono.svg" alt="Autonomia" width={40} height={40} unoptimized className="absolute inset-0 h-10 w-10 transition-opacity duration-300 group-hover:opacity-0" />
              <Image src="/logos/autonomia.svg" alt="" width={40} height={40} unoptimized className="absolute inset-0 h-10 w-10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </span>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
