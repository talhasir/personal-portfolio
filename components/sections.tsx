import Image from "next/image"
import Link from "next/link"
import { ArrowRight, ArrowUpRight, Briefcase, Landmark, Github, Handshake, Linkedin, Mail, MapPin, MessageSquare, Star } from "lucide-react"
import { experience, alongside } from "@/content/experience"
import { skills, principles } from "@/content/skills"
import { reviews } from "@/content/reviews"
import { achievements } from "@/content/achievements"
import { work } from "@/content/work"
import { profile } from "@/content/profile"
import { site } from "@/content/site"
import { ButtonLink, Section, Tag } from "@/components/ui"
import { Reveal } from "@/components/reveal"
import { ContactForm } from "@/components/contact-form"
import { Signature } from "@/components/signature"
import { SocialLinks } from "@/components/social-links"

/** A four-point sparkle, the same shape as the Bernard mark. */
const SPARKLE = "M12 1.5C12.95 8.1 15.9 11.05 22.5 12C15.9 12.95 12.95 15.9 12 22.5C11.05 15.9 8.1 12.95 1.5 12C8.1 11.05 11.05 8.1 12 1.5Z"

const titleOf = (slug: string) => work.find((study) => study.slug === slug)?.title ?? slug

export function About() {
  const { about } = profile
  return (
    <Section id="about" eyebrow={site.about.eyebrow} title={about.title} intro={about.subtitle}>
      <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_340px]">
        <Reveal className="space-y-5 text-[16.5px] leading-relaxed text-ink-700">
          {about.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        </Reveal>
        <Reveal delay={100}>
          <dl className="panel divide-y divide-hair">
            {about.glance.map((item) => (
              <div key={item.label} className="px-5 py-3.5">
                <dt className="text-[11.5px] font-bold uppercase tracking-[0.1em] text-ink-500">{item.label}</dt>
                <dd className="mt-1 flex items-center gap-2 text-[14.5px] font-semibold text-ink">
                  {item.logo && <Image src={item.logo} alt="" width={20} height={20} unoptimized className="h-5 w-5 flex-none" />}
                  {item.value}
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </Section>
  )
}

export function Achievements() {
  return (
    <Section id="achievements" eyebrow={site.achievements.eyebrow} title={site.achievements.title} intro={site.achievements.intro}>
      <div className="grid gap-px border border-hair bg-hair sm:grid-cols-2 lg:grid-cols-3">
        {achievements.map((achievement, index) => (
          <Reveal key={achievement.title} delay={(index % 3) * 60} className="bg-card">
            <Link href={`/work/${achievement.work}`} className="group relative flex h-full flex-col p-6 transition-colors hover:bg-page">
              <span className="pointer-events-none absolute right-5 top-5" aria-hidden>
                <svg viewBox="0 0 24 24" className="sparkle h-4 w-4 fill-lime" style={{ animationDelay: `${index * 0.4}s` }}><path d={SPARKLE} /></svg>
                <svg viewBox="0 0 24 24" className="sparkle absolute -right-1.5 -top-1.5 h-2 w-2 fill-blue" style={{ animationDelay: `${index * 0.4 + 1.6}s` }}><path d={SPARKLE} /></svg>
              </span>
              <div className="flex h-7 items-center gap-2">
                {achievement.logo ? (
                  <Image src={achievement.logo} alt={achievement.company} width={160} height={48} unoptimized={achievement.logo.endsWith(".svg")} className="h-6 w-auto max-w-[120px] object-contain object-left" />
                ) : (
                  <Landmark className="h-6 w-6 text-blue" aria-hidden />
                )}
                {achievement.logoLabel && <span className="text-[17px] font-bold tracking-[-0.01em] text-ink">{achievement.logoLabel}</span>}
              </div>
              <p className="num mt-6 text-[28px] font-bold leading-none tracking-[-0.01em] text-ink">{achievement.value}</p>
              <p className="mt-3 min-h-[2lh] text-[15px] font-semibold leading-snug text-ink">{achievement.title}</p>
              <p className="mb-5 mt-2 text-[13.5px] leading-relaxed text-ink-500">{achievement.text}</p>
              <p className="mt-auto flex items-center justify-between border-t border-hair pt-3.5 text-[12px] font-bold uppercase tracking-[0.1em] text-blue">
                {achievement.company}
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden />
              </p>
            </Link>
          </Reveal>
        ))}
      </div>

      <h3 className="mt-14 text-[20px] font-bold text-ink">{site.achievements.reviewsTitle}</h3>
      <p className="mt-1.5 text-[15px] text-ink-700">{`${reviews.length} ${site.achievements.reviewsIntro}`}</p>
      <div className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {reviews.map((review, index) => (
          <Reveal key={review.quote} delay={(index % 3) * 70}>
            <figure className="panel flex h-full flex-col p-5">
              <div className="flex gap-0.5" aria-label={`${review.rating} out of 5`}>
                {Array.from({ length: 5 }, (_, i) => (
                  <Star key={i} className={i < review.rating ? "h-4 w-4 fill-lime text-lime" : "h-4 w-4 text-hair-strong"} aria-hidden />
                ))}
              </div>
              <blockquote className="mt-3 text-[15.5px] leading-relaxed text-ink">&ldquo;{review.quote}&rdquo;</blockquote>
              {review.endorsements.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {review.endorsements.map((item) => <span key={item} className="border border-lime-400 bg-lime-50 px-2 py-0.5 text-[11.5px] font-semibold text-ink-700">{item}</span>)}
                </div>
              )}
              <figcaption className="mt-auto border-t border-hair pt-3 text-[12.5px] leading-snug text-ink-500">
                <span className="block font-semibold text-ink-700">{review.project}</span>
                {[review.country, review.period].filter(Boolean).join(" · ")}
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
      {profile.links.upwork && (
        <div className="mt-6">
          <ButtonLink href={profile.links.upwork} variant="secondary">
            {site.achievements.reviewsButton}
            <ArrowUpRight className="h-4 w-4" aria-hidden />
          </ButtonLink>
        </div>
      )}
    </Section>
  )
}

export function Experience() {
  return (
    <Section id="experience" eyebrow={site.experience.eyebrow} title={site.experience.title} intro={site.experience.intro}>
      <ol className="border-l-2 border-hair">
        {experience.map((role) => (
          <li key={role.company} className="relative pb-10 pl-6 last:pb-0 md:pl-8">
            <span className={`absolute -left-[7px] top-1.5 h-3 w-3 rounded-full border-2 border-card ${role.current ? "bg-lime" : "bg-blue"}`} aria-hidden />
            <Reveal>
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <h3 className="text-[19px] font-bold text-ink">
                  {role.title} <span className="font-semibold text-ink-500">at {role.company}</span>
                </h3>
                <p className="num text-[13.5px] font-semibold text-ink-500">{role.period}</p>
              </div>
              <ul className="mt-3 space-y-1.5 text-[15px] leading-relaxed text-ink-700">
                {role.points.map((point) => (
                  <li key={point} className="flex gap-2.5">
                    <span className="mt-[9px] h-1.5 w-1.5 flex-none bg-lime" aria-hidden />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-3 flex flex-wrap items-center gap-1.5">
                {role.tags.map((tag) => <Tag key={tag}>{tag}</Tag>)}
              </div>
              <p className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-[13.5px]">
                {role.work.map((slug) => (
                  <Link key={slug} href={`/work/${slug}`} className="inline-flex items-center gap-1 font-semibold text-blue-700 hover:underline">
                    {titleOf(slug)}
                    <ArrowRight className="h-3.5 w-3.5" aria-hidden />
                  </Link>
                ))}
              </p>
            </Reveal>
          </li>
        ))}
      </ol>
      <div className="mt-12 grid gap-5 md:grid-cols-2">
        {alongside.map((item) => (
          <Reveal key={item.title}>
            <Link href={`/work/${item.work}`} className="panel block h-full p-5 hover:border-hair-strong">
              <p className="eyebrow">Alongside</p>
              <p className="mt-1.5 text-[17px] font-bold text-ink">{item.title}</p>
              <p className="mt-1.5 text-[14.5px] leading-relaxed text-ink-700">{item.text}</p>
            </Link>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}

export function Skills() {
  return (
    <Section id="skills" eyebrow={site.skills.eyebrow} title={site.skills.title} intro={site.skills.intro}>
      <div className="grid gap-px border border-hair bg-hair md:grid-cols-2">
        {skills.map((group) => (
          <div key={group.group} className="bg-card p-5">
            <p className="text-[13px] font-bold uppercase tracking-[0.08em] text-ink-500">{group.group}</p>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {group.items.map((item) => <Tag key={item}>{item}</Tag>)}
            </div>
          </div>
        ))}
      </div>
      <h3 className="mt-14 text-[21px] font-bold text-ink">How I work</h3>
      <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {principles.map((principle, index) => (
          <Reveal key={principle.title} delay={index * 80}>
            <div className="h-full border-t-2 border-lime-400 bg-card p-5">
              <p className="num text-[12px] font-bold text-blue">0{index + 1}</p>
              <p className="mt-1.5 text-[16px] font-bold text-ink">{principle.title}</p>
              <p className="mt-2 text-[14px] leading-relaxed text-ink-700">{principle.text}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}

export function Contact() {
  const { contact } = site
  const channels = [
    { icon: Mail, label: profile.email, href: `mailto:${profile.email}` },
    { icon: Linkedin, label: profile.links.linkedin.label, href: profile.links.linkedin.href },
    { icon: Github, label: profile.links.github.label, href: profile.links.github.href },
    ...(profile.links.upwork ? [{ icon: Briefcase, label: "Upwork profile and reviews", href: profile.links.upwork }] : []),
  ]
  const arrowList = (items: string[]) => (
    <ul className="mt-3 space-y-2.5">
      {items.map((item) => (
        <li key={item} className="flex items-center gap-2.5 text-[15px] text-ink-700">
          <ArrowRight className="h-4 w-4 flex-none text-blue" aria-hidden />
          {item}
        </li>
      ))}
    </ul>
  )

  return (
    <Section id="contact" eyebrow={contact.eyebrow} title={contact.title} intro={contact.intro}>
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_400px]">
        <Reveal className="panel border-t-2 border-t-blue p-6 md:p-8">
          <h3 className="flex items-center gap-2.5 text-[21px] font-bold text-ink">
            <MessageSquare className="h-5 w-5 text-blue" aria-hidden />
            {contact.messageTitle}
          </h3>
          <p className="mt-2 text-[15px] text-ink-700">{contact.messageIntro}</p>
          <p className="mt-6 text-[14px] font-bold text-ink">{contact.helpTitle}</p>
          {arrowList(contact.helpWith)}
          <div className="mt-7 border-t border-hair pt-7">
            <ContactForm />
          </div>
        </Reveal>
        <div className="space-y-6">
          <Reveal delay={80} className="panel border-t-2 border-t-lime-400 p-6">
            <h3 className="text-[19px] font-bold text-ink">{contact.touchTitle}</h3>
            <ul className="mt-4 space-y-3.5">
              {channels.map((channel) => (
                <li key={channel.href}>
                  <a href={channel.href} target={channel.href.startsWith("mailto:") ? undefined : "_blank"} rel="noreferrer" className="flex items-center gap-3 text-[15px] font-medium text-ink hover:text-blue-700">
                    <channel.icon className="h-[18px] w-[18px] flex-none text-blue" aria-hidden />
                    <span className="truncate">{channel.label}</span>
                  </a>
                </li>
              ))}
              <li className="flex items-center gap-3 text-[15px] text-ink-500">
                <MapPin className="h-[18px] w-[18px] flex-none text-blue" aria-hidden />
                {profile.location}
              </li>
            </ul>
          </Reveal>
          <Reveal delay={140} className="panel border-t-2 border-t-lime-400 p-6">
            <h3 className="flex items-center gap-2.5 text-[19px] font-bold text-ink">
              <Handshake className="h-5 w-5 text-blue" aria-hidden />
              {contact.opportunitiesTitle}
            </h3>
            {arrowList(contact.opportunities)}
          </Reveal>
        </div>
      </div>
    </Section>
  )
}

export function SiteFooter() {
  return (
    <footer className="border-t border-hair bg-card">
      <div className="mx-auto flex max-w-[1160px] flex-wrap items-center justify-between gap-3 px-5 py-6 text-[13px] text-ink-500 md:px-8">
        <div className="flex items-center gap-4">
          <Signature className="h-9 w-auto" />
          <p>© {new Date().getFullYear()} {profile.fullName}</p>
        </div>
        <div className="flex items-center gap-4">
          <SocialLinks />
        </div>
      </div>
    </footer>
  )
}
