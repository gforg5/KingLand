import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Globe, MapPin, Users, TrendingUp, ArrowRight, Sparkles } from "lucide-react";
import heroGlobe from "@/assets/hero-globe.jpg";
import { useAllCountries } from "@/hooks/useCountries";
import CountryCard from "@/components/CountryCard";

const stats = [
  { icon: Globe, label: "Countries", value: "195+" },
  { icon: Users, label: "Data Points", value: "10K+" },
  { icon: MapPin, label: "Capitals", value: "195" },
  { icon: TrendingUp, label: "Live Data", value: "Real-time" },
];

export default function Index() {
  const { data: countries } = useAllCountries();
  const featured = countries
    ?.filter((c) =>
      ["USA", "JPN", "FRA", "BRA", "IND", "AUS", "ZAF", "GBR"].includes(c.cca3)
    )
    .slice(0, 8);

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative min-h-[90vh] flex items-center gradient-hero overflow-hidden">
        {/* Animated hero background - CIRCULAR ROTATION */}
        <div className="absolute inset-0">
          <motion.img
            src={heroGlobe}
            alt="Globe"
            className="w-full h-full object-cover opacity-40 mix-blend-lighten"
            animate={{
              rotate: [0, 360],
            }}
            transition={{
              duration: 60,
              repeat: Infinity,
              ease: "linear",
            }}
            style={{ transformOrigin: "center center", scale: 1.1 }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-secondary" />

          {/* Floating light orbs */}
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full"
              style={{
                width: 100 + i * 50,
                height: 100 + i * 50,
                left: `${15 + i * 15}%`,
                top: `${20 + (i % 3) * 20}%`,
                background: i % 2 === 0
                  ? "radial-gradient(circle, hsl(var(--emerald) / 0.08), transparent 70%)"
                  : "radial-gradient(circle, hsl(var(--gold) / 0.06), transparent 70%)",
              }}
              animate={{
                y: [0, -30 - i * 5, 0],
                x: [0, 10 + i * 3, 0],
                opacity: [0.3, 0.7, 0.3],
              }}
              transition={{
                duration: 6 + i * 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.8,
              }}
            />
          ))}

          {/* Particle dots */}
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={`p-${i}`}
              className="absolute w-1 h-1 rounded-full bg-emerald/30"
              style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }}
              animate={{ opacity: [0, 1, 0], scale: [0, 1.5, 0] }}
              transition={{ duration: 3 + Math.random() * 3, repeat: Infinity, delay: Math.random() * 5 }}
            />
          ))}
        </div>

        <div className="container relative z-10 mx-auto px-4 py-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-3xl"
          >
            {/* Wobble badge */}
            <motion.div
              className="inline-flex items-center gap-2 rounded-full bg-emerald/10 border border-emerald/20 px-4 py-1.5 mb-6"
              animate={{
                rotate: [0, -1, 1, -1, 0],
                scale: [1, 1.02, 0.98, 1.02, 1],
                boxShadow: [
                  "0 0 0px hsl(var(--emerald) / 0)",
                  "0 0 20px hsl(var(--emerald) / 0.15)",
                  "0 0 0px hsl(var(--emerald) / 0)",
                ],
              }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              <Sparkles className="h-4 w-4 text-gold" />
              <span className="text-sm font-medium text-emerald-light">
                Explore 195+ Countries — Real Data, Zero Fluff
              </span>
            </motion.div>

            {/* Text expand animation */}
            <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-[1.1] mb-6">
              <motion.span
                className="text-secondary-foreground inline-block"
                initial={{ letterSpacing: "0.12em", opacity: 0, scale: 0.85 }}
                animate={{
                  letterSpacing: "0em",
                  opacity: 1,
                  scale: 1,
                  rotate: [0, -1, 1.5, -1, 0.5, 0],
                }}
                transition={{
                  letterSpacing: { duration: 1.4, ease: "easeOut" },
                  opacity: { duration: 0.8 },
                  scale: { duration: 1.4, ease: "easeOut" },
                  rotate: { duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 1.5 },
                }}
              >
                Discover the
              </motion.span>
              <br />
              <motion.span
                className="text-gradient-gold inline-block"
                initial={{ letterSpacing: "0.2em", opacity: 0, scale: 0.8 }}
                animate={{
                  letterSpacing: "0em",
                  opacity: 1,
                  scale: [1, 1.02, 0.98, 1.01, 1],
                  rotate: [0, 0.8, -1, 0.5, 0],
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                }}
                transition={{
                  letterSpacing: { duration: 1.8, ease: "easeOut", delay: 0.3 },
                  opacity: { duration: 1, delay: 0.3 },
                  scale: { duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1.5 },
                  rotate: { duration: 4, repeat: Infinity, ease: "easeInOut", delay: 2 },
                  backgroundPosition: { duration: 4, repeat: Infinity, delay: 1.5 },
                }}
                style={{ backgroundSize: "200% 200%" }}
              >
                World's Knowledge
              </motion.span>
            </h1>

            <p className="text-lg sm:text-xl text-muted-foreground max-w-xl mb-10 leading-relaxed">
              Authentic country data — capitals, populations, currencies, languages, and more. Your gateway to genuine global knowledge.
            </p>

            {/* Neon Start Exploring button */}
            <div className="flex flex-wrap gap-4">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
                <Link
                  to="/explore"
                  className="group relative inline-flex items-center gap-2 gradient-accent text-primary-foreground font-semibold px-8 py-3.5 rounded-xl transition-all overflow-hidden"
                >
                  {/* Neon glow layers */}
                  <motion.div
                    className="absolute inset-0 rounded-xl"
                    animate={{
                      boxShadow: [
                        "0 0 5px hsl(var(--emerald) / 0.4), 0 0 20px hsl(var(--emerald) / 0.2), 0 0 40px hsl(var(--emerald) / 0.1)",
                        "0 0 10px hsl(var(--emerald) / 0.6), 0 0 30px hsl(var(--emerald) / 0.3), 0 0 60px hsl(var(--emerald) / 0.15), 0 0 80px hsl(var(--emerald) / 0.1)",
                        "0 0 5px hsl(var(--emerald) / 0.4), 0 0 20px hsl(var(--emerald) / 0.2), 0 0 40px hsl(var(--emerald) / 0.1)",
                      ],
                    }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  />
                  {/* Neon sweep */}
                  <motion.div
                    className="absolute inset-0 rounded-xl bg-gradient-to-r from-transparent via-white/20 to-transparent"
                    animate={{ x: ["-100%", "100%"] }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", repeatDelay: 1 }}
                  />
                  <span className="relative z-10">Start Exploring</span>
                  <ArrowRight className="relative z-10 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-secondary py-16 -mt-1">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ scale: 1.06, y: -4 }}
                className="text-center p-6 rounded-xl bg-navy-light/40 border border-navy-light/60 hover:border-emerald/30 hover:shadow-glow transition-all duration-300"
              >
                <stat.icon className="h-8 w-8 text-emerald mx-auto mb-3" />
                <div className="font-display text-2xl font-bold text-secondary-foreground">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Countries */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-display text-3xl sm:text-4xl font-bold mb-3">
              Featured Countries
            </h2>
            <p className="text-muted-foreground max-w-md mx-auto">
              Dive into rich profiles of nations around the globe
            </p>
          </motion.div>

          {featured && featured.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featured.map((country, i) => (
                <CountryCard key={country.cca3} country={country} index={i} />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {Array.from({ length: 8 }).map((_, i) => (
                <div
                  key={i}
                  className="rounded-xl bg-card border border-border animate-pulse h-72"
                />
              ))}
            </div>
          )}

          <div className="text-center mt-12">
            <Link
              to="/explore"
              className="inline-flex items-center gap-2 text-emerald font-semibold hover:underline"
            >
              Browse all countries
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
