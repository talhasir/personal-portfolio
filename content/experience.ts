import data from "./data/experience.json"

/** The career timeline, the same roles and dates as the CV. Edited in the portal (/admin). */
export interface Role {
  company: string
  title: string
  period: string
  current?: boolean
  points: string[]
  tags: string[]
  /** The case studies from this role. */
  work: string[]
}

export const experience = data.roles as Role[]

/** Alongside the roles above. */
export const alongside = data.alongside as { title: string; text: string; work: string }[]
