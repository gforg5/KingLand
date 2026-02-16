import { Globe, Heart } from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-secondary py-12 border-t border-navy-light/40">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center gap-4">
          <Link to="/" className="flex items-center gap-2">
            <Globe className="h-5 w-5 text-emerald" />
            <span className="font-display font-bold text-secondary-foreground">
              King<span className="text-gradient-gold">Land</span>
            </span>
          </Link>

          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
            <Link to="/explore" className="hover:text-emerald transition-colors">Explore</Link>
            <Link to="/about" className="hover:text-emerald transition-colors">About</Link>
            <Link to="/developer" className="hover:text-emerald transition-colors">Developer</Link>
          </div>

          <div className="w-16 h-px bg-navy-light/60 my-2" />

          <p className="text-sm text-muted-foreground text-center">
            © 2026 Sayed Mohsin Ali. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground text-center italic">
            Crafted with precision for professionals.
          </p>
          <p className="text-sm text-muted-foreground text-center flex items-center gap-1.5">
            Made with <Heart className="h-4 w-4 text-destructive fill-destructive" /> in PK Pakhtunistan, Khyber Pakhtunkhwa
          </p>
        </div>
      </div>
    </footer>
  );
}
