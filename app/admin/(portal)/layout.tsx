import { redirect } from "next/navigation"
import { AdminNav } from "@/components/admin/admin-nav"
import { readAdminSession } from "@/lib/admin/auth"
import { SECTIONS } from "@/lib/admin/fields"
import { readStorageMode } from "@/lib/admin/store"

export const dynamic = "force-dynamic"

export default async function PortalLayout({ children }: { children: React.ReactNode }) {
  const username = await readAdminSession()
  if (!username) redirect("/admin/login")

  return (
    <div className="lg:grid lg:min-h-screen lg:grid-cols-[260px_minmax(0,1fr)]">
      <AdminNav sections={SECTIONS.map(({ name, title }) => ({ name, title }))} username={username} mode={readStorageMode()} />
      <main className="min-w-0 px-5 py-8 md:px-10 md:py-10">{children}</main>
    </div>
  )
}
