import data from "./data/site.json"

/** Section headings, intros, button labels and SEO text. Edited in the portal (/admin). */
export interface SiteText {
  seo: { title: string; description: string; keywords: string[] }
  hero: { workButton: string; builtForLabel: string }
  about: { eyebrow: string }
  vision: { eyebrow: string; title: string }
  achievements: { eyebrow: string; title: string; intro: string; reviewsTitle: string; reviewsIntro: string; reviewsButton: string }
  collaborations: { eyebrow: string; title: string; intro: string }
  experience: { eyebrow: string; title: string; intro: string }
  skills: { eyebrow: string; title: string; intro: string }
  contact: {
    eyebrow: string
    title: string
    intro: string
    messageTitle: string
    messageIntro: string
    helpTitle: string
    helpWith: string[]
    touchTitle: string
    opportunitiesTitle: string
    opportunities: string[]
  }
}

export const site = data as SiteText
