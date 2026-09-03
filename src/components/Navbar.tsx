import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 40);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled ? "bg-background/70 backdrop-blur-xl border-b border-border/50" : "bg-transparent"
        }`}
      >
        <div className="section-container">
          <div className="flex items-center justify-between h-20">
            <a href="#home" className="font-display text-2xl font-bold tracking-tight" aria-label="Mudassar Shaheen — home">
              <span className="text-foreground">M</span>
              <span className="text-primary">.</span>
            </a>

            <div className="hidden md:flex items-center gap-10">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="relative font-display text-xs uppercase tracking-[0.2em] text-muted-foreground hover:text-foreground transition-colors duration-300 group"
                >
                  {link.label}
                  <span className="absolute -bottom-1.5 left-0 w-0 h-px bg-primary transition-all duration-300 group-hover:w-full" />
                </a>
              ))}
            </div>

            <a
              href="#contact"
              className="hidden md:inline-flex items-center gap-2 font-display text-xs uppercase tracking-[0.2em] text-foreground border border-border/70 rounded-full px-5 py-2.5 hover:border-primary/60 hover:text-primary transition-colors duration-300"
            >
              Let's Connect
              <span aria-hidden="true">→</span>
            </a>

            <button
              type="button"
              className="md:hidden p-2 text-foreground"
              onClick={() => setIsMobileMenuOpen((v) => !v)}
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Fullscreen mobile menu */}
      <div
        className={`fixed inset-0 z-40 md:hidden bg-background backdrop-blur-xl transition-opacity duration-300 ${
          isMobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="h-full flex flex-col items-center justify-center gap-8">
          {navLinks.map((link, i) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className="font-display text-3xl uppercase tracking-wide text-foreground hover:text-primary transition-colors"
              style={{ transitionDelay: `${i * 30}ms` }}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setIsMobileMenuOpen(false)}
            className="mt-4 font-display text-sm uppercase tracking-[0.2em] border border-border rounded-full px-6 py-3 text-primary"
          >
            Let's Connect →
          </a>
        </div>
      </div>
    </>
  );
};

export default Navbar;
