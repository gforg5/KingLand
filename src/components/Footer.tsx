import { Heart } from "lucide-react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import kinglandLogo from "@/assets/kingland-logo.png";

export default function Footer() {
  const [showLocation, setShowLocation] = useState(false);

  return (
    <footer className="bg-secondary py-12 border-t border-navy-light/40">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center gap-4">
          <Link to="/" className="flex items-center gap-2">
            <img src={kinglandLogo} alt="KingLand" className="h-6 w-6 object-contain" />
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

          {/* Made with hover reveal */}
          <div
            className="relative cursor-default"
            onMouseEnter={() => setShowLocation(true)}
            onMouseLeave={() => setShowLocation(false)}
          >
            <motion.p
              className="text-sm text-muted-foreground text-center flex items-center gap-1.5"
              whileHover={{ scale: 1.03 }}
            >
              Made with{" "}
              <motion.span
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              >
                <Heart className="h-4 w-4 text-destructive fill-destructive" />
              </motion.span>{" "}
              in PK
            </motion.p>

            <AnimatePresence>
              {showLocation && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.9, filter: "blur(4px)" }}
                  animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: 8, scale: 0.9, filter: "blur(4px)" }}
                  transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
                  className="absolute left-1/2 -translate-x-1/2 top-full mt-2 whitespace-nowrap"
                >
                  <motion.div
                    className="px-4 py-2 rounded-xl bg-navy-light border border-emerald/20 shadow-glow"
                    initial={{ backgroundPosition: "0% 50%" }}
                    animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    <motion.span
                      className="text-sm font-display font-semibold text-gradient-emerald"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.15, duration: 0.3 }}
                    >
                      Pakhtunistan, Khyber Pakhtunkhwa
                    </motion.span>
                  </motion.div>
                  {/* Arrow */}
                  <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 rotate-45 bg-navy-light border-l border-t border-emerald/20" />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </footer>
  );
}
