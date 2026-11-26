import "server-only"
import { scryptSync, timingSafeEqual } from "node:crypto"
import { cookies, headers } from "next/headers"
import { SESSION_COOKIE, readSessionSecret, verifySessionToken } from "@/lib/admin/session"

/** Checks a password against ADMIN_PASSWORD_HASH ("scrypt:<salt hex>:<hash hex>", made by `npm run admin:password`). */
export function checkAdminLogin(username: string, password: string) {
  const adminUsername = process.env.ADMIN_USERNAME?.trim().toLowerCase()
  const stored = process.env.ADMIN_PASSWORD_HASH?.trim()
  if (!adminUsername || !stored) return false
  const [scheme, saltHex, hashHex] = stored.split(":")
  if (scheme !== "scrypt" || !saltHex || !hashHex) return false
  const expected = Buffer.from(hashHex, "hex")
  const actual = scryptSync(password, Buffer.from(saltHex, "hex"), expected.length)
  const usernameMatches = username.trim().toLowerCase() === adminUsername
  return timingSafeEqual(actual, expected) && usernameMatches
}

/** True when every setting the portal needs to sign someone in is present. */
export function isAdminConfigured() {
  return Boolean(process.env.ADMIN_USERNAME && process.env.ADMIN_PASSWORD_HASH && readSessionSecret())
}

/** The signed-in admin's username, or null. */
export async function readAdminSession() {
  const token = (await cookies()).get(SESSION_COOKIE)?.value
  return verifySessionToken(token, readSessionSecret())
}

/**
 * Guards an admin API call: a valid session, and for writes, a request that
 * comes from this site (a second line behind the same-site cookie).
 */
export async function requireAdmin(request: Request) {
  const username = await readAdminSession()
  if (!username) return { error: Response.json({ error: "Please sign in again." }, { status: 401 }) }
  if (request.method !== "GET") {
    const origin = request.headers.get("origin")
    const host = (await headers()).get("host")
    if (!origin || !host || new URL(origin).host !== host) return { error: Response.json({ error: "This request did not come from the portal." }, { status: 403 }) }
  }
  return { username }
}
