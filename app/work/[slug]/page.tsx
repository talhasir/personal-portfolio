import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, ArrowRight, Check } from "lucide-react"
import { work } from "@/content/work"
import { profile } from "@/content/profile"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/sections"
import { ButtonLink, ExternalLink, Tag } from "@/components/ui"
import { WorkCover, WorkLogo } from "@/components/work-cover"
import { Reveal } from "@/components/reveal"

type Props = { params: Promise<{ slug: string }> }

export function generateStaticParams() {
  return work.map((study) => ({ slug: study.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const study = work.find((s) => s.slug === slug)
  if (!study) return {}
  return {
    title: `${study.title} case study`,
    description: study.summary,
    alternates: { canonical: `/work/${study.slug}` },
    openGraph: { title: `${study.title} | ${profile.name}`, description: study.summary, url: `/work/${study.slug}` },
  }
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <Reveal>
      <section className="panel">
        <div className="panel-head">
          <h2 className="text-[16px] font-bold text-ink">{title}</h2>
        </div>
        <div className="p-5">{children}</div>
      </section>
    </Reveal>
  )
}

function List({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2 text-[15px] leading-relaxed text-ink-700">
      {items.map((item) => (
        <li key={item} className="flex gap-2.5">
          <Check className="mt-1 h-4 w-4 flex-none text-lime" aria-hidden />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  )
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params
  const index = work.findIndex((s) => s.slug === slug)
  const study = work[index]
  if (!study) notFound()
  const previous = work[index - 1]
  const next = work[index + 1]

  return (
    <>
      <SiteHeader />
      <main className="pb-20">
        <div className="border-b border-hair bg-card">
          <div className="mx-auto max-w-[1160px] px-5 pt-8 md:px-8">
            <Link href="/#work" className="inline-flex items-center gap-1.5 text-[13.5px] font-semibold text-blue-700 hover:underline">
              <ArrowLeft className="h-4 w-4" aria-hidden />
              All case studies
            </Link>
            <div className="mt-5 pb-10">
              <Reveal>
                {study.logo && <div className="mb-4"><WorkLogo study={study} className="h-9" /></div>}
                <p className="eyebrow">{study.context}</p>
                <h1 className="mt-2 text-[34px] font-bold leading-tight tracking-[-0.02em] text-ink md:text-[44px]">{study.title}</h1>
                <p className="mt-4 max-w-[640px] text-[17px] leading-relaxed text-ink-700">{study.summary}</p>
                <dl className="mt-6 flex flex-wrap gap-x-8 gap-y-3 text-[14px]">
                  <div><dt className="text-ink-500">Role</dt><dd className="font-semibold text-ink">{study.role}</dd></div>
                  <div><dt className="text-ink-500">When</dt><dd className="font-semibold text-ink">{study.period}</dd></div>
                  {study.link && <div><dt className="text-ink-500">Live</dt><dd className="font-semibold"><ExternalLink href={study.link.href}>{study.link.label}</ExternalLink></dd></div>}
                </dl>
              </Reveal>
            </div>
          </div>
        </div>

        <div className="mx-auto mt-10 max-w-[1160px] space-y-6 px-5 md:px-8">
          {study.image && (
            <Reveal className="border border-hair">
              <WorkCover study={study} priority />
            </Reveal>
          )}

          <div className="grid gap-px border border-hair bg-hair sm:grid-cols-3">
            {study.figures.map((figure) => (
              <div key={figure.label} className="bg-card px-5 py-4">
                <p className="num text-[26px] font-bold text-ink">{figure.value}</p>
                <p className="text-[13px] text-ink-500">{figure.label}</p>
              </div>
            ))}
          </div>

          <Block title="The problem">
            <p className="text-[15.5px] leading-relaxed text-ink-700">{study.problem}</p>
          </Block>

          <Block title="What I built">
            <List items={study.built} />
          </Block>

          <Block title="How it fits together">
            <div className="grid gap-3" style={{ gridTemplateColumns: `repeat(${study.architecture.length}, minmax(0, 1fr))` }}>
              {study.architecture.map((column, i) => (
                <div key={column.title} className="relative">
                  <p className="mb-2 text-[11.5px] font-bold uppercase tracking-[0.1em] text-ink-500">{column.title}</p>
                  <div className="space-y-2">
                    {column.items.map((item) => (
                      <div key={item} className={i === 0 ? "border border-hair border-l-[3px] border-l-blue bg-sub px-3 py-2 text-[13.5px] font-medium text-ink" : "border border-hair bg-sub px-3 py-2 text-[13.5px] font-medium text-ink"}>
                        {item}
                      </div>
                    ))}
                  </div>
                  {i < study.architecture.length - 1 && <ArrowRight className="absolute -right-[11px] top-9 hidden h-4 w-4 text-ink-400 md:block" aria-hidden />}
                </div>
              ))}
            </div>
          </Block>

          <div className="grid gap-6 md:grid-cols-2">
            {study.reliability.length > 0 && (
              <Block title="Keeping it reliable">
                <List items={study.reliability} />
              </Block>
            )}
            <Block title="What I owned">
              <List items={study.owned} />
            </Block>
          </div>

          <Block title="Stack">
            <div className="flex flex-wrap gap-1.5">{study.stack.map((item) => <Tag key={item}>{item}</Tag>)}</div>
          </Block>

          <nav className="grid gap-4 pt-4 sm:grid-cols-2" aria-label="More case studies">
            {previous ? (
              <Link href={`/work/${previous.slug}`} className="panel p-4 hover:border-hair-strong">
                <span className="text-[12.5px] text-ink-500">Previous</span>
                <span className="mt-0.5 flex items-center gap-1.5 font-semibold text-ink"><ArrowLeft className="h-4 w-4" aria-hidden />{previous.title}</span>
              </Link>
            ) : <span />}
            {next && (
              <Link href={`/work/${next.slug}`} className="panel p-4 text-right hover:border-hair-strong">
                <span className="text-[12.5px] text-ink-500">Next</span>
                <span className="mt-0.5 flex items-center justify-end gap-1.5 font-semibold text-ink">{next.title}<ArrowRight className="h-4 w-4" aria-hidden /></span>
              </Link>
            )}
          </nav>

          <div className="flex flex-wrap items-center justify-between gap-4 border border-hair bg-card p-5">
            <p className="text-[16px] font-semibold text-ink">Want something like this built?</p>
            <ButtonLink href="/#contact">Get in touch<ArrowRight className="h-4 w-4" aria-hidden /></ButtonLink>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  )
}
