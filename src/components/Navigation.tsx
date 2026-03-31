import { useState } from "react";
import { Menu, X, ArrowLeft } from "lucide-react";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-4 py-4">
      <div className="container mx-auto flex items-center justify-between">
        {/* Left: All Services Button */}
        <a
          href="https://withsebgreen.co.uk"
          className="glass-card flex items-center gap-2 px-4 py-2 rounded-full border border-primary/20 hover:border-primary/40 transition-all duration-300"
        >
          <ArrowLeft className="w-4 h-4 text-primary" />
          <span className="text-sm font-medium text-primary">Hub</span>
        </a>

        {/* Centre: Title */}
        <h1 className="hidden md:block text-xl font-serif font-semibold text-primary">
          Memorial Strategy with Seb Green
        </h1>

        {/* Right: Hamburger Menu */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="p-2 text-primary hover:text-primary/80 transition-colors"
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 mx-4">
          <div className="glass-card rounded-2xl p-6 space-y-4">
            <h2 className="md:hidden text-lg font-serif font-semibold text-primary mb-4">
              Memorial Strategy with Seb Green
            </h2>
            <button
              onClick={() => scrollToSection("approach")}
              className="block w-full text-left py-2 text-foreground hover:text-primary transition-colors"
            >
              Our Approach
            </button>
            <button
              onClick={() => scrollToSection("services")}
              className="block w-full text-left py-2 text-foreground hover:text-primary transition-colors"
            >
              Service Checklist
            </button>
            <button
              onClick={() => scrollToSection("pricing")}
              className="block w-full text-left py-2 text-foreground hover:text-primary transition-colors"
            >
              Service Options
            </button>
            <button
              onClick={() => scrollToSection("examples")}
              className="block w-full text-left py-2 text-foreground hover:text-primary transition-colors"
            >
              Service Examples
            </button>
            <button
              onClick={() => scrollToSection("tools")}
              className="block w-full text-left py-2 text-foreground hover:text-primary transition-colors"
            >
              Featured Tools
            </button>
            <button
              onClick={() => scrollToSection("action")}
              className="block w-full text-left py-2 text-foreground hover:text-primary transition-colors"
            >
              Contact
            </button>
            <a
              href="/privacy"
              className="block w-full text-left py-2 text-foreground hover:text-primary transition-colors"
            >
              Privacy Policy
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
