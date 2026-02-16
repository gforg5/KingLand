export interface Country {
  name: {
    common: string;
    official: string;
  };
  cca2: string;
  cca3: string;
  capital?: string[];
  region: string;
  subregion?: string;
  population: number;
  area: number;
  flags: {
    png: string;
    svg: string;
    alt?: string;
  };
  languages?: Record<string, string>;
  currencies?: Record<string, { name: string; symbol: string }>;
  timezones?: string[];
  continents?: string[];
  borders?: string[];
  latlng?: number[];
  maps?: {
    googleMaps: string;
    openStreetMaps: string;
  };
  independent?: boolean;
  unMember?: boolean;
  landlocked?: boolean;
  coatOfArms?: {
    png?: string;
    svg?: string;
  };
  startOfWeek?: string;
  car?: {
    signs?: string[];
    side?: string;
  };
}

const BASE_URL = "https://restcountries.com/v3.1";

// Max 10 fields per request
const LIST_FIELDS = "name,cca2,cca3,capital,region,population,flags,currencies,continents,area";

export async function fetchAllCountries(): Promise<Country[]> {
  const res = await fetch(`${BASE_URL}/all?fields=${LIST_FIELDS}`);
  if (!res.ok) throw new Error("Failed to fetch countries");
  return res.json();
}

export async function fetchCountryByCode(code: string): Promise<Country> {
  // Two parallel requests for all data (10 fields each)
  const fields1 = "name,cca2,cca3,capital,region,subregion,population,area,flags,languages";
  const fields2 = "currencies,timezones,continents,borders,maps,independent,unMember,landlocked,coatOfArms,car";

  const [res1, res2] = await Promise.all([
    fetch(`${BASE_URL}/alpha/${code}?fields=${fields1}`),
    fetch(`${BASE_URL}/alpha/${code}?fields=${fields2}`),
  ]);

  if (!res1.ok || !res2.ok) throw new Error("Failed to fetch country");

  const [data1, data2] = await Promise.all([res1.json(), res2.json()]);
  const d1 = Array.isArray(data1) ? data1[0] : data1;
  const d2 = Array.isArray(data2) ? data2[0] : data2;

  return { ...d1, ...d2 };
}

export async function fetchCountriesByCodes(codes: string[]): Promise<Country[]> {
  if (codes.length === 0) return [];
  const res = await fetch(`${BASE_URL}/alpha?codes=${codes.join(",")}&fields=${LIST_FIELDS}`);
  if (!res.ok) return [];
  return res.json();
}

export const CONTINENTS = [
  "All",
  "Africa",
  "Asia",
  "Europe",
  "North America",
  "South America",
  "Oceania",
  "Antarctica",
] as const;

export function formatPopulation(pop: number): string {
  if (pop >= 1_000_000_000) return `${(pop / 1_000_000_000).toFixed(1)}B`;
  if (pop >= 1_000_000) return `${(pop / 1_000_000).toFixed(1)}M`;
  if (pop >= 1_000) return `${(pop / 1_000).toFixed(1)}K`;
  return pop.toString();
}

export function formatArea(area: number): string {
  return area.toLocaleString() + " km²";
}
