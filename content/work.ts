import data from "./data/work.json"

/**
 * Every case study, newest first. Edited in the portal (/admin). Facts come from Hafiz's CV, his Upwork
 * profile and portfolio, and the systems themselves; nothing here is a
 * sample figure.
 */
export type WorkCategory = "ai" | "saas" | "integrations" | "client"

export const WORK_CATEGORIES: { key: WorkCategory | "all"; label: string }[] = [
  { key: "all", label: "All" },
  { key: "ai", label: "AI" },
  { key: "saas", label: "SaaS platforms" },
  { key: "integrations", label: "Integrations" },
  { key: "client", label: "Client work" },
]

export interface CaseStudy {
  slug: string
  title: string
  /** Where the work was done. */
  context: string
  role: string
  period: string
  /** One line for the card. */
  summary: string
  categories: WorkCategory[]
  figures: { value: string; label: string }[]
  stack: string[]
  /** The product's logo, from its own site or brand files. */
  logo?: string
  /** A screenshot of the live product (with the address it was taken from), or a designed cover (no address). */
  image?: { src: string; alt: string; address?: string }
  problem: string
  built: string[]
  /** The system as columns, read left to right. */
  architecture: { title: string; items: string[] }[]
  reliability: string[]
  owned: string[]
  link?: { label: string; href: string }
}

export const work = data as CaseStudy[]
