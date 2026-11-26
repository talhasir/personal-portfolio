import { Briefcase, Github, Linkedin, type LucideIcon } from "lucide-react"
import { profile } from "@/content/profile"
import { cn } from "@/lib/utils"

const socials: { name: string; href: string; icon: LucideIcon }[] = [
  { name: "LinkedIn", href: profile.links.linkedin.href, icon: Linkedin },
  { name: "GitHub", href: profile.links.github.href, icon: Github },
  ...(profile.links.upwork ? [{ name: "Upwork", href: profile.links.upwork, icon: Briefcase }] : []),
]

/** Square icon links to every public profile; used in the hero and the footer. */
export function SocialLinks({ className }: { className?: string }) {
  return (
    <ul className={cn("flex items-center gap-2", className)}>
      {socials.map((social) => (
        <li key={social.name}>
          <a
            href={social.href}
            target="_blank"
            rel="noreferrer"
            aria-label={social.name}
            title={social.name}
            className="flex h-10 w-10 items-center justify-center border border-hair bg-card text-ink-700 transition-colors hover:border-blue hover:bg-blue hover:text-white"
          >
            <social.icon className="h-[18px] w-[18px]" aria-hidden />
          </a>
        </li>
      ))}
    </ul>
  )
}
