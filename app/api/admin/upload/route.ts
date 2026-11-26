import { requireAdmin } from "@/lib/admin/auth"
import { saveUpload } from "@/lib/admin/store"

/** What can be uploaded. SVG is left out on purpose: it can carry scripts. */
const ALLOWED: Record<string, string> = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/webp": "webp",
  "application/pdf": "pdf",
}
/** Vercel accepts request bodies up to 4.5 MB. */
const MAX_BYTES = 4 * 1024 * 1024

export async function POST(request: Request) {
  const guard = await requireAdmin(request)
  if ("error" in guard) return guard.error

  const form = await request.formData().catch(() => null)
  const file = form?.get("file")
  if (!(file instanceof File)) return Response.json({ error: "Choose a file to upload." }, { status: 400 })
  const extension = ALLOWED[file.type]
  if (!extension) return Response.json({ error: "Upload a PNG, JPG, WebP or PDF file." }, { status: 415 })
  if (file.size > MAX_BYTES) return Response.json({ error: "The file is over 4 MB. Make it smaller and try again." }, { status: 413 })

  const base = file.name.replace(/\.[^.]+$/, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 60) || "file"
  const fileName = `${base}-${Date.now().toString(36)}.${extension}`
  try {
    const path = await saveUpload(fileName, Buffer.from(await file.arrayBuffer()), guard.username)
    return Response.json({ ok: true, path })
  } catch (error) {
    return Response.json({ error: error instanceof Error ? error.message : "Uploading failed." }, { status: 500 })
  }
}
