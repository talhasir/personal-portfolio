import data from "./data/reviews.json"

/** Client reviews, quoted as written, newest first. Edited in the portal (/admin). */
export interface Review {
  quote: string
  project: string
  country?: string
  period: string
  rating: number
  endorsements: string[]
}

export const reviews = data as Review[]
