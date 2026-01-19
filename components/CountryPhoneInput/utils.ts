/**
 * CountryPhoneInput - Utility Functions
 * Handles country filtering, phone formatting, and input protection
 */

import type { Country } from './countries';
import type { PhoneValue } from './types';
import {
  countries as allCountries,
  getCountryByIso2,
  getBestCountryForDialCode,
} from './countries';

// ─────────────────────────────────────────────────────────────
// Country Filtering Utilities
// ─────────────────────────────────────────────────────────────

export interface FilterOptions {
  preferredCountries?: string[];
  onlyCountries?: string[];
  excludeCountries?: string[];
  distinct?: boolean;
}

/**
 * Filter and sort countries based on configuration
 */
export function getFilteredCountries(options: FilterOptions): Country[] {
  let result = [...allCountries];
  const { preferredCountries, onlyCountries, excludeCountries, distinct } = options;

  // Apply onlyCountries filter
  if (onlyCountries && onlyCountries.length > 0) {
    const onlySet = new Set(onlyCountries.map((c) => c.toUpperCase()));
    result = result.filter((country) => onlySet.has(country.iso2.toUpperCase()));
  }

  // Apply excludeCountries filter
  if (excludeCountries && excludeCountries.length > 0) {
    const excludeSet = new Set(excludeCountries.map((c) => c.toUpperCase()));
    result = result.filter((country) => !excludeSet.has(country.iso2.toUpperCase()));
  }

  // Apply distinct dial codes filter
  if (distinct) {
    const seenDialCodes = new Set<string>();
    result = result.filter((country) => {
      if (seenDialCodes.has(country.dialCode)) {
        return false;
      }
      seenDialCodes.add(country.dialCode);
      return true;
    });
  }

  // Apply preferred countries (move to top)
  if (preferredCountries && preferredCountries.length > 0) {
    const preferredSet = new Set(preferredCountries.map((c) => c.toUpperCase()));
    const preferred: Country[] = [];
    const others: Country[] = [];

    result.forEach((country) => {
      if (preferredSet.has(country.iso2.toUpperCase())) {
        preferred.push(country);
      } else {
        others.push(country);
      }
    });

    // Sort preferred countries in the order specified
    preferred.sort((a, b) => {
      const aIndex = preferredCountries.findIndex(
        (c) => c.toUpperCase() === a.iso2.toUpperCase()
      );
      const bIndex = preferredCountries.findIndex(
        (c) => c.toUpperCase() === b.iso2.toUpperCase()
      );
      return aIndex - bIndex;
    });

    result = [...preferred, ...others];
  }

  return result;
}

/**
 * Search countries by name, ISO2 code, or dial code
 */
export function searchCountries(
  query: string,
  countryList: Country[]
): Country[] {
  if (!query.trim()) return countryList;

  const normalizedQuery = query.toLowerCase().replace(/^\+/, '').trim();

  return countryList.filter((country) => {
    const matchesName = country.name.toLowerCase().includes(normalizedQuery);
    const matchesIso2 = country.iso2.toLowerCase() === normalizedQuery;
    const matchesDialCode = country.dialCode.includes(normalizedQuery);

    return matchesName || matchesIso2 || matchesDialCode;
  });
}

// ─────────────────────────────────────────────────────────────
// Phone Number Length Validation
// ─────────────────────────────────────────────────────────────

/**
 * Get maximum phone number length (excluding dial code) for a country.
 * Calculates from the country format pattern.
 * Returns 0 if no format is defined (no limit).
 */
export function getMaxPhoneLength(country: Country): number {
  if (!country.format) return 0; // No limit if no format defined
  
  // Count dots in format after the dial code part
  // Format example: "+.. .. ... ...." means dial code takes first ".." 
  // and remaining ".. ... ...." are the phone digits
  const formatParts = country.format.split(' ');
  
  // First part is dial code pattern (e.g., "+..", "+...", "+....")
  // Rest are the national number parts
  const nationalParts = formatParts.slice(1).join(' ');
  
  // Count the dots (each dot represents a digit)
  const dotCount = (nationalParts.match(/\./g) || []).length;
  
  return dotCount;
}

/**
 * Country-specific phone length overrides for common countries.
 * Some countries have variable length numbers - use max common length.
 */
const PHONE_LENGTH_OVERRIDES: Record<string, number> = {
  // US/Canada: 10 digits (area code + 7 digit number)
  'US': 10,
  'CA': 10,
  // UK: variable 10-11, use 10 as max for mobile
  'GB': 10,
  // India: 10 digits
  'IN': 10,
  // Bangladesh: 10 digits (excluding leading 0)
  'BD': 10,
  // Germany: variable 10-11
  'DE': 11,
  // Australia: 9 digits (mobile)
  'AU': 9,
  // China: 11 digits (mobile)
  'CN': 11,
  // Japan: 10 digits
  'JP': 10,
  // France: 9 digits
  'FR': 9,
};

/**
 * Get the effective max phone length for a country.
 * Uses overrides first, then falls back to format calculation.
 */
export function getEffectiveMaxPhoneLength(country: Country): number {
  const override = PHONE_LENGTH_OVERRIDES[country.iso2.toUpperCase()];
  if (override) return override;
  
  return getMaxPhoneLength(country);
}

// ─────────────────────────────────────────────────────────────
// Country Resolution Utilities
// ─────────────────────────────────────────────────────────────

/**
 * Resolve the initial country based on props
 */
export function resolveInitialCountry(
  defaultCountry?: string,
  defaultCode?: string,
  defaultValue?: string,
  fallbackIso2: string = 'US'
): Country {
  // Priority 1: defaultCountry (ISO2)
  if (defaultCountry) {
    const country = getCountryByIso2(defaultCountry);
    if (country) return country;
  }

  // Priority 2: defaultCode (dial code)
  if (defaultCode) {
    const country = getBestCountryForDialCode(defaultCode);
    if (country) return country;
  }

  // Priority 3: Extract from defaultValue
  if (defaultValue) {
    const country = guessCountryFromPhone(defaultValue);
    if (country) return country;
  }

  // Fallback to US or first available
  return getCountryByIso2(fallbackIso2) || allCountries[0];
}

/**
 * Guess country from a phone number string
 */
export function guessCountryFromPhone(phone: string): Country | undefined {
  const cleaned = phone.replace(/[^\d+]/g, '');
  const digits = cleaned.replace(/^\+/, '');

  // Try matching dial codes from longest to shortest (max 4 digits)
  for (let len = Math.min(4, digits.length); len >= 1; len--) {
    const potentialCode = digits.slice(0, len);
    const country = getBestCountryForDialCode(potentialCode);
    if (country) return country;
  }

  return undefined;
}

// ─────────────────────────────────────────────────────────────
// Phone Number Formatting Utilities
// ─────────────────────────────────────────────────────────────

/**
 * Format dial code with + prefix
 */
export function formatDialCode(dialCode: string): string {
  const cleaned = dialCode.replace(/^\+/, '');
  return `+${cleaned}`;
}

/**
 * Get the protected prefix length (dial code + space)
 */
export function getProtectedPrefixLength(dialCode: string): number {
  return formatDialCode(dialCode).length + 1; // +1 for the space after dial code
}

/**
 * Build the initial input value from country and optional phone digits
 */
export function buildInputValue(country: Country, phoneDigits: string = ''): string {
  const dialCode = formatDialCode(country.dialCode);
  const cleanDigits = phoneDigits.replace(/\D/g, '');
  return cleanDigits ? `${dialCode} ${cleanDigits}` : `${dialCode} `;
}

/**
 * Extract phone digits from the full input value
 */
export function extractPhoneDigits(inputValue: string, dialCode: string): string {
  const prefix = formatDialCode(dialCode) + ' ';
  if (inputValue.startsWith(prefix)) {
    return inputValue.slice(prefix.length).replace(/\D/g, '');
  }
  // Fallback: remove dial code pattern and extract digits
  return inputValue.replace(formatDialCode(dialCode), '').replace(/\D/g, '');
}

/**
 * Format phone number based on country format pattern
 */
export function formatPhoneNumber(
  phoneDigits: string,
  country: Country,
  options: { disableParentheses?: boolean } = {}
): string {
  if (!phoneDigits) return '';
  if (!country.format) return phoneDigits;

  const { disableParentheses } = options;
  const countryFormat = country.format;

  // Remove the dial code part from format (everything up to first space after +...)
  const formatParts = countryFormat.split(' ');
  // First part is dial code pattern (e.g., "+..", "+..."), skip it
  const numberFormat = formatParts.slice(1).join(' '); // rest of the format

  if (!numberFormat) return phoneDigits;

  let result = '';
  let digitIndex = 0;

  for (const char of numberFormat) {
    if (digitIndex >= phoneDigits.length) break;

    if (char === '.') {
      result += phoneDigits[digitIndex];
      digitIndex++;
    } else if (char === '(' || char === ')') {
      if (!disableParentheses) {
        result += char;
      }
    } else {
      result += char;
    }
  }

  return result.trim();
}

/**
 * Parse phone number and extract dial code from input
 */
export function parsePhoneInput(
  inputValue: string,
  currentCountry: Country
): { dialCode: string; phoneDigits: string; detectedCountry: Country | null } {
  const cleaned = inputValue.replace(/[^\d+]/g, '');
  
  // Check if it starts with +
  if (cleaned.startsWith('+')) {
    const digits = cleaned.slice(1);
    
    // Try to detect country from dial code
    for (let len = Math.min(4, digits.length); len >= 1; len--) {
      const potentialCode = digits.slice(0, len);
      const country = getBestCountryForDialCode(potentialCode);
      if (country) {
        return {
          dialCode: country.dialCode,
          phoneDigits: digits.slice(len),
          detectedCountry: country,
        };
      }
    }
  }

  // Default to current country
  return {
    dialCode: currentCountry.dialCode,
    phoneDigits: cleaned.replace(/^\+/, ''),
    detectedCountry: null,
  };
}

// ─────────────────────────────────────────────────────────────
// Phone Value Builder
// ─────────────────────────────────────────────────────────────

/**
 * Build the PhoneValue object from current state
 */
export function buildPhoneValue(
  inputValue: string,
  country: Country | null
): PhoneValue {
  if (!country) {
    return {
      fullNumber: inputValue,
      phoneNumber: '',
      dialCode: '',
      rawDialCode: '',
      countryCode: '',
      country: null,
      isValid: false,
    };
  }

  const phoneDigits = extractPhoneDigits(inputValue, country.dialCode);
  const dialCode = formatDialCode(country.dialCode);
  const fullNumber = phoneDigits ? `${dialCode}${phoneDigits}` : dialCode;

  return {
    fullNumber,
    phoneNumber: phoneDigits,
    dialCode,
    rawDialCode: country.dialCode,
    countryCode: country.iso2,
    country,
    isValid: phoneDigits.length >= 4, // Basic validation
  };
}

// ─────────────────────────────────────────────────────────────
// Input Protection Utilities
// ─────────────────────────────────────────────────────────────

/**
 * Check if a keyboard event would modify the protected dial code
 */
export function isProtectedAction(
  event: React.KeyboardEvent<HTMLInputElement>,
  inputElement: HTMLInputElement,
  protectedLength: number
): boolean {
  const { key, ctrlKey, metaKey } = event;
  const { selectionStart, selectionEnd, value } = inputElement;

  // Allow navigation keys
  if (['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Home', 'End', 'Tab'].includes(key)) {
    return false;
  }

  // Allow copy
  if ((ctrlKey || metaKey) && key.toLowerCase() === 'c') {
    return false;
  }

  // Handle select all + delete/backspace
  if (selectionStart === 0 && selectionEnd === value.length) {
    if (key === 'Backspace' || key === 'Delete') {
      return true; // Block this
    }
    // If typing a character with full selection, allow but we'll handle in onChange
  }

  // Handle backspace at protected boundary
  if (key === 'Backspace') {
    if (selectionStart !== null && selectionStart <= protectedLength) {
      if (selectionStart === selectionEnd) {
        // Cursor at or before protected boundary, no selection
        return true;
      }
      // Has selection that includes protected area
      if (selectionStart < protectedLength) {
        return true;
      }
    }
  }

  // Handle delete at protected boundary
  if (key === 'Delete') {
    if (selectionStart !== null && selectionStart < protectedLength) {
      return true;
    }
  }

  // Handle cut that would affect protected area
  if ((ctrlKey || metaKey) && key.toLowerCase() === 'x') {
    if (selectionStart !== null && selectionStart < protectedLength) {
      return true;
    }
  }

  return false;
}

/**
 * Normalize the input value to ensure dial code is always present
 */
export function normalizeInputValue(
  value: string,
  country: Country,
  previousValue: string
): string {
  const expectedPrefix = formatDialCode(country.dialCode) + ' ';
  
  // If value starts with correct prefix, it's valid
  if (value.startsWith(expectedPrefix)) {
    return value;
  }

  // If value is empty or only whitespace, reset to just the prefix
  if (!value.trim()) {
    return expectedPrefix;
  }

  // Check if it starts with partial dial code
  if (value.startsWith('+')) {
    // Extract what should be the phone number part
    const withoutPlus = value.slice(1);
    const dialCodeDigits = country.dialCode;
    
    // If it still has the dial code
    if (withoutPlus.startsWith(dialCodeDigits)) {
      const rest = withoutPlus.slice(dialCodeDigits.length).replace(/^\s+/, '');
      return expectedPrefix + rest;
    }
  }

  // Last resort: extract only digits after the expected position and rebuild
  const previousDigits = extractPhoneDigits(previousValue, country.dialCode);
  
  // Try to salvage digits from new value
  const newDigits = value.replace(/\D/g, '');
  const dialCodeLen = country.dialCode.length;
  
  // If new value has dial code + more digits
  if (newDigits.startsWith(country.dialCode)) {
    return expectedPrefix + newDigits.slice(dialCodeLen);
  }

  // Fallback to previous or empty
  return expectedPrefix + previousDigits;
}

/**
 * Handle paste events to sanitize input
 */
export function sanitizePastedValue(
  pastedText: string,
  currentValue: string,
  selectionStart: number,
  selectionEnd: number,
  country: Country
): string {
  const protectedLength = getProtectedPrefixLength(country.dialCode);
  const expectedPrefix = formatDialCode(country.dialCode) + ' ';

  // Extract only digits from pasted content
  const pastedDigits = pastedText.replace(/\D/g, '');

  // If pasting into protected area, append to end instead
  if (selectionStart < protectedLength) {
    const currentDigits = extractPhoneDigits(currentValue, country.dialCode);
    return expectedPrefix + currentDigits + pastedDigits;
  }

  // Normal paste: insert at cursor position
  const beforeSelection = currentValue.slice(0, selectionStart);
  const afterSelection = currentValue.slice(selectionEnd);
  
  // Only paste digits
  return beforeSelection + pastedDigits + afterSelection;
}

// ─────────────────────────────────────────────────────────────
// Flag Utilities
// ─────────────────────────────────────────────────────────────

/**
 * Default flag CDN URL (flagcdn.com provides free SVG flags)
 */
export const DEFAULT_FLAG_CDN = 'https://flagcdn.com';

/**
 * Get flag URL for a country
 */
export function getFlagUrl(
  iso2: string,
  useSVG: boolean = true,
  customBaseUrl?: string
): string {
  const baseUrl = customBaseUrl || DEFAULT_FLAG_CDN;
  const code = iso2.toLowerCase();
  
  if (useSVG) {
    return `${baseUrl}/${code}.svg`;
  }
  
  // PNG fallback with reasonable size
  return `${baseUrl}/w40/${code}.png`;
}

/**
 * Get flag emoji for a country (fallback when images fail)
 */
export function getFlagEmoji(iso2: string): string {
  const codePoints = iso2
    .toUpperCase()
    .split('')
    .map((char) => 127397 + char.charCodeAt(0));
  return String.fromCodePoint(...codePoints);
}
