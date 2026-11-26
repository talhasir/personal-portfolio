import { notFound } from "next/navigation"
import { Eye } from "lucide-react"
import { ContentEditor } from "@/components/admin/content-editor"
import { findSection } from "@/lib/admin/fields"
import { isContentName, readContent, readStorageMode } from "@/lib/admin/store"

type Props = { params: Promise<{ section: string }> }

export default async function SectionPage({ params }: Props) {
  const { section: name } = await params
  const section = findSection(name)
  if (!section || !isContentName(name)) notFound()

  const [{ data, version }, work] = await Promise.all([readContent(name), readContent("work")])
  const workOptions = (work.data as { slug: string; title: string }[]).map(({ slug, title }) => ({ slug, title }))

  return (
    <div className="max-w-[980px]">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="eyebrow">Portal</p>
          <h1 className="mt-2 text-[30px] font-bold leading-tight text-ink">{section.title}</h1>
        </div>
        <a href={section.view} target="_blank" rel="noreferrer" className="inline-flex h-10 items-center gap-2 border border-hair-strong bg-card px-4 text-[14px] font-semibold text-ink hover:border-blue hover:text-blue-700">
          <Eye className="h-4 w-4" aria-hidden />
          View on site
        </a>
      </div>
      <p className="mt-2 text-[15px] leading-relaxed text-ink-700">{section.description}</p>
      <ContentEditor section={section} initial={data} version={version} workOptions={workOptions} mode={readStorageMode()} />
    </div>
  )
}
