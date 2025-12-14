const techCategories = [
  {
    title: "The Foundation",
    subtitle: "Backend Core",
    technologies: ["PHP", "Laravel", "Node.js", "MySQL/Postgres", "REST/GraphQL"],
  },
  {
    title: "The Brain",
    subtitle: "AI Systems",
    technologies: ["OpenAI API", "LangChain", "Vector DBs", "Python", "Prompt Eng."],
  },
  {
    title: "The Scale",
    subtitle: "Performance",
    technologies: ["Apache Solr", "Redis", "Docker", "Load Balancing", "Caching"],
  },
  {
    title: "The Integration",
    subtitle: "APIs & Tools",
    technologies: ["WhatsApp API", "Payment APIs", "CRM Connectors", "Webhooks"],
  },
  {
    title: "The Deployment",
    subtitle: "Infrastructure",
    technologies: ["AWS/Cloud", "CI/CD", "Git/GitHub", "Linux"],
  },
]

export function TechStack() {
  return (
    <section className="py-24 md:py-32 bg-card/30">
      <div className="max-w-[1440px] mx-auto px-6 md:px-20">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-semibold text-foreground mb-4">The Arsenal</h2>
          <p className="text-lg text-muted-foreground max-w-[600px] mx-auto">
            Technologies I've shipped to production, not just tutorials I've watched.
          </p>
        </div>

        {/* Tech Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {techCategories.map((category, index) => (
            <div
              key={index}
              className={cn(
                "glass rounded-2xl p-6 hover:translate-y-[-4px] transition-all duration-200",
                index === techCategories.length - 1 && "md:col-span-2 lg:col-span-1",
              )}
            >
              {/* Category Header */}
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-primary">{category.title}</h3>
                <p className="text-sm text-muted-foreground">{category.subtitle}</p>
              </div>

              {/* Technologies */}
              <ul className="space-y-2">
                {category.technologies.map((tech, techIndex) => (
                  <li key={techIndex} className="flex items-center gap-2 text-sm text-foreground">
                    <span className="w-1.5 h-1.5 bg-primary/50 rounded-full" />
                    {tech}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(" ")
}
