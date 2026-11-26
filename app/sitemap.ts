import type { MetadataRoute } from "next"
import { profile } from "@/content/profile"
import { work } from "@/content/work"

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: profile.siteUrl, changeFrequency: "monthly", priority: 1 },
    ...work.map((study) => ({ url: `${profile.siteUrl}/work/${study.slug}`, changeFrequency: "monthly" as const, priority: 0.8 })),
  ]
}
