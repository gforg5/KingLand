import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  MapPin,
  Users,
  Ruler,
  Languages,
  Banknote,
  Clock,
  Globe2,
  Mountain,
  Car,
  Calendar,
  Flag,
} from "lucide-react";
import { useCountry, useBorderCountries } from "@/hooks/useCountries";
import { formatPopulation, formatArea } from "@/lib/api";

export default function CountryDetail() {
  const { code } = useParams<{ code: string }>();
  const { data: country, isLoading, error } = useCountry(code || "");
  const { data: borderCountries } = useBorderCountries(country?.borders);

  if (isLoading) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">Loading country data…</div>
      </div>
    );
  }

  if (error || !country) {
    return (
      <div className="min-h-screen pt-24 flex flex-col items-center justify-center gap-4">
        <p className="text-xl font-display font-semibold">Country not found</p>
        <Link to="/explore" className="text-emerald hover:underline">
          ← Back to Explore
        </Link>
      </div>
    );
  }

  const languages = country.languages ? Object.values(country.languages) : [];
  const currencies = country.currencies
    ? Object.values(country.currencies)
    : [];

  const infoItems = [
    {
      icon: MapPin,
      label: "Capital",
      value: country.capital?.join(", ") || "N/A",
    },
    {
      icon: Users,
      label: "Population",
      value: formatPopulation(country.population),
    },
    {
      icon: Ruler,
      label: "Area",
      value: formatArea(country.area),
    },
    {
      icon: Globe2,
      label: "Region",
      value: `${country.region}${country.subregion ? ` — ${country.subregion}` : ""}`,
    },
    {
      icon: Languages,
      label: "Languages",
      value: languages.length > 0 ? languages.join(", ") : "N/A",
    },
    {
      icon: Banknote,
      label: "Currencies",
      value:
        currencies.length > 0
          ? currencies.map((c) => `${c.name} (${c.symbol})`).join(", ")
          : "N/A",
    },
    {
      icon: Clock,
      label: "Timezones",
      value: country.timezones.join(", "),
    },
    {
      icon: Mountain,
      label: "Landlocked",
      value: country.landlocked ? "Yes" : "No",
    },
    {
      icon: Car,
      label: "Drives on",
      value: country.car?.side
        ? country.car.side.charAt(0).toUpperCase() + country.car.side.slice(1)
        : "N/A",
    },
    {
      icon: Calendar,
      label: "Start of Week",
      value: country.startOfWeek
        ? country.startOfWeek.charAt(0).toUpperCase() + country.startOfWeek.slice(1)
        : "N/A",
    },
    {
      icon: Flag,
      label: "UN Member",
      value: country.unMember ? "Yes" : "No",
    },
    {
      icon: Globe2,
      label: "Independent",
      value: country.independent ? "Yes" : "No",
    },
  ];

  return (
    <div className="min-h-screen pt-20 pb-16">
      {/* Flag Hero */}
      <div className="relative h-64 sm:h-80 overflow-hidden">
        <img
          src={country.flags.svg}
          alt={country.flags.alt || `Flag of ${country.name.common}`}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
      </div>

      <div className="container mx-auto px-4 -mt-20 relative z-10">
        <Link
          to="/explore"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Explore
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Header */}
          <div className="flex items-start gap-6 mb-10">
            <img
              src={country.flags.svg}
              alt=""
              className="w-20 h-14 rounded-lg shadow-lg object-cover border border-border"
            />
            <div>
              <h1 className="font-display text-3xl sm:text-4xl font-bold">
                {country.name.common}
              </h1>
              <p className="text-muted-foreground">{country.name.official}</p>
            </div>
          </div>

          {/* Info Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
            {infoItems.map((item) => (
              <div
                key={item.label}
                className="flex items-start gap-3 p-4 rounded-xl bg-card border border-border"
              >
                <div className="p-2 rounded-lg bg-emerald/10">
                  <item.icon className="h-5 w-5 text-emerald" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs text-muted-foreground uppercase tracking-wide">
                    {item.label}
                  </p>
                  <p className="text-sm font-medium text-card-foreground mt-0.5 break-words">
                    {item.value}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Coat of Arms */}
          {country.coatOfArms?.svg && (
            <div className="mb-12">
              <h2 className="font-display text-xl font-bold mb-4">Coat of Arms</h2>
              <div className="inline-block p-6 bg-card rounded-xl border border-border">
                <img
                  src={country.coatOfArms.svg}
                  alt={`Coat of arms of ${country.name.common}`}
                  className="h-32 w-auto"
                />
              </div>
            </div>
          )}

          {/* Map Link */}
          <div className="mb-12">
            <h2 className="font-display text-xl font-bold mb-4">Location</h2>
            <div className="flex flex-wrap gap-3">
              <a
                href={country.maps.googleMaps}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl gradient-accent text-primary-foreground font-medium hover:opacity-90 transition-opacity"
              >
                <MapPin className="h-4 w-4" />
                View on Google Maps
              </a>
              <a
                href={country.maps.openStreetMaps}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-card border border-border font-medium hover:border-emerald/40 transition-colors"
              >
                View on OpenStreetMap
              </a>
            </div>
          </div>

          {/* Border Countries */}
          {borderCountries && borderCountries.length > 0 && (
            <div>
              <h2 className="font-display text-xl font-bold mb-4">
                Neighboring Countries
              </h2>
              <div className="flex flex-wrap gap-3">
                {borderCountries.map((bc) => (
                  <Link
                    key={bc.cca3}
                    to={`/country/${bc.cca3}`}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-card border border-border hover:border-emerald/40 hover:shadow-glow transition-all"
                  >
                    <img
                      src={bc.flags.svg}
                      alt=""
                      className="w-6 h-4 rounded-sm object-cover"
                    />
                    <span className="text-sm font-medium">{bc.name.common}</span>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
