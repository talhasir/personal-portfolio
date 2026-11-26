import { z } from "zod"

export const TOPICS = ["Agentic software or AI agents", "A SaaS platform or integration", "Hiring for a senior or lead role", "Working with Autonomia", "An interview or podcast", "Something else"] as const

/** One message from the contact form; checked in the browser and again on the server. */
export const contactSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name.").max(100),
  email: z.string().trim().email("Please enter a valid email address.").max(200),
  topic: z.enum(TOPICS),
  message: z.string().trim().min(20, "Please write at least 20 characters.").max(5000),
  /** Hidden from people; a bot fills it in, and the server then quietly sends nothing. */
  company: z.string().max(200).optional(),
})

export type ContactMessage = z.infer<typeof contactSchema>
