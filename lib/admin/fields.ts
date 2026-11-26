import { z } from "zod"

/**
 * One field in the portal. The editor draws its form from these, and the
 * server builds its validation from the same list, so they never disagree.
 */
export type Field =
  | { kind: "text"; key: string; label: string; help?: string; optional?: boolean; long?: boolean }
  | { kind: "number"; key: string; label: string; help?: string }
  | { kind: "boolean"; key: string; label: string; help?: string }
  | { kind: "image"; key: string; label: string; help?: string; optional?: boolean; accept?: "image" | "pdf" }
  | { kind: "strings"; key: string; label: string; help?: string; long?: boolean }
  | { kind: "choices"; key: string; label: string; help?: string; options: { value: string; label: string }[] }
  /** A case study picked from the current list (single or several). */
  | { kind: "workRef"; key: string; label: string; help?: string; many?: boolean }
  | { kind: "group"; key: string; label: string; help?: string; optional?: boolean; fields: Field[] }
  | { kind: "list"; key: string; label: string; help?: string; titleKey: string; fields: Field[] }

/** A whole content file: one object, or one list of items. */
export type Section = {
  name: string
  title: string
  description: string
  /** Where this content shows on the site, for the View button. */
  view: string
  /** For lists whose items each have a page: the address, with {slug} filled from the item. */
  itemView?: string
  root: Extract<Field, { kind: "group" | "list" }>
}

const text = (key: string, label: string, extra: Partial<Extract<Field, { kind: "text" }>> = {}): Field => ({ kind: "text", key, label, ...extra })
const long = (key: string, label: string, extra: Partial<Extract<Field, { kind: "text" }>> = {}): Field => ({ kind: "text", key, label, long: true, ...extra })
const strings = (key: string, label: string, help?: string, isLong?: boolean): Field => ({ kind: "strings", key, label, help, long: isLong })
const image = (key: string, label: string, extra: Partial<Extract<Field, { kind: "image" }>> = {}): Field => ({ kind: "image", key, label, ...extra })
const heading = (key: string, label: string, keys: [string, string][]): Field => ({ kind: "group", key, label, fields: keys.map(([k, l]) => (k === "intro" ? long(k, l) : text(k, l))) })

export const SECTIONS: Section[] = [
  {
    name: "profile",
    title: "Profile & hero",
    view: "/",
    description: "Your name, headline, photo, links, the name card, the Built for logos, the About story and the Vision tabs.",
    root: {
      kind: "group", key: "", label: "Profile", fields: [
        text("name", "Short name", { help: "Shown on the name card and in the header." }),
        text("fullName", "Full name", { help: "Used in the footer and for search engines." }),
        strings("titles", "Titles", "The first one shows above the headline and in the header."),
        text("headline", "Headline", { help: "The big line at the top of the home page." }),
        long("intro", "Intro paragraph"),
        image("photo", "Profile photo", { help: "Square works best." }),
        { kind: "list", key: "roles", label: "Name card roles", titleKey: "label", fields: [text("label", "Role")] },
        text("location", "Location"),
        text("email", "Email"),
        text("siteUrl", "Site address", { help: "The full public address, like https://hafiz-talha.vercel.app" }),
        {
          kind: "group", key: "links", label: "Profile links", fields: [
            { kind: "group", key: "linkedin", label: "LinkedIn", fields: [text("label", "Shown as"), text("href", "Link")] },
            { kind: "group", key: "github", label: "GitHub", fields: [text("label", "Shown as"), text("href", "Link")] },
            text("upwork", "Upwork link", { optional: true }),
          ],
        },
        {
          kind: "list", key: "companies", label: "Built for logos", titleKey: "name",
          help: "Trim empty space around a logo before uploading. Ratio is width ÷ height of the logo; it keeps every logo the same visual size.",
          fields: [text("name", "Company"), image("logo", "Logo"), { kind: "number", key: "ratio", label: "Ratio (width ÷ height)" }],
        },
        {
          kind: "group", key: "about", label: "About section", fields: [
            text("title", "Title"),
            text("subtitle", "Subtitle"),
            strings("paragraphs", "Paragraphs", undefined, true),
            { kind: "list", key: "glance", label: "At a glance", titleKey: "label", fields: [text("label", "Label"), text("value", "Value"), image("logo", "Small logo", { optional: true })] },
          ],
        },
        {
          kind: "list", key: "vision", label: "Vision tabs", titleKey: "tab",
          fields: [
            text("key", "Key", { help: "\"tech\" or \"leadership\" picks the tab icon." }),
            text("tab", "Tab label"),
            text("title", "Heading"),
            strings("paragraphs", "Paragraphs", undefined, true),
            image("logo", "Logo above the heading", { optional: true }),
          ],
        },
      ],
    },
  },
  {
    name: "work",
    title: "Case studies",
    view: "/#work",
    itemView: "/work/{slug}",
    description: "Every collaboration and its case study page. The order here is the order on the site.",
    root: {
      kind: "list", key: "", label: "Case studies", titleKey: "title",
      fields: [
        text("slug", "Page address", { help: "Lowercase words joined by dashes. The page lives at /work/<this>." }),
        text("title", "Title"),
        text("context", "Context", { help: "Shown above the title on the card, like the company." }),
        text("role", "Your role"),
        text("period", "Period"),
        long("summary", "Card summary"),
        { kind: "choices", key: "categories", label: "Filters", options: [{ value: "ai", label: "AI" }, { value: "saas", label: "SaaS platforms" }, { value: "integrations", label: "Integrations" }, { value: "client", label: "Client work" }] },
        {
          kind: "group", key: "image", label: "Cover image", optional: true,
          fields: [image("src", "Image", { help: "16:10, at least 2400 px wide." }), text("alt", "Description for screen readers"), text("address", "Site address", { optional: true, help: "Shows the company logo on the card when set." })],
        },
        image("logo", "Logo", { optional: true }),
        { kind: "list", key: "figures", label: "Key figures", titleKey: "value", fields: [text("value", "Figure"), text("label", "What it means")] },
        strings("stack", "Stack"),
        long("problem", "The problem"),
        strings("built", "What was built", undefined, true),
        { kind: "list", key: "architecture", label: "Architecture columns", titleKey: "title", fields: [text("title", "Column"), strings("items", "Items")] },
        strings("reliability", "Reliability", undefined, true),
        strings("owned", "What you owned"),
        { kind: "group", key: "link", label: "Live link", optional: true, fields: [text("label", "Shown as"), text("href", "Link")] },
      ],
    },
  },
  {
    name: "achievements",
    title: "Achievements",
    view: "/#achievements",
    description: "The cards under Achievements & recognition. Each one links to a case study.",
    root: {
      kind: "list", key: "", label: "Achievements", titleKey: "value",
      fields: [
        text("value", "Headline", { help: "One or two words, like \"Enterprise backend\"." }),
        text("title", "Line below"),
        long("text", "Description"),
        text("company", "Company (card footer)"),
        image("logo", "Logo", { optional: true }),
        text("logoLabel", "Word beside the logo", { optional: true, help: "For a logo that is only a mark." }),
        { kind: "workRef", key: "work", label: "Case study" },
      ],
    },
  },
  {
    name: "experience",
    title: "Experience",
    view: "/#experience",
    description: "The career timeline and the line below it.",
    root: {
      kind: "group", key: "", label: "Experience", fields: [
        {
          kind: "list", key: "roles", label: "Roles", titleKey: "company",
          fields: [
            text("company", "Company"),
            text("title", "Title"),
            text("period", "Period"),
            { kind: "boolean", key: "current", label: "Current role" },
            strings("points", "Points", undefined, true),
            strings("tags", "Tags"),
            { kind: "workRef", key: "work", label: "Case studies", many: true },
          ],
        },
        { kind: "list", key: "alongside", label: "Alongside the roles", titleKey: "title", fields: [text("title", "Title"), long("text", "Text"), { kind: "workRef", key: "work", label: "Case study" }] },
      ],
    },
  },
  {
    name: "skills",
    title: "Skills",
    view: "/#skills",
    description: "Skill groups and the How I work principles.",
    root: {
      kind: "group", key: "", label: "Skills", fields: [
        { kind: "list", key: "groups", label: "Skill groups", titleKey: "group", fields: [text("group", "Group"), strings("items", "Skills")] },
        { kind: "list", key: "principles", label: "Principles", titleKey: "title", fields: [text("title", "Title"), long("text", "Text")] },
      ],
    },
  },
  {
    name: "reviews",
    title: "Client reviews",
    view: "/#achievements",
    description: "Quotes shown under What clients say.",
    root: {
      kind: "list", key: "", label: "Reviews", titleKey: "project",
      fields: [
        long("quote", "Quote"),
        text("project", "Project"),
        text("country", "Country", { optional: true }),
        text("period", "Period"),
        { kind: "number", key: "rating", label: "Rating (1 to 5)" },
        strings("endorsements", "Endorsements"),
      ],
    },
  },
  {
    name: "site",
    title: "Section text & SEO",
    view: "/",
    description: "Every section heading, intro and button label, the contact lists, and the search engine title and description.",
    root: {
      kind: "group", key: "", label: "Site text", fields: [
        { kind: "group", key: "seo", label: "Search engines", fields: [text("title", "Page title"), long("description", "Description"), strings("keywords", "Keywords")] },
        { kind: "group", key: "hero", label: "Hero", fields: [text("workButton", "Work button"), text("builtForLabel", "Logo strip label")] },
        heading("about", "About", [["eyebrow", "Eyebrow"]]),
        heading("vision", "Vision", [["eyebrow", "Eyebrow"], ["title", "Title"]]),
        {
          kind: "group", key: "achievements", label: "Achievements", fields: [
            text("eyebrow", "Eyebrow"), text("title", "Title"), long("intro", "Intro"),
            text("reviewsTitle", "Reviews heading"), text("reviewsIntro", "Reviews line", { help: "Shown after the number of reviews." }), text("reviewsButton", "Reviews button"),
          ],
        },
        heading("collaborations", "Collaborations", [["eyebrow", "Eyebrow"], ["title", "Title"], ["intro", "Intro"]]),
        heading("experience", "Experience", [["eyebrow", "Eyebrow"], ["title", "Title"], ["intro", "Intro"]]),
        heading("skills", "Skills", [["eyebrow", "Eyebrow"], ["title", "Title"], ["intro", "Intro"]]),
        {
          kind: "group", key: "contact", label: "Contact", fields: [
            text("eyebrow", "Eyebrow"), text("title", "Title"), long("intro", "Intro"),
            text("messageTitle", "Message box title"), long("messageIntro", "Message box intro"),
            text("helpTitle", "Help list title"), strings("helpWith", "Help list"),
            text("touchTitle", "Get in touch title"),
            text("opportunitiesTitle", "Opportunities title"), strings("opportunities", "Opportunities"),
          ],
        },
      ],
    },
  },
]

export const findSection = (name: string) => SECTIONS.find((section) => section.name === name)

const blankToUndefined = (value: unknown) => (value === null || (typeof value === "string" && value.trim() === "") ? undefined : value)
const isEmpty = (value: unknown): boolean =>
  value === undefined || value === null || (typeof value === "string" && value.trim() === "") ||
  (typeof value === "object" && !Array.isArray(value) && Object.values(value as Record<string, unknown>).every(isEmpty))

/** Builds the server-side check for a field from the same description the form uses. */
export function buildSchema(field: Field, workSlugs: string[]): z.ZodTypeAny {
  const required = z.string().trim().min(1, `${field.label} is required.`)
  switch (field.kind) {
    case "text":
    case "image":
      return field.optional ? z.preprocess(blankToUndefined, z.string().trim().optional()) : required
    case "number":
      return z.coerce.number({ invalid_type_error: `${field.label} must be a number.` })
    case "boolean":
      return z.preprocess((value) => (value === true ? true : undefined), z.literal(true).optional())
    case "strings":
      return z.array(z.string()).transform((items) => items.map((item) => item.trim()).filter(Boolean))
    case "choices":
      return z.array(z.enum(field.options.map((option) => option.value) as [string, ...string[]]))
    case "workRef": {
      const slug = z.string().refine((value) => workSlugs.includes(value), `${field.label} must be an existing case study.`)
      return field.many ? z.array(slug) : slug
    }
    case "group": {
      const shape = Object.fromEntries(field.fields.map((child) => [child.key, buildSchema(child, workSlugs)]))
      const object = z.object(shape)
      return field.optional ? z.preprocess((value) => (isEmpty(value) ? undefined : value), object.optional()) : object
    }
    case "list": {
      const item = z.object(Object.fromEntries(field.fields.map((child) => [child.key, buildSchema(child, workSlugs)])))
      return z.array(item)
    }
  }
}

/** A blank value for a new list item. */
export function blankValue(field: Field): unknown {
  switch (field.kind) {
    case "number": return 0
    case "boolean": return false
    case "strings": case "choices": case "list": return []
    case "workRef": return field.many ? [] : ""
    case "group": return field.optional ? undefined : Object.fromEntries(field.fields.map((child) => [child.key, blankValue(child)]))
    default: return ""
  }
}
