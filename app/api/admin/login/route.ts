import { cookies } from "next/headers"
import { checkAdminLogin, isAdminConfigured } from "@/lib/admin/auth"
import { SESSION_COOKIE, SESSION_DAYS, createSessionToken, readSessionSecret } from "@/lib/admin/session"

/** Failed attempts per address, so a password cannot be guessed by brute force. */
const attempts = new Map<string, { count: number; until: number }>()
const MAX_ATTEMPTS = 5
const WINDOW_MS = 15 * 60_000

export async function POST(request: Request) {
  if (!isAdminConfigured()) return Response.json({ error: "The portal is not set up yet. Add ADMIN_USERNAME, ADMIN_PASSWORD_HASH and ADMIN_SESSION_SECRET." }, { status: 503 })

  const address = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "local"
  const record = attempts.get(address)
  if (record && record.until > Date.now() && record.count >= MAX_ATTEMPTS) {
    return Response.json({ error: "Too many attempts. Try again in 15 minutes." }, { status: 429 })
  }

  const body = (await request.json().catch(() => ({}))) as { username?: string; password?: string }
  if (!body.username || !body.password || !checkAdminLogin(body.username, body.password)) {
    const fresh = !record || record.until <= Date.now()
    attempts.set(address, { count: fresh ? 1 : record.count + 1, until: fresh ? Date.now() + WINDOW_MS : record.until })
    return Response.json({ error: "That username and password do not match." }, { status: 401 })
  }

  attempts.delete(address)
  const token = await createSessionToken(body.username.trim().toLowerCase(), readSessionSecret()!)
  ;(await cookies()).set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: SESSION_DAYS * 86_400,
  })
  return Response.json({ ok: true })
}
