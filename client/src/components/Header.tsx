import { Button } from "@/components/ui/button";
import { Menu, X, Phone } from "lucide-react";
import { Link } from "wouter";
import { useState } from "react";
import { useAuth } from "@/_core/hooks/useAuth";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, isAuthenticated } = useAuth();

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setMobileMenuOpen(false);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">CA</span>
              </div>
              <span className="font-semibold text-lg">Cams Assistenza</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/blog" className="text-sm font-medium hover:text-primary transition-colors">
              Blog
            </Link>
            {isAuthenticated && user?.role === 'admin' && (
              <Link href="/admin" className="text-sm font-medium hover:text-primary transition-colors">
                Admin
              </Link>
            )}
            <button onClick={() => scrollToSection('servizi')} className="text-sm font-medium hover:text-primary transition-colors">
              Servizi
            </button>
            <button onClick={() => scrollToSection('marchi')} className="text-sm font-medium hover:text-primary transition-colors">
              Marchi
            </button>
            <button onClick={() => scrollToSection('certificazioni')} className="text-sm font-medium hover:text-primary transition-colors">
              Certificazioni
            </button>
            <button onClick={() => scrollToSection('contatti')} className="text-sm font-medium hover:text-primary transition-colors">
              Contatti
            </button>
          </nav>

          {/* CTA Button */}
          <div className="hidden md:flex items-center gap-4">
            <Button onClick={() => scrollToSection('contatti')} className="gap-2">
              <Phone className="h-4 w-4" />
              Richiedi Intervento
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2"
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <nav className="flex flex-col gap-4">
              <button onClick={() => scrollToSection('servizi')} className="text-sm font-medium hover:text-primary transition-colors text-left">
                Servizi
              </button>
              <button onClick={() => scrollToSection('marchi')} className="text-sm font-medium hover:text-primary transition-colors text-left">
                Marchi
              </button>
              <button onClick={() => scrollToSection('certificazioni')} className="text-sm font-medium hover:text-primary transition-colors text-left">
                Certificazioni
              </button>
              <button onClick={() => scrollToSection('contatti')} className="text-sm font-medium hover:text-primary transition-colors text-left">
                Contatti
              </button>
              <Button onClick={() => scrollToSection('contatti')} className="gap-2 w-full">
                <Phone className="h-4 w-4" />
                Richiedi Intervento
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
