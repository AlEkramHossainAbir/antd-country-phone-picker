/**
 * CountryPhoneInput - Package Entry Point
 * 
 * A production-ready phone input component for Ant Design.
 * Designed to be extracted as an npm package.
 * 
 * @example
 * ```tsx
 * import { CountryPhoneInput } from 'antd-country-phone-picker';
 * 
 * function App() {
 *   return (
 *     <CountryPhoneInput
 *       defaultCountry="US"
 *       preferredCountries={['US', 'GB', 'CA']}
 *       onChange={(value) => console.log(value)}
 *     />
 *   );
 * }
 * ```
 * 
 * @packageDocumentation
 */

// Main component
export { default as CountryPhoneInput } from './CountryPhoneInput';
export { default } from './CountryPhoneInput';

// Types
export type {
  CountryPhoneInputProps,
  CountryPhoneInputRef,
  PhoneValue,
  SelectPassthroughProps,
  InputPassthroughProps,
  PhoneInputState,
} from './types';

// Country type and data
export type { Country } from './countries';
export {
  countries,
  getCountryByIso2,
  getCountriesByDialCode,
  getBestCountryForDialCode,
  searchCountries as searchCountriesData,
  defaultCountry,
} from './countries';

// Utilities (for advanced usage)
export {
  getFilteredCountries,
  searchCountries,
  resolveInitialCountry,
  guessCountryFromPhone,
  formatDialCode,
  extractPhoneDigits,
  buildInputValue,
  buildPhoneValue,
  getFlagUrl,
  getFlagEmoji,
  getProtectedPrefixLength,
  getMaxPhoneLength,
  getEffectiveMaxPhoneLength,
  DEFAULT_FLAG_CDN,
} from './utils';

// Hook (for custom implementations)
export { usePhoneInput } from './usePhoneInput';
