import { Heart } from "lucide-react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import kinglandLogo from "@/assets/kingland-logo.png";

export default function Footer() {
  const [hovered, setHovered] = useState(false);

  return (
    <footer className="bg-secondary py-12 border-t border-navy-light/40">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center gap-4">
          <Link to="/" className="flex items-center gap-2">
            <img src={kinglandLogo} alt="KingLand" className="h-6 w-6 object-contain invert" />
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

          {/* Made with ❤️ in PK → wipe to Pakhtunistan */}
          <div
            className="relative cursor-default overflow-hidden"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
          >
            <div className="relative h-6 flex items-center justify-center" style={{ minWidth: "320px" }}>
              {/* Default text: Made with ❤️ in PK */}
              <motion.div
                className="absolute inset-0 flex items-center justify-center gap-1.5 text-sm text-muted-foreground whitespace-nowrap"
                animate={{
                  x: hovered ? "-110%" : "0%",
                  opacity: hovered ? 0 : 1,
                }}
                transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
              >
                Made with{" "}
                <motion.span
                  animate={{ scale: [1, 1.3, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                >
                  <Heart className="h-4 w-4 text-destructive fill-destructive" />
                </motion.span>{" "}
                in PK
              </motion.div>

              {/* Revealed text: Pakhtunistan, Khyber Pakhtunkhwa */}
              <motion.div
                className="absolute inset-0 flex items-center justify-center"
                animate={{
                  x: hovered ? "0%" : "110%",
                  opacity: hovered ? 1 : 0,
                }}
                transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
              >
                <span className="text-sm font-display font-semibold text-gradient-emerald whitespace-nowrap">
                  Pakhtunistan, Khyber Pakhtunkhwa
                </span>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
