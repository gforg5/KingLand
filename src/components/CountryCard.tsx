import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import type { Country } from "@/lib/api";
import { formatPopulation } from "@/lib/api";

interface CountryCardProps {
  country: Country;
  index?: number;
}

export default function CountryCard({ country, index = 0 }: CountryCardProps) {
  const currencies = country.currencies
    ? Object.values(country.currencies)
        .map((c) => c.name)
        .join(", ")
    : "N/A";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: Math.min(index * 0.03, 0.5), duration: 0.4 }}
      whileHover={{ scale: 1.04, y: -8 }}
    >
      <Link
        to={`/country/${country.cca3}`}
        className="group block rounded-xl overflow-hidden bg-card border border-border hover:shadow-glow transition-all duration-300 hover:-translate-y-1"
      >
        {/* Flag */}
        <div className="relative h-40 overflow-hidden">
          <img
            src={country.flags.svg}
            alt={country.flags.alt || `Flag of ${country.name.common}`}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-card/80 to-transparent" />
          <span className="absolute bottom-3 left-3 text-xs font-medium bg-secondary/80 text-secondary-foreground backdrop-blur-sm px-2.5 py-1 rounded-full">
            {country.region}
          </span>
        </div>

        {/* Info */}
        <div className="p-4 space-y-2">
          <h3 className="font-display font-bold text-lg text-card-foreground group-hover:text-emerald transition-colors truncate">
            {country.name.common}
          </h3>

          <div className="space-y-1.5 text-sm text-muted-foreground">
            <div className="flex justify-between">
              <span>Capital</span>
              <span className="text-card-foreground font-medium">
                {country.capital?.[0] || "N/A"}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Population</span>
              <span className="text-card-foreground font-medium">
                {formatPopulation(country.population)}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Currency</span>
              <span className="text-card-foreground font-medium truncate ml-4 text-right">
                {currencies}
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
