import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { JetBrains_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })
const _jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export const metadata: Metadata = {
  title: "Hafiz Talha | Founder & Senior AI Engineer",
  description:
    "Founder of Autonomia & Senior AI Engineer. I merge battle-tested backend architectures with cutting-edge Agentic AI to build autonomous systems that execute enterprise workflows without human intervention.",
  keywords: ["Agentic AI", "Laravel Developer", "AI Automation", "Senior PHP Engineer", "WhatsApp Business API"],
  authors: [{ name: "Hafiz Talha" }],
  openGraph: {
    title: "Hafiz Talha | Founder & Senior AI Engineer",
    description: "Building autonomous AI systems that execute enterprise workflows.",
    type: "website",
  },
  generator: 'v0.app'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
