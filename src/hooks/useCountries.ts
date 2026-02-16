import { useQuery } from "@tanstack/react-query";
import { fetchAllCountries, fetchCountryByCode, fetchCountriesByCodes, type Country } from "@/lib/api";

export function useAllCountries() {
  return useQuery<Country[]>({
    queryKey: ["countries"],
    queryFn: fetchAllCountries,
    staleTime: 1000 * 60 * 60, // 1 hour
  });
}

export function useCountry(code: string) {
  return useQuery<Country>({
    queryKey: ["country", code],
    queryFn: () => fetchCountryByCode(code),
    enabled: !!code,
  });
}

export function useBorderCountries(codes?: string[]) {
  return useQuery<Country[]>({
    queryKey: ["borders", codes],
    queryFn: () => fetchCountriesByCodes(codes || []),
    enabled: !!codes && codes.length > 0,
  });
}
