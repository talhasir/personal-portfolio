"use client"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { LogIn } from "lucide-react"

const field = "mt-1.5 h-11 w-full border border-hair-strong bg-card px-3 text-[15px] text-ink outline-none focus:border-blue"

export function LoginForm() {
  const router = useRouter()
  const params = useSearchParams()
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState("")

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setBusy(true)
    setError("")
    const form = new FormData(event.currentTarget)
    const response = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: form.get("username"), password: form.get("password") }),
    })
    if (response.ok) {
      const next = params.get("next")
      router.replace(next && next.startsWith("/admin") ? next : "/admin")
      router.refresh()
      return
    }
    const result = (await response.json().catch(() => ({}))) as { error?: string }
    setError(result.error ?? "Signing in failed.")
    setBusy(false)
  }

  return (
    <form onSubmit={submit} className="mt-6 space-y-4">
      <label className="block text-[13px] font-semibold text-ink-700">
        Username
        <input name="username" type="text" autoComplete="username" autoCapitalize="none" spellCheck={false} required className={field} />
      </label>
      <label className="block text-[13px] font-semibold text-ink-700">
        Password
        <input name="password" type="password" autoComplete="current-password" required className={field} />
      </label>
      {error && <p className="border border-red-200 bg-red-50 px-3 py-2 text-[13.5px] text-red-700">{error}</p>}
      <button type="submit" disabled={busy} className="inline-flex h-11 w-full items-center justify-center gap-2 border border-blue bg-blue text-[14.5px] font-semibold text-white hover:bg-blue-700 disabled:opacity-60">
        <LogIn className="h-4 w-4" aria-hidden />
        {busy ? "Signing in" : "Sign in"}
      </button>
    </form>
  )
}
