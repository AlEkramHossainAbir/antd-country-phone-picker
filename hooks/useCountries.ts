import { useMemo, useCallback } from 'react';
import {
  countries as allCountries,
  Country,
  getCountryByIso2,
  getBestCountryForDialCode,
} from '../data/countries';

interface UseCountriesOptions {
  /** Only include these countries (ISO-2 codes) */
  onlyCountries?: string[];
  /** Exclude these countries (ISO-2 codes) */
  excludeCountries?: string[];
  /** Preferred countries to show at top (ISO-2 codes) */
  preferredCountries?: string[];
  /** Show only unique dial codes (first match wins) */
  distinct?: boolean;
}

interface UseCountriesReturn {
  /** Filtered list of countries */
  countries: Country[];
  /** Preferred countries list */
  preferred: Country[];
  /** Get country by ISO-2 code */
  getByIso2: (iso2: string) => Country | undefined;
  /** Get country by dial code */
  getByDialCode: (dialCode: string) => Country | undefined;
  /** Search countries by query */
  search: (query: string) => Country[];
}

/**
 * Hook to manage country list with filtering options
 */
export function useCountries(options: UseCountriesOptions = {}): UseCountriesReturn {
  const {
    onlyCountries,
    excludeCountries,
    preferredCountries,
    distinct,
  } = options;

  const countries = useMemo(() => {
    let result = [...allCountries];

    // Apply "only" filter
    if (onlyCountries && onlyCountries.length > 0) {
      const onlySet = new Set(onlyCountries.map((c) => c.toUpperCase()));
      result = result.filter((c) => onlySet.has(c.iso2.toUpperCase()));
    }

    // Apply "exclude" filter
    if (excludeCountries && excludeCountries.length > 0) {
      const excludeSet = new Set(excludeCountries.map((c) => c.toUpperCase()));
      result = result.filter((c) => !excludeSet.has(c.iso2.toUpperCase()));
    }

    // Apply "distinct" filter - keep only first country for each dial code
    if (distinct) {
      const seenDialCodes = new Set<string>();
      result = result.filter((c) => {
        if (seenDialCodes.has(c.dialCode)) {
          return false;
        }
        seenDialCodes.add(c.dialCode);
        return true;
      });
    }

    return result;
  }, [onlyCountries, excludeCountries, distinct]);

  const preferred = useMemo(() => {
    if (!preferredCountries || preferredCountries.length === 0) {
      return [];
    }

    const preferredList: Country[] = [];
    const preferredSet = new Set(preferredCountries.map((c) => c.toUpperCase()));

    for (const code of preferredCountries) {
      const country = countries.find(
        (c) => c.iso2.toUpperCase() === code.toUpperCase()
      );
      if (country) {
        preferredList.push(country);
      }
    }

    return preferredList;
  }, [preferredCountries, countries]);

  const getByIso2 = useCallback(
    (iso2: string): Country | undefined => {
      const upper = iso2.toUpperCase();
      return countries.find((c) => c.iso2.toUpperCase() === upper);
    },
    [countries]
  );

  const getByDialCode = useCallback(
    (dialCode: string): Country | undefined => {
      const code = dialCode.replace(/^\+/, '');
      // First try to find in our filtered list
      const match = countries.find((c) => c.dialCode === code);
      if (match) return match;
      // Fall back to global lookup
      return getBestCountryForDialCode(code);
    },
    [countries]
  );

  const search = useCallback(
    (query: string): Country[] => {
      const q = query.toLowerCase().replace(/^\+/, '').trim();
      if (!q) return countries;

      return countries.filter((c) => {
        const matchName = c.name.toLowerCase().includes(q);
        const matchIso2 = c.iso2.toLowerCase().includes(q);
        const matchDialCode = c.dialCode.includes(q);
        return matchName || matchIso2 || matchDialCode;
      });
    },
    [countries]
  );

  return {
    countries,
    preferred,
    getByIso2,
    getByDialCode,
    search,
  };
}

export default useCountries;
