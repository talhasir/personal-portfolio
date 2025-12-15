import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight, Trophy, Briefcase, Bot } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center pt-20 pb-10 overflow-x-hidden">
      {/* Background gradient accent */}
      <div className="absolute top-1/2 right-1/4 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl -translate-y-1/2" />

      <div className="max-w-[1440px] mx-auto px-6 md:px-20 w-full">
        <div className="grid lg:grid-cols-[45fr_55fr] gap-12 lg:gap-8 items-center">
          {/* Left Content */}
          <div className="order-2 lg:order-1 space-y-8">
            {/* Eyebrow */}
            <p className="text-sm font-medium uppercase tracking-[0.05em] text-primary">Founder × Senior Engineer</p>

            {/* Main Headline */}
            <h1 className="text-4xl md:text-5xl lg:text-[72px] font-bold leading-[1.1] tracking-[-0.02em] text-foreground text-balance">
              Architecting the Future of Autonomous Work
            </h1>

            {/* Sub-headline */}
            <p className="text-lg md:text-xl text-muted-foreground max-w-[540px] leading-relaxed mx-auto lg:mx-0">
              Founder of <span className="text-foreground font-semibold">Autonomia</span> & Senior Software Engineer.
              I merge battle-tested backend architectures with cutting-edge Agentic AI to build autonomous
              systems that execute enterprise workflows without human intervention.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <a href="#autonomia">
                <Button
                  size="lg"
                  className="bg-primary text-primary-foreground hover:bg-[#00FFF0] transition-all duration-200 group w-full sm:w-auto"
                >
                  Explore Autonomia
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </a>
              <a href="#work">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-border text-foreground hover:bg-secondary transition-colors bg-transparent w-full sm:w-auto"
                >
                  Technical Portfolio
                </Button>
              </a>
            </div>

            {/* Social Proof Bar */}
            <div className="flex flex-wrap gap-6 pt-4 text-sm text-muted-foreground justify-center lg:justify-start">
              <div className="flex items-center gap-2">
                <Trophy className="h-4 w-4 text-primary" />
                <span>Top Rated Upwork</span>
              </div>
              <div className="flex items-center gap-2">
                <Briefcase className="h-4 w-4 text-primary" />
                <span>4+ Years Production</span>
              </div>
              <div className="flex items-center gap-2">
                <Bot className="h-4 w-4 text-primary" />
                <span>500+ Daily AI Sessions</span>
              </div>
            </div>
          </div>

          {/* Right Image */}
          <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
            <div className="relative">
              {/* Floating geometric frame */}
              <div className="absolute -inset-4 border-2 border-primary/30 rounded-2xl translate-x-5 translate-y-5" />

              {/* Image with glow effect */}
              <div className="relative w-[300px] h-[380px] md:w-[420px] md:h-[520px] lg:w-[480px] lg:h-[580px] rounded-2xl overflow-hidden glow-accent mx-auto">
                <Image
                  src="/images/gemini-generated-image-snq29dsnq29dsnq2-20-281-29.jpeg"
                  alt="Hafiz Talha - Founder & Senior AI Engineer"
                  fill
                  className="object-cover object-top"
                  priority
                />
                {/* Gradient fade at bottom */}
                <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-background to-transparent" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
