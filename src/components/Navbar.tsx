import { useState, useEffect } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

const projectCategories = [
  { label: "Client Projects", href: "#projects" },
  { label: "Steam/PC Games", href: "#steam" },
  { label: "VR Projects", href: "#vr" },
  { label: "Hyper-Casual", href: "#hypercasual" },
  { label: "Puzzle Games", href: "#puzzle" },
];

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Automation", href: "#automation" },
  { label: "Tutorials", href: "#tutorials" },
  { label: "Contact", href: "#contact" },
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProjectsDropdownOpen, setIsProjectsDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-background/80 backdrop-blur-xl border-b border-border/50' : ''
    }`}>
      <div className="section-container">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <a href="#" className="font-display text-2xl font-bold">
            <span className="text-foreground">MS</span>
            <span className="text-primary">.</span>
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6">
            {/* Projects Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setIsProjectsDropdownOpen(true)}
              onMouseLeave={() => setIsProjectsDropdownOpen(false)}
            >
              <button className="flex items-center gap-1 font-display text-sm uppercase tracking-wider text-muted-foreground hover:text-primary transition-colors py-2">
                Projects
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isProjectsDropdownOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {/* Dropdown Menu */}
              <div className={`absolute top-full left-0 mt-1 min-w-[200px] py-2 bg-card/95 backdrop-blur-xl border border-border/50 rounded-lg shadow-xl transition-all duration-200 ${
                isProjectsDropdownOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'
              }`}>
                {projectCategories.map((category) => (
                  <a
                    key={category.label}
                    href={category.href}
                    className="block px-4 py-2 font-display text-sm text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
                    onClick={() => setIsProjectsDropdownOpen(false)}
                  >
                    {category.label}
                  </a>
                ))}
              </div>
            </div>

            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="font-display text-sm uppercase tracking-wider text-muted-foreground hover:text-primary transition-colors"
              >
                {link.label}
              </a>
            ))}
            <Button variant="outline" size="sm" asChild>
              <a href="mailto:mudasar.cr@gmail.com">Hire Me</a>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border/50">
            {/* Mobile Projects Category */}
            <div className="mb-4">
              <p className="text-xs text-primary font-display uppercase tracking-wider mb-2 px-2">Projects</p>
              {projectCategories.map((category) => (
                <a
                  key={category.label}
                  href={category.href}
                  className="block py-2 px-4 font-display text-sm text-muted-foreground hover:text-primary transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {category.label}
                </a>
              ))}
            </div>
            
            <div className="border-t border-border/50 pt-4">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="block py-3 font-display text-sm uppercase tracking-wider text-muted-foreground hover:text-primary transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </a>
              ))}
            </div>
            <Button variant="outline" size="sm" className="mt-4 w-full" asChild>
              <a href="mailto:mudasar.cr@gmail.com">Hire Me</a>
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
