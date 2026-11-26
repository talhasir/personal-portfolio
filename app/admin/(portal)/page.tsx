import Link from "next/link"
import { ArrowRight, Eye } from "lucide-react"
import { SECTIONS } from "@/lib/admin/fields"
import { readStorageMode } from "@/lib/admin/store"

const modeNote = {
  github: "Every save becomes a commit on GitHub. Vercel then publishes the site again, which takes about a minute.",
  local: "You are running the site on this computer, so saves go straight into the content files and show on the local site right away. Commit them to publish.",
  none: "Saving is not set up on this server. Add GITHUB_TOKEN and GITHUB_REPO in the Vercel settings; the README explains how.",
}

export default function PortalHome() {
  const mode = readStorageMode()
  return (
    <div className="max-w-[980px]">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="eyebrow">Portal</p>
          <h1 className="mt-2 text-[30px] font-bold leading-tight text-ink">Manage your site</h1>
        </div>
        <a href="/" target="_blank" rel="noreferrer" className="inline-flex h-10 items-center gap-2 border border-hair-strong bg-card px-4 text-[14px] font-semibold text-ink hover:border-blue hover:text-blue-700">
          <Eye className="h-4 w-4" aria-hidden />
          View site
        </a>
      </div>
      <p className={mode === "none" ? "mt-3 border border-red-200 bg-red-50 p-3 text-[14.5px] text-red-700" : "mt-3 text-[15px] leading-relaxed text-ink-700"}>{modeNote[mode]}</p>
      <div className="mt-8 grid gap-px border border-hair bg-hair sm:grid-cols-2">
        {SECTIONS.map((section) => (
          <Link key={section.name} href={`/admin/${section.name}`} className="group flex flex-col bg-card p-5 transition-colors hover:bg-page sm:[&:last-child:nth-child(odd)]:col-span-2">
            <p className="text-[17px] font-bold text-ink">{section.title}</p>
            <p className="mt-1.5 flex-1 text-[14px] leading-relaxed text-ink-500">{section.description}</p>
            <span className="mt-4 inline-flex items-center gap-1.5 text-[13.5px] font-semibold text-blue-700">
              Edit
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden />
            </span>
          </Link>
        ))}
      </div>
    </div>
  )
}
