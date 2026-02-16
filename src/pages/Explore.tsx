import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { useAllCountries } from "@/hooks/useCountries";
import CountryCard from "@/components/CountryCard";
import SearchBar from "@/components/SearchBar";
import ContinentFilter from "@/components/ContinentFilter";

export default function Explore() {
  const { data: countries, isLoading } = useAllCountries();
  const [search, setSearch] = useState("");
  const [continent, setContinent] = useState("All");
  const [sortBy, setSortBy] = useState<"name" | "population">("name");

  const filtered = useMemo(() => {
    if (!countries) return [];
    let result = [...countries];

    if (continent !== "All") {
      result = result.filter((c) => c.continents.includes(continent));
    }

    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (c) =>
          c.name.common.toLowerCase().includes(q) ||
          c.name.official.toLowerCase().includes(q) ||
          c.capital?.some((cap) => cap.toLowerCase().includes(q)) ||
          c.cca2.toLowerCase() === q ||
          c.cca3.toLowerCase() === q
      );
    }

    result.sort((a, b) =>
      sortBy === "population"
        ? b.population - a.population
        : a.name.common.localeCompare(b.name.common)
    );

    return result;
  }, [countries, search, continent, sortBy]);

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10"
        >
          <h1 className="font-display text-3xl sm:text-4xl font-bold mb-2">
            Explore Countries
          </h1>
          <p className="text-muted-foreground">
            Browse, search, and discover every nation on Earth
          </p>
        </motion.div>

        {/* Controls */}
        <div className="space-y-4 mb-8">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
            <SearchBar value={search} onChange={setSearch} />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as "name" | "population")}
              className="h-12 px-4 rounded-xl bg-card border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-emerald/50"
            >
              <option value="name">Sort by Name</option>
              <option value="population">Sort by Population</option>
            </select>
          </div>
          <ContinentFilter selected={continent} onChange={setContinent} />
        </div>

        {/* Results count */}
        <p className="text-sm text-muted-foreground mb-6">
          {isLoading ? "Loading…" : `${filtered.length} countries found`}
        </p>

        {/* Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className="rounded-xl bg-card border border-border animate-pulse h-72" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map((country, i) => (
              <CountryCard key={country.cca3} country={country} index={i} />
            ))}
          </div>
        )}

        {!isLoading && filtered.length === 0 && (
          <div className="text-center py-20">
            <p className="text-xl font-display font-semibold mb-2">No countries found</p>
            <p className="text-muted-foreground">Try adjusting your search or filters</p>
          </div>
        )}
      </div>
    </div>
  );
}
