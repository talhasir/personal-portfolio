/**
 * The admin session: a signed cookie that says who signed in and until when.
 * Uses Web Crypto only, so the same code runs in the proxy and in route handlers.
 */
export const SESSION_COOKIE = "portfolio_admin"
export const SESSION_DAYS = 7

const encoder = new TextEncoder()

const toBase64Url = (bytes: Uint8Array) => Buffer.from(bytes).toString("base64url")

async function signPayload(payload: string, secret: string) {
  const key = await crypto.subtle.importKey("raw", encoder.encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["sign"])
  return toBase64Url(new Uint8Array(await crypto.subtle.sign("HMAC", key, encoder.encode(payload))))
}

/** The session secret, or null when the portal is not set up yet. */
export function readSessionSecret() {
  const secret = process.env.ADMIN_SESSION_SECRET
  return secret && secret.length >= 32 ? secret : null
}

export async function createSessionToken(username: string, secret: string) {
  const payload = toBase64Url(encoder.encode(JSON.stringify({ username, expires: Date.now() + SESSION_DAYS * 86_400_000 })))
  return `${payload}.${await signPayload(payload, secret)}`
}

/** The signed-in username, or null when the token is missing, forged or expired. */
export async function verifySessionToken(token: string | undefined, secret: string | null) {
  if (!token || !secret) return null
  const [payload, signature] = token.split(".")
  if (!payload || !signature) return null
  const expected = await signPayload(payload, secret)
  if (expected.length !== signature.length) return null
  let difference = 0
  for (let index = 0; index < expected.length; index++) difference |= expected.charCodeAt(index) ^ signature.charCodeAt(index)
  if (difference !== 0) return null
  try {
    const session = JSON.parse(Buffer.from(payload, "base64url").toString("utf8")) as { username: string; expires: number }
    return session.expires > Date.now() ? session.username : null
  } catch {
    return null
  }
}
