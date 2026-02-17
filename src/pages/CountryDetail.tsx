import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft, MapPin, Users, Ruler, Languages, Banknote, Clock,
  Globe2, Mountain, Car, Calendar, Flag, Shield, Building2, Landmark,
} from "lucide-react";
import { useCountry, useBorderCountries } from "@/hooks/useCountries";
import { formatPopulation, formatArea } from "@/lib/api";
import { useState } from "react";

const tabs = ["Overview", "Geography", "Government", "Economy", "Culture"] as const;
type Tab = typeof tabs[number];

export default function CountryDetail() {
  const { code } = useParams<{ code: string }>();
  const { data: country, isLoading, error } = useCountry(code || "");
  const { data: borderCountries } = useBorderCountries(country?.borders);
  const [activeTab, setActiveTab] = useState<Tab>("Overview");

  if (isLoading) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center">
        <motion.div
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="text-muted-foreground font-display"
        >
          Loading country data…
        </motion.div>
      </div>
    );
  }

  if (error || !country) {
    return (
      <div className="min-h-screen pt-24 flex flex-col items-center justify-center gap-4">
        <p className="text-xl font-display font-semibold">Country not found</p>
        <Link to="/explore" className="text-emerald hover:underline">← Back to Explore</Link>
      </div>
    );
  }

  const languages = country.languages ? Object.values(country.languages) : [];
  const currencies = country.currencies ? Object.values(country.currencies) : [];

  return (
    <div className="min-h-screen pt-20 pb-16">
      {/* Flag Hero with parallax-like animation */}
      <div className="relative h-56 sm:h-72 overflow-hidden">
        <motion.img
          src={country.flags.svg}
          alt={country.flags.alt || `Flag of ${country.name.common}`}
          className="w-full h-full object-cover"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
      </div>

      <div className="container mx-auto px-4 -mt-16 relative z-10">
        <Link
          to="/explore"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Explore
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Header */}
          <div className="flex items-start gap-5 mb-8">
            <motion.img
              src={country.flags.svg}
              alt=""
              className="w-16 h-11 rounded-lg shadow-lg object-cover border border-border"
              whileHover={{ scale: 1.1 }}
            />
            <div>
              <h1 className="font-display text-3xl sm:text-4xl font-bold">{country.name.common}</h1>
              <p className="text-muted-foreground text-sm">{country.name.official}</p>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-1 mb-8 overflow-x-auto pb-2">
            {tabs.map((tab) => (
              <motion.button
                key={tab}
                onClick={() => setActiveTab(tab)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
                  activeTab === tab
                    ? "bg-emerald text-primary-foreground shadow-glow"
                    : "bg-card border border-border text-muted-foreground hover:border-emerald/40"
                }`}
              >
                {tab}
              </motion.button>
            ))}
          </div>

          {/* Tab Content */}
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {activeTab === "Overview" && (
              <OverviewTab country={country} languages={languages} currencies={currencies} />
            )}
            {activeTab === "Geography" && <GeographyTab country={country} />}
            {activeTab === "Government" && <GovernmentTab country={country} />}
            {activeTab === "Economy" && <EconomyTab country={country} currencies={currencies} />}
            {activeTab === "Culture" && <CultureTab country={country} languages={languages} />}
          </motion.div>

          {/* Coat of Arms */}
          {country.coatOfArms?.svg && (
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="mt-10 mb-10"
            >
              <h2 className="font-display text-xl font-bold mb-4">Coat of Arms</h2>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="inline-block p-6 bg-card rounded-xl border border-border"
              >
                <img src={country.coatOfArms.svg} alt={`Coat of arms of ${country.name.common}`} className="h-32 w-auto" />
              </motion.div>
            </motion.div>
          )}

          {/* Map Links */}
          {country.maps && (
            <div className="mb-10">
              <h2 className="font-display text-xl font-bold mb-4">Location</h2>
              <div className="flex flex-wrap gap-3">
                <motion.a
                  whileHover={{ scale: 1.04 }}
                  href={country.maps.googleMaps}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl gradient-accent text-primary-foreground font-medium"
                >
                  <MapPin className="h-4 w-4" /> Google Maps
                </motion.a>
                <motion.a
                  whileHover={{ scale: 1.04 }}
                  href={country.maps.openStreetMaps}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-card border border-border font-medium hover:border-emerald/40 transition-colors"
                >
                  OpenStreetMap
                </motion.a>
              </div>
            </div>
          )}

          {/* Border Countries */}
          {borderCountries && borderCountries.length > 0 && (
            <div>
              <h2 className="font-display text-xl font-bold mb-4">Neighboring Countries</h2>
              <div className="flex flex-wrap gap-3">
                {borderCountries.map((bc) => (
                  <motion.div key={bc.cca3} whileHover={{ scale: 1.06, y: -3 }}>
                    <Link
                      to={`/country/${bc.cca3}`}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-card border border-border hover:border-emerald/40 hover:shadow-glow transition-all"
                    >
                      <img src={bc.flags.svg} alt="" className="w-6 h-4 rounded-sm object-cover" />
                      <span className="text-sm font-medium">{bc.name.common}</span>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}

/* ── Sub-components for each tab ── */

function InfoCard({ icon: Icon, label, value }: { icon: any; label: string; value: string }) {
  return (
    <motion.div
      whileHover={{ scale: 1.03, y: -2 }}
      className="flex items-start gap-3 p-4 rounded-xl bg-card border border-border hover:border-emerald/30 hover:shadow-glow transition-all duration-300"
    >
      <div className="p-2 rounded-lg bg-emerald/10">
        <Icon className="h-5 w-5 text-emerald" />
      </div>
      <div className="min-w-0">
        <p className="text-xs text-muted-foreground uppercase tracking-wide">{label}</p>
        <p className="text-sm font-medium text-card-foreground mt-0.5 break-words">{value}</p>
      </div>
    </motion.div>
  );
}

function OverviewTab({ country, languages, currencies }: any) {
  const items = [
    { icon: MapPin, label: "Capital", value: country.capital?.join(", ") || "N/A" },
    { icon: Users, label: "Population", value: formatPopulation(country.population) },
    { icon: Ruler, label: "Area", value: formatArea(country.area) },
    { icon: Globe2, label: "Region", value: `${country.region}${country.subregion ? ` — ${country.subregion}` : ""}` },
    { icon: Languages, label: "Languages", value: languages.length > 0 ? languages.join(", ") : "N/A" },
    { icon: Banknote, label: "Currencies", value: currencies.length > 0 ? currencies.map((c: any) => `${c.name} (${c.symbol})`).join(", ") : "N/A" },
    { icon: Clock, label: "Timezones", value: country.timezones?.join(", ") || "N/A" },
    { icon: Flag, label: "UN Member", value: country.unMember ? "Yes" : "No" },
    { icon: Globe2, label: "Independent", value: country.independent ? "Yes" : "No" },
    { icon: Shield, label: "ISO Codes", value: `${country.cca2} / ${country.cca3}` },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {items.map((item) => (
        <InfoCard key={item.label} {...item} />
      ))}
    </div>
  );
}

function GeographyTab({ country }: any) {
  const items = [
    { icon: Globe2, label: "Continent", value: country.continents?.join(", ") || "N/A" },
    { icon: Globe2, label: "Region / Subregion", value: `${country.region}${country.subregion ? ` / ${country.subregion}` : ""}` },
    { icon: Ruler, label: "Total Area", value: formatArea(country.area) },
    { icon: Mountain, label: "Landlocked", value: country.landlocked ? "Yes — No ocean access" : "No — Has coastline" },
    { icon: MapPin, label: "Coordinates", value: country.latlng ? `${country.latlng[0].toFixed(2)}°, ${country.latlng[1].toFixed(2)}°` : "N/A" },
    { icon: Globe2, label: "Borders", value: country.borders?.length ? `${country.borders.length} neighboring countries` : "No land borders" },
    { icon: Clock, label: "Timezones", value: country.timezones?.join(", ") || "N/A" },
    { icon: Car, label: "Drives On", value: country.car?.side ? country.car.side.charAt(0).toUpperCase() + country.car.side.slice(1) + " side" : "N/A" },
    { icon: Calendar, label: "Start of Week", value: country.startOfWeek ? country.startOfWeek.charAt(0).toUpperCase() + country.startOfWeek.slice(1) : "N/A" },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {items.map((item) => (
        <InfoCard key={item.label} {...item} />
      ))}
    </div>
  );
}

function GovernmentTab({ country }: any) {
  const items = [
    { icon: Flag, label: "UN Member", value: country.unMember ? "Yes — Full member state" : "No" },
    { icon: Shield, label: "Independent", value: country.independent ? "Yes — Sovereign state" : "No — Dependent territory" },
    { icon: Building2, label: "Capital", value: country.capital?.join(", ") || "N/A" },
    { icon: Globe2, label: "Region", value: country.region },
    { icon: Landmark, label: "Subregion", value: country.subregion || "N/A" },
    { icon: Globe2, label: "Continents", value: country.continents?.join(", ") || "N/A" },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((item) => (
          <InfoCard key={item.label} {...item} />
        ))}
      </div>
      <div className="p-5 rounded-xl bg-card border border-border">
        <p className="text-sm text-muted-foreground">
          <span className="font-display font-bold text-foreground">Note:</span> Detailed government data including head of state, parliament structure, political parties, and democracy indices are planned for future updates with extended data sources.
        </p>
      </div>
    </div>
  );
}

function EconomyTab({ country, currencies }: any) {
  const items = [
    { icon: Banknote, label: "Currency", value: currencies.length > 0 ? currencies.map((c: any) => `${c.name} (${c.symbol})`).join(", ") : "N/A" },
    { icon: Users, label: "Population", value: formatPopulation(country.population) },
    { icon: Ruler, label: "Area", value: formatArea(country.area) },
    { icon: Users, label: "Population Density", value: country.area > 0 ? `${(country.population / country.area).toFixed(1)} per km²` : "N/A" },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {items.map((item) => (
          <InfoCard key={item.label} {...item} />
        ))}
      </div>
      <div className="p-5 rounded-xl bg-card border border-border">
        <p className="text-sm text-muted-foreground">
          <span className="font-display font-bold text-foreground">Coming Soon:</span> GDP, trade data, inflation rates, unemployment, major industries, stock exchanges, and credit ratings from World Bank & IMF sources.
        </p>
      </div>
    </div>
  );
}

function CultureTab({ country, languages }: any) {
  const items = [
    { icon: Languages, label: "Languages", value: languages.length > 0 ? languages.join(", ") : "N/A" },
    { icon: Car, label: "Driving Side", value: country.car?.side ? country.car.side.charAt(0).toUpperCase() + country.car.side.slice(1) : "N/A" },
    { icon: Calendar, label: "Start of Week", value: country.startOfWeek ? country.startOfWeek.charAt(0).toUpperCase() + country.startOfWeek.slice(1) : "N/A" },
    { icon: Flag, label: "Car Signs", value: country.car?.signs?.join(", ") || "N/A" },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {items.map((item) => (
          <InfoCard key={item.label} {...item} />
        ))}
      </div>
      <div className="p-5 rounded-xl bg-card border border-border">
        <p className="text-sm text-muted-foreground">
          <span className="font-display font-bold text-foreground">Coming Soon:</span> National symbols (anthem, motto, animal, bird, flower), traditional dress, national dish, sports, religion data, and more from extended cultural databases.
        </p>
      </div>
    </div>
  );
}
