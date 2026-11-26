import data from "./data/profile.json"

/** Who Hafiz is, how to reach him, the companies he has built for and his story. Edited in the portal (/admin). */
export interface Profile {
  name: string
  fullName: string
  titles: string[]
  headline: string
  intro: string
  location: string
  email: string
  siteUrl: string
  cvPath: string
  photo: string
  links: {
    linkedin: { label: string; href: string }
    github: { label: string; href: string }
    /** The public Upwork profile, where the client reviews are verified. */
    upwork: string | null
  }
  /** The roles on the name card under the photo. */
  roles: { label: string }[]
  /** Logos in the "Built for" strip. `ratio` is the trimmed logo's width / height, used to give every logo the same visual area. */
  companies: { name: string; logo: string; ratio: number }[]
  vision: { key: string; tab: string; title: string; paragraphs: string[]; logo?: string }[]
  about: {
    title: string
    subtitle: string
    paragraphs: string[]
    glance: { label: string; value: string; logo?: string }[]
  }
}

export const profile = data as Profile
