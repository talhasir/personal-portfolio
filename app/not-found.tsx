import { ButtonLink } from "@/components/ui"

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-[70vh] max-w-[640px] flex-col items-start justify-center px-5">
      <p className="eyebrow">404</p>
      <h1 className="mt-2 text-[32px] font-bold text-ink">This page does not exist</h1>
      <p className="mt-3 text-[16px] text-ink-700">The address may have changed. Everything is on the home page.</p>
      <ButtonLink href="/" className="mt-6">Go to the home page</ButtonLink>
    </main>
  )
}
