import { ImageResponse } from "next/og"
import { readFileSync } from "node:fs"
import { join } from "node:path"
import { profile } from "@/content/profile"

export const alt = `${profile.name}, ${profile.titles.join(" and ")}`
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

/** The link preview: name, titles, the headline and the companies he has built for, in the site's colours. */
export default function OpengraphImage() {
  const signature = `data:image/svg+xml;base64,${readFileSync(join(process.cwd(), "public/signature.svg")).toString("base64")}`

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", background: "#ffffff", padding: 72, borderBottom: "14px solid #95c842" }}>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 26, fontWeight: 700, letterSpacing: 3, color: "#3493cb", textTransform: "uppercase" }}>{profile.titles.join(" · ")}</div>
          <img src={signature} width={420} height={154} alt="" style={{ marginTop: 10 }} />
          <div style={{ fontSize: 34, color: "#3a4048", marginTop: 10, maxWidth: 980 }}>{profile.headline}</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 20, fontWeight: 700, letterSpacing: 2, color: "#6a717b", textTransform: "uppercase" }}>Built for</div>
          <div style={{ fontSize: 30, fontWeight: 700, color: "#16191d", marginTop: 8 }}>{profile.companies.map((company) => company.name).join("  ·  ")}</div>
        </div>
      </div>
    ),
    size,
  )
}
