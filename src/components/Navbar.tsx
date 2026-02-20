import { Link, useLocation } from "react-router-dom";
import { Search, Menu, X } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import kinglandLogo from "@/assets/kingland-logo.png";

const navItems = [
  { to: "/", label: "Home" },
  { to: "/explore", label: "Explore" },
  { to: "/about", label: "About" },
  { to: "/developer", label: "Developer" },
];

export default function Navbar() {
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-secondary/95 backdrop-blur-md border-b border-navy-light/50">
      <div className="container mx-auto flex items-center justify-between h-16 px-4">
        <Link to="/" className="flex items-center gap-2.5">
          <img src={kinglandLogo} alt="KingLand" className="h-7 w-7 object-contain invert brightness-200" />
          <span className="font-display text-xl font-bold text-secondary-foreground">
            King<span className="text-gradient-gold">Land</span>
          </span>
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={`text-sm font-medium transition-colors ${
                pathname === item.to
                  ? "text-emerald"
                  : "text-muted-foreground hover:text-secondary-foreground"
              }`}
            >
              {item.label}
            </Link>
          ))}
          <Link
            to="/explore"
            className="flex items-center gap-2 rounded-lg bg-navy-light/60 px-4 py-2 text-sm text-muted-foreground hover:text-secondary-foreground transition-colors"
          >
            <Search className="h-4 w-4" />
            Search countries…
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-secondary-foreground"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden bg-secondary border-t border-navy-light/50 overflow-hidden"
          >
            <div className="flex flex-col gap-2 p-4">
              {navItems.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={() => setOpen(false)}
                  className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    pathname === item.to
                      ? "bg-emerald/10 text-emerald"
                      : "text-muted-foreground hover:bg-navy-light/40"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
