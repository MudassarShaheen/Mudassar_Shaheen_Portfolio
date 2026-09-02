import { Mail, Linkedin, Github, Phone, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const Contact = () => {
  return (
    <section id="contact" className="py-20 md:py-24 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_hsl(var(--primary)/0.08)_0%,_transparent_60%)]" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[32rem] h-96 bg-primary/10 rounded-full blur-[150px]" />
      
      <div className="section-container relative">
        <div className="max-w-3xl mx-auto text-center">
          <span className="section-label mx-auto">07 — Get in Touch</span>
          <h2 className="display-heading mt-6 mb-6">
            Let's Build Something
            <span className="gradient-text block mt-2">Interactive.</span>
          </h2>
          <p className="text-xl text-muted-foreground font-body mb-3">
            Have a project in mind, need a game development partner, or want to build an
            immersive experience?
          </p>
          <p className="text-sm text-muted-foreground/70 font-body mb-12">
            Based in Lahore, Pakistan · Open to remote work
          </p>

          {/* CTA Button */}
          <Button variant="hero" size="xl" asChild className="mb-16">
            <a href="mailto:mudasar.cr@gmail.com">
              Let's Talk
              <ArrowRight className="w-5 h-5 ml-2" />
            </a>
          </Button>

          {/* Contact Links */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <a
              href="mailto:mudasar.cr@gmail.com"
              className="glass-card p-6 hover-glow group flex flex-col items-center text-center"
            >
              <Mail className="w-8 h-8 text-primary mb-3 group-hover:scale-110 transition-transform" />
              <span className="font-display font-semibold mb-1">Email</span>
              <span className="text-sm text-muted-foreground font-body">mudasar.cr@gmail.com</span>
            </a>

            <a
              href="tel:+923324754717"
              className="glass-card p-6 hover-glow group flex flex-col items-center text-center"
            >
              <Phone className="w-8 h-8 text-primary mb-3 group-hover:scale-110 transition-transform" />
              <span className="font-display font-semibold mb-1">Phone</span>
              <span className="text-sm text-muted-foreground font-body">+92 332 4754717</span>
            </a>

            <a
              href="https://www.linkedin.com/in/mudassar-shaheen-49145451/"
              target="_blank"
              rel="noopener noreferrer"
              className="glass-card p-6 hover-glow group flex flex-col items-center text-center"
            >
              <Linkedin className="w-8 h-8 text-primary mb-3 group-hover:scale-110 transition-transform" />
              <span className="font-display font-semibold mb-1">LinkedIn</span>
              <span className="text-sm text-muted-foreground font-body">Connect with me</span>
            </a>
            
            <a 
              href="https://github.com/MudassarShaheen"
              target="_blank"
              rel="noopener noreferrer"
              className="glass-card p-6 hover-glow group flex flex-col items-center text-center"
            >
              <Github className="w-8 h-8 text-primary mb-3 group-hover:scale-110 transition-transform" />
              <span className="font-display font-semibold mb-1">GitHub</span>
              <span className="text-sm text-muted-foreground font-body">View my code</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
