import { Country } from '../data/countries';
import { PhoneValue } from '../types';

/**
 * Format phone number according to country format pattern
 */
export function formatPhoneNumber(
  phone: string,
  country: Country | null,
  disableParentheses?: boolean
): string {
  if (!phone) return '';
  
  // Remove all non-digit characters except +
  let digits = phone.replace(/[^\d+]/g, '');
  
  // Ensure it starts with +
  if (!digits.startsWith('+') && country) {
    digits = `+${country.dialCode}${digits}`;
  }
  
  if (!country?.format) {
    return digits;
  }
  
  let format = country.format;
  
  // Replace parentheses if disabled
  if (disableParentheses) {
    format = format.replace(/[()]/g, '');
  }
  
  let result = '';
  let digitIndex = 0;
  const cleanDigits = digits.replace(/^\+/, '');
  
  for (let i = 0; i < format.length && digitIndex < cleanDigits.length; i++) {
    const formatChar = format[i];
    
    if (formatChar === '.') {
      result += cleanDigits[digitIndex];
      digitIndex++;
    } else if (formatChar === '+') {
      result += '+';
    } else {
      result += formatChar;
    }
  }
  
  // If we have more digits than the format allows, append them
  if (digitIndex < cleanDigits.length) {
    result += cleanDigits.slice(digitIndex);
  }
  
  return result;
}

/**
 * Parse phone number string into components
 */
export function parsePhoneNumber(
  value: string,
  country: Country | null
): PhoneValue {
  // Remove all non-digit characters except +
  const cleaned = value.replace(/[^\d+]/g, '');
  const dialCode = country ? `+${country.dialCode}` : '';
  
  let nationalNumber = '';
  let fullNumber = cleaned;
  
  if (country && cleaned.startsWith(`+${country.dialCode}`)) {
    nationalNumber = cleaned.slice(country.dialCode.length + 1);
  } else if (country && cleaned.startsWith(country.dialCode)) {
    nationalNumber = cleaned.slice(country.dialCode.length);
    fullNumber = `+${cleaned}`;
  } else {
    nationalNumber = cleaned.replace(/^\+/, '');
  }
  
  // Basic validation: check if national number has reasonable length
  const isValid = nationalNumber.length >= 4 && nationalNumber.length <= 15;
  
  return {
    fullNumber,
    nationalNumber,
    dialCode,
    countryCode: country?.iso2 || '',
    country,
    isValid,
    rawValue: value,
  };
}

/**
 * Normalize phone input value to ensure dial code is present
 */
export function normalizePhoneValue(
  value: string,
  country: Country | null
): string {
  if (!country) return value;
  
  const dialCode = `+${country.dialCode}`;
  const cleaned = value.replace(/[^\d+]/g, '');
  
  // If value doesn't start with dial code, prepend it
  if (!cleaned.startsWith(dialCode) && !cleaned.startsWith(country.dialCode)) {
    // Remove any existing + and dial code attempt
    const withoutPlus = cleaned.replace(/^\+/, '');
    return `${dialCode}${withoutPlus}`;
  }
  
  // Ensure + prefix
  if (!cleaned.startsWith('+')) {
    return `+${cleaned}`;
  }
  
  return cleaned;
}

/**
 * Get the minimum cursor position (after dial code)
 */
export function getMinCursorPosition(
  value: string,
  country: Country | null
): number {
  if (!country) return 0;
  
  const dialCode = `+${country.dialCode}`;
  
  // Find the position right after the dial code in the formatted value
  const dialCodeLength = dialCode.length;
  
  // Account for any formatting characters after dial code
  let pos = 0;
  let digitCount = 0;
  
  for (let i = 0; i < value.length; i++) {
    if (/\d/.test(value[i]) || value[i] === '+') {
      digitCount++;
    }
    if (digitCount === dialCodeLength + 1) {
      pos = i;
      break;
    }
    pos = i + 1;
  }
  
  return Math.min(pos, dialCodeLength);
}

/**
 * Check if a selection range includes the protected dial code
 */
export function isDialCodeSelected(
  selectionStart: number,
  selectionEnd: number,
  dialCodeLength: number
): boolean {
  return selectionStart < dialCodeLength || selectionEnd < dialCodeLength;
}

/**
 * Get digits only from a string
 */
export function getDigitsOnly(value: string): string {
  return value.replace(/\D/g, '');
}

/**
 * Check if two countries are the same
 */
export function isSameCountry(a: Country | null, b: Country | null): boolean {
  if (!a || !b) return a === b;
  return a.iso2 === b.iso2;
}

/**
 * Detect if we're in a browser environment
 */
export function isBrowser(): boolean {
  return typeof window !== 'undefined' && typeof document !== 'undefined';
}

/**
 * Generate a unique ID for component instances
 */
export function generateId(prefix: string = 'phone-input'): string {
  return `${prefix}-${Math.random().toString(36).slice(2, 11)}`;
}

/**
 * Clamp a number between min and max
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}
