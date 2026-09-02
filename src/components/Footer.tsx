import { Mail, Linkedin, Github } from "lucide-react";

const quickLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

const socials = [
  { label: "Email", href: "mailto:mudasar.cr@gmail.com", icon: Mail },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/mudassar-shaheen-49145451/", icon: Linkedin },
  { label: "GitHub", href: "https://github.com/MudassarShaheen", icon: Github },
];

const Footer = () => {
  return (
    <footer className="py-14 border-t border-border/50">
      <div className="section-container">
        <div className="flex flex-col md:flex-row justify-between gap-10">
          <div>
            <div className="font-display text-xl font-bold">
              <span className="text-foreground">MUDASSAR SHAHEEN</span>
              <span className="text-primary">.</span>
            </div>
            <p className="text-sm text-muted-foreground font-body mt-1">Unity Game Developer</p>
          </div>

          <nav aria-label="Footer" className="flex flex-wrap gap-x-6 gap-y-2">
            {quickLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="font-display text-xs uppercase tracking-[0.2em] text-muted-foreground hover:text-primary transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            {socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target={social.href.startsWith("http") ? "_blank" : undefined}
                rel={social.href.startsWith("http") ? "noopener noreferrer" : undefined}
                aria-label={social.label}
                className="p-2 rounded-full border border-border/60 text-muted-foreground hover:text-primary hover:border-primary/50 transition-colors"
              >
                <social.icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>

        <div className="border-t border-border/50 mt-10 pt-6 text-center">
          <p className="text-sm text-muted-foreground font-body">
            © {new Date().getFullYear()} Mudassar Shaheen. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
