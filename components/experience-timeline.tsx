"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { ChevronDown } from "lucide-react"

const experiences = [
  {
    year: "2024 - Present",
    roles: [
      {
        title: "Chairman & Founder",
        company: "Autonomia",
        description:
          "Leading product vision and client acquisition for agentic AI services. Building the sales & delivery org.",
        highlights: [
          "Architecting autonomous AI agents for enterprise clients",
          "Building and scaling the engineering team",
          "Securing strategic partnerships with enterprise customers",
        ],
        stack: ["OpenAI", "LangChain", "Python", "Node.js"],
        isCurrent: true,
      },
      {
        title: "Senior Software Engineer",
        company: "Rozee.pk",
        description:
          "Optimizing search infrastructure (Apache Solr) and scaling chatbot systems serving Pakistan's largest job marketplace.",
        highlights: [
          "Reduced search latency by 75% through Solr optimization",
          "Architected chatbot handling 2M+ monthly messages",
          "Implemented Redis caching layer for high availability",
        ],
        stack: ["Laravel", "Solr", "Redis", "Docker"],
        isCurrent: true,
      },
    ],
  },
  {
    year: "2022 - 2023",
    roles: [
      {
        title: "Full Stack Developer",
        company: "Techons",
        description:
          "Built enterprise software solutions including POS systems and ERP modules for retail and restaurant chains.",
        highlights: [
          "Built custom POS for retail chains processing $50k+ monthly",
          "Developed ERP modules for inventory management",
          "Integrated payment gateways and hardware peripherals",
          "Led 3-person development team",
        ],
        stack: ["Laravel", "Vue.js", "MySQL", "Payment APIs"],
        isCurrent: false,
      },
    ],
  },
  {
    year: "2021 - 2023",
    roles: [
      {
        title: "Freelance Developer",
        company: "Upwork",
        description:
          "Top Rated freelancer delivering Laravel applications, API integrations, and database optimization.",
        highlights: [
          "100% job success rate across 20+ projects",
          "Specialized in Laravel backend development",
          "Built custom CRM and automation tools",
        ],
        stack: ["Laravel", "PHP", "MySQL", "REST APIs"],
        isCurrent: false,
        badge: "Top Rated",
      },
    ],
  },
]

export function ExperienceTimeline() {
  const [expandedIndex, setExpandedIndex] = useState<string | null>("0-0")

  return (
    <section id="experience" className="py-24 md:py-32">
      <div className="max-w-[1200px] mx-auto px-6 md:px-20">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-semibold text-foreground mb-4">Operating at Two Altitudes</h2>
          <p className="text-lg text-muted-foreground max-w-[700px] mx-auto">
            Simultaneously building the future while executing at scale— founder by day, senior engineer by day (yes,
            both at once).
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-border md:-translate-x-1/2" />

          <div className="space-y-12">
            {experiences.map((period, periodIndex) => (
              <div key={periodIndex} className="relative">
                {/* Year marker */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-3 h-3 bg-primary rounded-full relative z-10 md:absolute md:left-1/2 md:-translate-x-1/2" />
                  <span className="text-sm font-medium text-primary uppercase tracking-wider md:absolute md:left-1/2 md:translate-x-6">
                    {period.roles[0].isCurrent && "Current × " + period.roles.length}
                    {!period.roles[0].isCurrent && period.year}
                  </span>
                </div>

                {/* Role cards */}
                <div className="grid md:grid-cols-2 gap-6 pl-8 md:pl-0">
                  {period.roles.map((role, roleIndex) => {
                    const cardKey = `${periodIndex}-${roleIndex}`
                    const isExpanded = expandedIndex === cardKey

                    return (
                      <div
                        key={roleIndex}
                        className={cn(
                          "glass rounded-2xl p-6 cursor-pointer transition-all duration-300",
                          isExpanded && "glow-accent",
                          roleIndex % 2 === 0 ? "md:mr-8" : "md:ml-8",
                        )}
                        onClick={() => setExpandedIndex(isExpanded ? null : cardKey)}
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="text-lg font-semibold text-foreground">{role.title}</h3>
                              {role.badge && (
                                <span className="text-xs font-medium px-2 py-0.5 bg-primary/20 text-primary rounded-full">
                                  {role.badge}
                                </span>
                              )}
                            </div>
                            <p className="text-sm text-primary">@ {role.company}</p>
                            {!role.isCurrent && <p className="text-xs text-muted-foreground mt-1">{period.year}</p>}
                          </div>
                          <ChevronDown
                            className={cn(
                              "h-5 w-5 text-muted-foreground transition-transform",
                              isExpanded && "rotate-180",
                            )}
                          />
                        </div>

                        <p className="text-sm text-muted-foreground mb-4">{role.description}</p>

                        {/* Expandable content */}
                        <div
                          className={cn(
                            "overflow-hidden transition-all duration-300",
                            isExpanded ? "max-h-96 opacity-100" : "max-h-0 opacity-0",
                          )}
                        >
                          <ul className="space-y-2 mb-4">
                            {role.highlights.map((highlight, hIndex) => (
                              <li key={hIndex} className="flex items-start gap-2 text-sm text-muted-foreground">
                                <span className="text-primary">•</span>
                                {highlight}
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Tech stack */}
                        <div className="flex flex-wrap gap-2 pt-2 border-t border-border">
                          {role.stack.map((tech, techIndex) => (
                            <span
                              key={techIndex}
                              className="text-xs font-medium px-2 py-1 bg-secondary text-muted-foreground rounded"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
