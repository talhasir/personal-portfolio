import { Button } from "@/components/ui/button"
import { ArrowRight, Check, Cpu, Database, MessageSquare, BarChart3 } from "lucide-react"

const capabilities = [
  "Custom LLM-powered workflow automation",
  "Enterprise system integration (CRM, ERP, databases)",
  "Autonomous decision-making with vector memory",
  "WhatsApp/Telegram/Web channel deployment",
  "Real-time monitoring and optimization dashboards",
]

export function AutonomiaSection() {
  return (
    <section id="autonomia" className="py-24 md:py-32 bg-background">
      <div className="max-w-[1200px] mx-auto px-6 md:px-20">
        <div className="grid lg:grid-cols-[40fr_60fr] gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            {/* Eyebrow */}
            <p className="text-sm font-medium uppercase tracking-[0.05em] text-primary">The Future is Autonomous</p>

            {/* Headline */}
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-[1.15] text-foreground text-balance">
              Building Agents That Don't Just Chat—They Execute
            </h2>

            {/* Body Copy */}
            <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
              <p>
                At <span className="text-foreground font-semibold">Autonomia</span>, we've moved beyond conversational
                AI theater. We architect <span className="text-foreground font-semibold">autonomous agents</span> that
                integrate directly into your enterprise workflows—connecting to CRMs, executing multi-step processes,
                making data-driven decisions, and operating 24/7 without human babysitting.
              </p>
              <p>
                We're not building demos. We're shipping production-grade agentic systems that replace entire
                operational workflows.
              </p>
            </div>

            {/* Capability List */}
            <ul className="space-y-3">
              {capabilities.map((capability, index) => (
                <li key={index} className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                  <span className="text-foreground">{capability}</span>
                </li>
              ))}
            </ul>

            {/* CTA */}
            <a href="#contact">
              <Button
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-[#00FFF0] transition-all duration-200 group"
              >
                Schedule a Consultation
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </a>
          </div>

          {/* Right Visual - Agent Architecture Diagram */}
          <div className="relative">
            <div className="glass rounded-2xl p-8 space-y-6">
              {/* Header */}
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-foreground">Agent Control Center</h3>
                <span className="flex items-center gap-2 text-sm text-[#00FF9F]">
                  <span className="w-2 h-2 bg-[#00FF9F] rounded-full animate-pulse" />
                  Live
                </span>
              </div>

              {/* Metrics Row */}
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-secondary/50 rounded-lg p-4 text-center">
                  <p className="text-2xl font-bold text-primary">47</p>
                  <p className="text-xs text-muted-foreground">Active Agents</p>
                </div>
                <div className="bg-secondary/50 rounded-lg p-4 text-center">
                  <p className="text-2xl font-bold text-foreground">1,284</p>
                  <p className="text-xs text-muted-foreground">Tasks Today</p>
                </div>
                <div className="bg-secondary/50 rounded-lg p-4 text-center">
                  <p className="text-2xl font-bold text-[#00FF9F]">1.2s</p>
                  <p className="text-xs text-muted-foreground">Avg Response</p>
                </div>
              </div>

              {/* Flow Diagram */}
              <div className="flex items-center justify-between gap-4 py-4">
                <div className="flex-1 glass rounded-lg p-4 text-center border border-primary/20">
                  <MessageSquare className="h-6 w-6 text-primary mx-auto mb-2" />
                  <p className="text-xs font-medium text-foreground">User Request</p>
                </div>
                <div className="flex items-center">
                  <div className="w-8 h-0.5 bg-primary/50" />
                  <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                  <div className="w-8 h-0.5 bg-primary/50" />
                </div>
                <div className="flex-1 glass rounded-lg p-4 text-center border border-primary/20 glow-accent">
                  <Cpu className="h-6 w-6 text-primary mx-auto mb-2" />
                  <p className="text-xs font-medium text-foreground">Agent Brain</p>
                </div>
                <div className="flex items-center">
                  <div className="w-8 h-0.5 bg-primary/50" />
                  <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                  <div className="w-8 h-0.5 bg-primary/50" />
                </div>
                <div className="flex-1 glass rounded-lg p-4 text-center border border-primary/20">
                  <Database className="h-6 w-6 text-primary mx-auto mb-2" />
                  <p className="text-xs font-medium text-foreground">Your Systems</p>
                </div>
              </div>

              {/* Activity Log */}
              <div className="space-y-2">
                <div className="flex items-center gap-3 text-sm">
                  <BarChart3 className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Latest Activity</span>
                </div>
                <div className="space-y-2 text-xs font-mono">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <span className="text-[#00FF9F]">✓</span>
                    <span>CRM updated: Lead status → Qualified</span>
                    <span className="ml-auto text-[#6B6B6B]">2s ago</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <span className="text-[#00FF9F]">✓</span>
                    <span>Email sequence triggered: Follow-up #3</span>
                    <span className="ml-auto text-[#6B6B6B]">15s ago</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <span className="text-[#00FF9F]">✓</span>
                    <span>Meeting scheduled: Discovery call</span>
                    <span className="ml-auto text-[#6B6B6B]">1m ago</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
