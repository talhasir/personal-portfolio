import { NextResponse, type NextRequest } from "next/server"
import { SESSION_COOKIE, readSessionSecret, verifySessionToken } from "@/lib/admin/session"

/** Keeps the portal private: every /admin page and admin API needs a valid session. */
export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl
  if (pathname === "/admin/login" || pathname === "/api/admin/login") return NextResponse.next()

  const email = await verifySessionToken(request.cookies.get(SESSION_COOKIE)?.value, readSessionSecret())
  if (email) return NextResponse.next()

  if (pathname.startsWith("/api/")) return NextResponse.json({ error: "Please sign in again." }, { status: 401 })
  const login = new URL("/admin/login", request.url)
  login.searchParams.set("next", pathname)
  return NextResponse.redirect(login)
}

export const config = { matcher: ["/admin/:path*", "/api/admin/:path*"] }
