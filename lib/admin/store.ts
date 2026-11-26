import "server-only"
import { createHash } from "node:crypto"
import { mkdir, readFile, writeFile } from "node:fs/promises"
import path from "node:path"

/** The content files the portal can edit, each saved as content/data/<name>.json. */
export const CONTENT_NAMES = ["profile", "site", "work", "achievements", "experience", "skills", "reviews"] as const
export type ContentName = (typeof CONTENT_NAMES)[number]

export const isContentName = (value: string): value is ContentName => (CONTENT_NAMES as readonly string[]).includes(value)

/**
 * Where saves go. "github" commits to the repo (Vercel then redeploys);
 * "local" writes the files on this machine (development only).
 */
export function readStorageMode(): "github" | "local" | "none" {
  if (process.env.GITHUB_TOKEN && process.env.GITHUB_REPO) return "github"
  return process.env.NODE_ENV === "production" ? "none" : "local"
}

export class ConflictError extends Error {}

const contentPath = (name: ContentName) => `content/data/${name}.json`
const sha1 = (text: string) => createHash("sha1").update(text).digest("hex")

function githubRequest(filePath: string, init?: RequestInit) {
  const branch = process.env.GITHUB_BRANCH || "main"
  const url = `https://api.github.com/repos/${process.env.GITHUB_REPO}/contents/${filePath}${init?.method === "PUT" ? "" : `?ref=${encodeURIComponent(branch)}`}`
  return fetch(url, {
    ...init,
    cache: "no-store",
    headers: { Authorization: `Bearer ${process.env.GITHUB_TOKEN}`, Accept: "application/vnd.github+json", "X-GitHub-Api-Version": "2022-11-28", ...init?.headers },
  })
}

async function readGithubFile(filePath: string) {
  const response = await githubRequest(filePath)
  if (response.status === 404) return null
  if (!response.ok) throw new Error(`GitHub read failed (${response.status}).`)
  const file = (await response.json()) as { content: string; sha: string }
  return { text: Buffer.from(file.content, "base64").toString("utf8"), version: file.sha }
}

async function writeGithubFile(filePath: string, content: Buffer, message: string, version: string | undefined) {
  const response = await githubRequest(filePath, {
    method: "PUT",
    body: JSON.stringify({ message, content: content.toString("base64"), branch: process.env.GITHUB_BRANCH || "main", ...(version ? { sha: version } : {}) }),
  })
  if (response.status === 409 || response.status === 422) throw new ConflictError("This content changed since you opened it. Reload the page and try again.")
  if (!response.ok) throw new Error(`GitHub save failed (${response.status}).`)
  const result = (await response.json()) as { content: { sha: string } }
  return result.content.sha
}

/** Reads a content file and the version it was read at. */
export async function readContent(name: ContentName) {
  if (readStorageMode() === "github") {
    const file = await readGithubFile(contentPath(name))
    if (!file) throw new Error(`${contentPath(name)} is missing from the repository.`)
    return { data: JSON.parse(file.text) as unknown, version: file.version }
  }
  const text = await readFile(path.join(process.cwd(), contentPath(name)), "utf8")
  return { data: JSON.parse(text) as unknown, version: sha1(text) }
}

/** Saves a content file, refusing when someone saved a newer version in between. Returns the new version. */
export async function writeContent(name: ContentName, data: unknown, version: string, editor: string) {
  const text = `${JSON.stringify(data, null, 2)}\n`
  const mode = readStorageMode()
  if (mode === "none") throw new Error("Saving needs GITHUB_TOKEN and GITHUB_REPO in the Vercel settings.")
  if (mode === "github") return writeGithubFile(contentPath(name), Buffer.from(text), `content: update ${name} (portal, ${editor})`, version)
  const filePath = path.join(process.cwd(), contentPath(name))
  if (sha1(await readFile(filePath, "utf8")) !== version) throw new ConflictError("This content changed since you opened it. Reload the page and try again.")
  await writeFile(filePath, text)
  return sha1(text)
}

/** Saves an uploaded file under public/uploads and returns its public path. */
export async function saveUpload(fileName: string, content: Buffer, editor: string) {
  const publicPath = `/uploads/${fileName}`
  const mode = readStorageMode()
  if (mode === "none") throw new Error("Uploading needs GITHUB_TOKEN and GITHUB_REPO in the Vercel settings.")
  if (mode === "github") {
    await writeGithubFile(`public${publicPath}`, content, `content: upload ${fileName} (portal, ${editor})`, undefined)
    return publicPath
  }
  const target = path.join(process.cwd(), "public", "uploads")
  await mkdir(target, { recursive: true })
  await writeFile(path.join(target, fileName), content)
  return publicPath
}
