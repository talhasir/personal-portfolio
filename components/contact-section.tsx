"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Mail, Linkedin, Github, Send } from "lucide-react"

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    interest: "",
    message: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log("Form submitted:", formData)
  }

  return (
    <section id="contact" className="py-24 md:py-32">
      <div className="max-w-[1200px] mx-auto px-6 md:px-20">
        <div className="grid lg:grid-cols-[60fr_40fr] gap-12 lg:gap-16">
          {/* Left - Contact Info */}
          <div className="space-y-8">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">Let's Build Something Autonomous</h2>
            <p className="text-lg text-muted-foreground max-w-[500px]">
              Whether you need an AI implementation partner or you're hiring senior engineering talent—let's talk.
            </p>

            {/* Contact Options */}
            <div className="space-y-4">
              <a
                href="mailto:talha@autonomia.ai"
                className="flex items-center gap-4 text-foreground hover:text-primary transition-colors group"
              >
                <div className="p-3 glass rounded-lg group-hover:glow-accent transition-all">
                  <Mail className="h-5 w-5" />
                </div>
                <span>talha@autonomia.ai</span>
              </a>
              <a
                href="https://linkedin.com/in/hafiztalha"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 text-foreground hover:text-primary transition-colors group"
              >
                <div className="p-3 glass rounded-lg group-hover:glow-accent transition-all">
                  <Linkedin className="h-5 w-5" />
                </div>
                <span>/in/hafiztalha</span>
              </a>
              <a
                href="https://github.com/hafiztalha"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 text-foreground hover:text-primary transition-colors group"
              >
                <div className="p-3 glass rounded-lg group-hover:glow-accent transition-all">
                  <Github className="h-5 w-5" />
                </div>
                <span>@hafiztalha</span>
              </a>
            </div>
          </div>

          {/* Right - Contact Form */}
          <div className="glass rounded-2xl p-6 md:p-8">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Input
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="bg-secondary border-border text-foreground placeholder:text-muted-foreground"
                />
              </div>
              <div>
                <Input
                  type="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="bg-secondary border-border text-foreground placeholder:text-muted-foreground"
                />
              </div>
              <div>
                <select
                  value={formData.interest}
                  onChange={(e) => setFormData({ ...formData, interest: e.target.value })}
                  className="w-full h-10 px-3 py-2 bg-secondary border border-border rounded-md text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  <option value="" disabled className="text-muted-foreground">
                    I'm interested in...
                  </option>
                  <option value="autonomia">Autonomia services</option>
                  <option value="hiring">Hiring you</option>
                  <option value="collaboration">Technical collaboration</option>
                </select>
              </div>
              <div>
                <Textarea
                  placeholder="Your Message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows={4}
                  className="bg-secondary border-border text-foreground placeholder:text-muted-foreground resize-none"
                />
              </div>
              <Button
                type="submit"
                size="lg"
                className="w-full bg-primary text-primary-foreground hover:bg-[#00FFF0] transition-all duration-200 group"
              >
                Send Message
                <Send className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </form>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-24 pt-8 border-t border-border text-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Hafiz Talha. All rights reserved.
          </p>
        </div>
      </div>
    </section>
  )
}
