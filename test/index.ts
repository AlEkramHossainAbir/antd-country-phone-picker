// Main component export
export { CountryPhoneInput } from './components/CountryPhoneInput';
export { default } from './components/CountryPhoneInput';

// Sub-components
export { CountrySelect, CountryOption, CountryLabel } from './components/CountrySelect';
export { PhoneInput } from './components/PhoneInput';
export { Flag } from './components/Flag';

// Types
export type {
  CountryPhoneInputProps,
  CountryPhoneInputRef,
  CountrySelectProps,
  PhoneInputProps,
  PhoneValue,
  Country,
} from './types';

// Data utilities
export {
  countries,
  countryByIso2,
  countriesByDialCode,
  getCountryByIso2,
  getCountriesByDialCode,
  getBestCountryForDialCode,
  searchCountries,
  isValidDialCode,
  guessCountryFromNumber,
  defaultCountry,
} from './data/countries';

// Hooks
export { useCountries } from './hooks/useCountries';
export { useInputProtection } from './hooks/useInputProtection';

// Utilities
export {
  formatPhoneNumber,
  parsePhoneNumber,
  normalizePhoneValue,
  getMinCursorPosition,
  isDialCodeSelected,
  getDigitsOnly,
  isSameCountry,
} from './utils/phone';
