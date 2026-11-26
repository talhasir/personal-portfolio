import type { Metadata, Viewport } from "next"
import { Open_Sans, JetBrains_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { profile } from "@/content/profile"
import { site } from "@/content/site"
import "./globals.css"

const openSans = Open_Sans({ subsets: ["latin"], variable: "--font-open-sans", display: "swap" })
const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains-mono", display: "swap" })

const { title, description, keywords } = site.seo

export const metadata: Metadata = {
  metadataBase: new URL(profile.siteUrl),
  title: { default: title, template: `%s | ${profile.name}` },
  description,
  keywords,
  authors: [{ name: profile.name, url: profile.siteUrl }],
  alternates: { canonical: "/" },
  openGraph: { type: "website", url: "/", siteName: profile.name, title, description },
  twitter: { card: "summary_large_image", title, description },
}

export const viewport: Viewport = { themeColor: "#ffffff", colorScheme: "light" }

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.fullName,
  alternateName: profile.name,
  jobTitle: profile.titles[0],
  email: `mailto:${profile.email}`,
  url: profile.siteUrl,
  image: `${profile.siteUrl}${profile.photo}`,
  sameAs: [profile.links.linkedin.href, profile.links.github.href, profile.links.upwork].filter(Boolean),
  knowsAbout: ["Laravel", "PHP", "Node.js", "Python", "AI agents", "RAG", "CRM integrations", "WhatsApp Business API"],
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${openSans.variable} ${jetbrainsMono.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body className="font-sans">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }} />
        {children}
        <Analytics />
      </body>
    </html>
  )
}
