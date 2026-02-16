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
        <div className="absolute inset-0">
          <img
            src={heroGlobe}
            alt="Globe"
            className="w-full h-full object-cover opacity-40 mix-blend-lighten"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-secondary" />
        </div>

        <div className="container relative z-10 mx-auto px-4 py-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-3xl"
          >
            <div className="inline-flex items-center gap-2 rounded-full bg-emerald/10 border border-emerald/20 px-4 py-1.5 mb-6">
              <Sparkles className="h-4 w-4 text-gold" />
              <span className="text-sm font-medium text-emerald-light">
                Explore 195+ Countries — Real Data, Zero Fluff
              </span>
            </div>

            <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-[1.1] mb-6">
              <span className="text-secondary-foreground">Discover the</span>
              <br />
              <span className="text-gradient-gold">World's Knowledge</span>
            </h1>

            <p className="text-lg sm:text-xl text-muted-foreground max-w-xl mb-10 leading-relaxed">
              Authentic country data — capitals, populations, currencies, languages, and more. Your gateway to genuine global knowledge.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link
                to="/explore"
                className="inline-flex items-center gap-2 gradient-accent text-primary-foreground font-semibold px-8 py-3.5 rounded-xl shadow-glow hover:opacity-90 transition-opacity"
              >
                Start Exploring
                <ArrowRight className="h-5 w-5" />
              </Link>
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
                className="text-center p-6 rounded-xl bg-navy-light/40 border border-navy-light/60"
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

      {/* Footer */}
      <footer className="bg-secondary py-10 border-t border-navy-light/40">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Globe className="h-5 w-5 text-emerald" />
            <span className="font-display font-bold text-secondary-foreground">
              King<span className="text-gradient-gold">Land</span>
            </span>
          </div>
          <p className="text-sm text-muted-foreground">
            Real data. Genuine knowledge. 195+ countries.
          </p>
          <p className="text-xs text-muted-foreground mt-2">
            Data sourced from REST Countries API, UN & World Bank
          </p>
        </div>
      </footer>
    </div>
  );
}
