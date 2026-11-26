"use client"

import { useState } from "react"
import { CheckCircle2, Loader2, Send } from "lucide-react"
import { contactSchema, TOPICS } from "@/lib/contact"
import { profile } from "@/content/profile"
import { cn } from "@/lib/utils"

type State = { status: "idle" | "sending" | "sent" | "error"; message?: string }

const field = "w-full border border-hair-strong bg-card px-3.5 py-2.5 text-[15px] text-ink outline-none transition-colors placeholder:text-ink-400 focus:border-blue"

export function ContactForm() {
  const [state, setState] = useState<State>({ status: "idle" })

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    const data = Object.fromEntries(new FormData(form))
    const parsed = contactSchema.safeParse(data)
    if (!parsed.success) {
      setState({ status: "error", message: parsed.error.issues[0]?.message })
      return
    }
    setState({ status: "sending" })
    try {
      const response = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(parsed.data) })
      const result = (await response.json().catch(() => ({}))) as { error?: string }
      if (!response.ok) {
        setState({ status: "error", message: result.error ?? "The message could not be sent." })
        return
      }
      form.reset()
      setState({ status: "sent" })
    } catch {
      setState({ status: "error", message: "The message could not be sent. Please check your connection." })
    }
  }

  if (state.status === "sent") {
    return (
      <div className="panel flex items-start gap-3 p-6" role="status">
        <CheckCircle2 className="h-6 w-6 flex-none text-lime" aria-hidden />
        <div>
          <p className="text-[17px] font-bold text-ink">Message sent</p>
          <p className="mt-1 text-[14.5px] text-ink-700">Thank you. I will reply to the email address you gave.</p>
          <button type="button" className="mt-3 text-[14px] font-semibold text-blue-700 hover:underline" onClick={() => setState({ status: "idle" })}>
            Send another message
          </button>
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={submit} noValidate className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="mb-1.5 block text-[13px] font-semibold text-ink">Name</span>
          <input name="name" required autoComplete="name" className={field} />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-[13px] font-semibold text-ink">Email</span>
          <input name="email" type="email" required autoComplete="email" className={field} />
        </label>
      </div>
      <label className="block">
        <span className="mb-1.5 block text-[13px] font-semibold text-ink">Topic</span>
        <select name="topic" defaultValue={TOPICS[0]} className={field}>
          {TOPICS.map((topic) => <option key={topic}>{topic}</option>)}
        </select>
      </label>
      <label className="block">
        <span className="mb-1.5 block text-[13px] font-semibold text-ink">Message</span>
        <textarea name="message" required rows={6} className={cn(field, "resize-y")} />
      </label>
      {/* Hidden from people: a bot that fills it in is ignored. */}
      <input name="company" tabIndex={-1} autoComplete="off" aria-hidden className="absolute -left-[9999px] h-0 w-0 opacity-0" />
      {state.status === "error" && (
        <p role="alert" className="border border-red-200 bg-red-50 px-3.5 py-2.5 text-[14px] text-red-700">
          {state.message} {state.message?.includes("email me") && <a href={`mailto:${profile.email}`} className="font-semibold underline">{profile.email}</a>}
        </p>
      )}
      <button type="submit" disabled={state.status === "sending"} className="inline-flex h-11 items-center gap-2 border border-blue bg-blue px-5 text-[14px] font-semibold text-white hover:bg-blue-700 disabled:opacity-70">
        {state.status === "sending" ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden /> : <Send className="h-4 w-4" aria-hidden />}
        {state.status === "sending" ? "Sending…" : "Send message"}
      </button>
    </form>
  )
}
