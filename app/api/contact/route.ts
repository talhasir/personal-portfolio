import { NextResponse } from "next/server"
import { contactSchema } from "@/lib/contact"

// A few messages per address per hour. In memory: enough to stop a burst;
// each server instance keeps its own count.
const WINDOW_MS = 60 * 60 * 1000
const LIMIT = 5
const sent = new Map<string, number[]>()

const escapeHtml = (text: string) => text.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c] ?? c)

export async function POST(request: Request) {
  const body = await request.json().catch(() => null)
  const parsed = contactSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0]?.message ?? "Please check the form." }, { status: 422 })
  }
  // A filled honeypot is a bot: answer as if it worked, send nothing.
  if (parsed.data.company) return NextResponse.json({ ok: true })

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown"
  const now = Date.now()
  const recent = (sent.get(ip) ?? []).filter((time) => now - time < WINDOW_MS)
  if (recent.length >= LIMIT) {
    return NextResponse.json({ error: "Too many messages from your connection. Please try again later, or email me directly." }, { status: 429 })
  }

  const apiKey = process.env.RESEND_API_KEY
  const to = process.env.CONTACT_TO
  if (!apiKey || !to) {
    return NextResponse.json({ error: "The form is not connected yet. Please email me directly." }, { status: 503 })
  }

  const { name, email, topic, message } = parsed.data
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: process.env.CONTACT_FROM || "Portfolio <onboarding@resend.dev>",
      to: [to],
      reply_to: email,
      subject: `Portfolio: ${topic} from ${name}`,
      text: `${message}\n\nFrom: ${name} <${email}>\nTopic: ${topic}`,
      html: `<p>${escapeHtml(message).replace(/\n/g, "<br>")}</p><p>From: ${escapeHtml(name)} &lt;${escapeHtml(email)}&gt;<br>Topic: ${escapeHtml(topic)}</p>`,
    }),
  }).catch(() => null)

  if (!response?.ok) {
    return NextResponse.json({ error: "The message could not be sent. Please try again, or email me directly." }, { status: 502 })
  }
  sent.set(ip, [...recent, now])

  return NextResponse.json({ ok: true })
}
