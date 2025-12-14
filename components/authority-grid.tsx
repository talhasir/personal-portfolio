import { Zap, Shield, Bot, DollarSign } from "lucide-react"

const metrics = [
  {
    icon: Zap,
    metric: "75%",
    label: "Faster Search Response",
    description:
      "Optimized Apache Solr infrastructure at Rozee.pk, reducing query latency from 800ms to 200ms for 50k+ daily job searches.",
    tags: ["Apache Solr"],
    accentColor: "text-primary",
  },
  {
    icon: Shield,
    metric: "99.8%",
    label: "System Uptime",
    description:
      "Architected high-availability chatbot infrastructure handling 2M+ monthly messages with Redis caching and load-balanced Docker deployments.",
    tags: ["Laravel", "Redis", "Docker"],
    accentColor: "text-[#00FF9F]",
  },
  {
    icon: Bot,
    metric: "500+",
    label: "Daily Autonomous Sessions",
    description:
      "Production WhatsApp Business API integration executing complex multi-turn conversations and CRM updates without human oversight.",
    tags: ["OpenAI", "Node.js", "REST APIs"],
    accentColor: "text-primary",
  },
  {
    icon: DollarSign,
    metric: "$50k+",
    label: "Monthly Transactions",
    description:
      "Custom Laravel-based POS systems for retail and restaurant chains, processing thousands of daily payment operations with zero downtime.",
    tags: ["Laravel", "MySQL", "Payment APIs"],
    accentColor: "text-[#00FF9F]",
  },
]

export function AuthorityGrid() {
  return (
    <section id="work" className="py-24 md:py-32">
      <div className="max-w-[1440px] mx-auto px-6 md:px-20">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-semibold text-foreground mb-4">Proven at Scale</h2>
          <p className="text-lg text-muted-foreground max-w-[600px] mx-auto">
            Real-world metrics from production systems serving thousands of daily users across enterprise search, AI
            automation, and fintech.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {metrics.map((item, index) => (
            <div
              key={index}
              className="glass rounded-2xl p-8 hover:translate-y-[-4px] hover:shadow-[0_0_24px_rgba(0,229,204,0.2)] transition-all duration-200 group"
            >
              {/* Icon */}
              <div className={`${item.accentColor} mb-6`}>
                <item.icon className="h-12 w-12" strokeWidth={1.5} />
              </div>

              {/* Metric */}
              <p className={`text-5xl font-bold ${item.accentColor} mb-2`}>{item.metric}</p>

              {/* Label */}
              <h3 className="text-lg font-semibold text-foreground mb-3">{item.label}</h3>

              {/* Description */}
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">{item.description}</p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {item.tags.map((tag, tagIndex) => (
                  <span
                    key={tagIndex}
                    className="text-xs font-medium px-3 py-1 bg-primary/10 text-primary rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
