import data from "./data/skills.json"

/** Grouped as on the CV. Edited in the portal (/admin). */
export const skills = data.groups as { group: string; items: string[] }[]

/** How the work gets done. */
export const principles = data.principles as { title: string; text: string }[]
