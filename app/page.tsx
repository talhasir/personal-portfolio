import { HeroSection } from "@/components/hero-section"
import { AuthorityGrid } from "@/components/authority-grid"
import { AutonomiaSection } from "@/components/autonomia-section"
import { ExperienceTimeline } from "@/components/experience-timeline"
import { TechStack } from "@/components/tech-stack"
import { ContactSection } from "@/components/contact-section"
import { Navigation } from "@/components/navigation"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      <HeroSection />
      <AuthorityGrid />
      <AutonomiaSection />
      <ExperienceTimeline />
      <TechStack />
      <ContactSection />
    </main>
  )
}
