import { requireAdmin } from "@/lib/admin/auth"
import { buildSchema, findSection } from "@/lib/admin/fields"
import { ConflictError, isContentName, readContent, writeContent } from "@/lib/admin/store"

type Context = { params: Promise<{ name: string }> }

/** The slugs of every case study, so references can be checked. */
async function readWorkSlugs() {
  const { data } = await readContent("work")
  return (data as { slug: string }[]).map((study) => study.slug)
}

export async function PUT(request: Request, { params }: Context) {
  const guard = await requireAdmin(request)
  if ("error" in guard) return guard.error

  const { name } = await params
  const section = findSection(name)
  if (!section || !isContentName(name)) return Response.json({ error: "Unknown section." }, { status: 404 })

  const body = (await request.json().catch(() => null)) as { data?: unknown; version?: string } | null
  if (!body || body.data === undefined || !body.version) return Response.json({ error: "Nothing to save." }, { status: 400 })

  const slugs = name === "work" ? ((body.data as { slug?: string }[]) ?? []).map((study) => study.slug ?? "") : await readWorkSlugs()
  const parsed = buildSchema(section.root, slugs).safeParse(body.data)
  if (!parsed.success) {
    const issue = parsed.error.issues[0]
    return Response.json({ error: issue.message, path: issue.path }, { status: 422 })
  }

  if (name === "work") {
    const bad = slugs.find((slug) => !/^[a-z0-9]+(-[a-z0-9]+)*$/.test(slug))
    if (bad !== undefined) return Response.json({ error: `"${bad}" is not a valid page address. Use lowercase words joined by dashes.` }, { status: 422 })
    const repeated = slugs.find((slug, index) => slugs.indexOf(slug) !== index)
    if (repeated) return Response.json({ error: `Two case studies use the page address "${repeated}".` }, { status: 422 })
  }

  try {
    const version = await writeContent(name, parsed.data, body.version, guard.username)
    return Response.json({ ok: true, version })
  } catch (error) {
    const status = error instanceof ConflictError ? 409 : 500
    return Response.json({ error: error instanceof Error ? error.message : "Saving failed." }, { status })
  }
}
