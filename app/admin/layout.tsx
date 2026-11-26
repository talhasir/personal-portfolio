import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Portal",
  robots: { index: false, follow: false },
}

export default function AdminRootLayout({ children }: { children: React.ReactNode }) {
  return <div className="min-h-screen bg-page">{children}</div>
}
