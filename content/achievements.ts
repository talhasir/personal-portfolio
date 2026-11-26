import data from "./data/achievements.json"

/** Milestones for the achievements section. Edited in the portal (/admin). */
export interface Achievement {
  value: string
  title: string
  text: string
  /** Where it happened, shown at the foot of the card. */
  company: string
  /** That company's or product's logo. */
  logo?: string
  /** A word set beside a logo that is only a mark (Bernard's "B"), or beside the fallback icon. */
  logoLabel?: string
  /** The case study that backs it. */
  work: string
}

export const achievements = data as Achievement[]
