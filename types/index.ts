import type { InputProps, SelectProps } from 'antd';
import type { Country } from '../data/countries';
import type { ReactNode } from 'react';

/**
 * Phone value object returned by onChange
 */
export interface PhoneValue {
  /** Full phone number including country code (e.g., "+1234567890") */
  fullNumber: string;
  /** Phone number without country code (e.g., "234567890") */
  nationalNumber: string;
  /** Country dial code with + (e.g., "+1") */
  dialCode: string;
  /** Country ISO-2 code (e.g., "US") */
  countryCode: string;
  /** Country data object */
  country: Country | null;
  /** Whether the phone number appears valid (basic validation) */
  isValid: boolean;
  /** Raw input value */
  rawValue: string;
}

/**
 * Props specific to the CountryPhoneInput component
 */
export interface CountryPhoneInputProps {
  // ─────────────────────────────────────────────────────────────────────────
  // Value & Control
  // ─────────────────────────────────────────────────────────────────────────
  
  /** Controlled value - full phone number including country code */
  value?: string;
  
  /** Default value for uncontrolled mode */
  defaultValue?: string;
  
  /** Default country ISO-2 code (e.g., "US", "BD") */
  defaultCountry?: string;
  
  /** Default dial code without + (e.g., "1", "880") */
  defaultCode?: string;
  
  /** Callback fired when phone value changes */
  onChange?: (value: PhoneValue) => void;
  
  /** Callback fired when input receives focus */
  onFocus?: React.FocusEventHandler<HTMLInputElement>;
  
  /** Callback fired when input loses focus */
  onBlur?: React.FocusEventHandler<HTMLInputElement>;

  // ─────────────────────────────────────────────────────────────────────────
  // Country Filtering
  // ─────────────────────────────────────────────────────────────────────────
  
  /** Array of ISO-2 country codes to include exclusively */
  onlyCountries?: string[];
  
  /** Array of ISO-2 country codes to exclude */
  excludeCountries?: string[];
  
  /** Array of ISO-2 country codes to show at the top of the dropdown */
  preferredCountries?: string[];

  // ─────────────────────────────────────────────────────────────────────────
  // Search Configuration
  // ─────────────────────────────────────────────────────────────────────────
  
  /** Enable search in country dropdown */
  enableSearch?: boolean;
  
  /** Placeholder text for search input */
  searchPlaceholder?: string;
  
  /** Text shown when no countries match search */
  searchNotFound?: string;

  // ─────────────────────────────────────────────────────────────────────────
  // Dropdown Configuration
  // ─────────────────────────────────────────────────────────────────────────
  
  /** Show dropdown arrow */
  enableArrow?: boolean;
  
  /** Custom dropdown icon */
  dropdownIcon?: ReactNode;
  
  /** Disable the country dropdown */
  disableDropdown?: boolean;
  
  /** Custom dropdown renderer */
  dropdownRender?: SelectProps['dropdownRender'];
  
  /** Container for the dropdown popup */
  getPopupContainer?: (triggerNode: HTMLElement) => HTMLElement;

  // ─────────────────────────────────────────────────────────────────────────
  // Display Options
  // ─────────────────────────────────────────────────────────────────────────
  
  /** Use SVG flags instead of PNG */
  useSVG?: boolean;
  
  /** Show only unique countries (filter duplicates with same dial code) */
  distinct?: boolean;
  
  /** Disable parentheses in phone number formatting */
  disableParentheses?: boolean;
  
  /** Placeholder for the phone input */
  placeholder?: string;

  // ─────────────────────────────────────────────────────────────────────────
  // Styling
  // ─────────────────────────────────────────────────────────────────────────
  
  /** Additional CSS class for the container */
  className?: string;
  
  /** Inline styles for the container */
  style?: React.CSSProperties;
  
  /** Size of the input (inherits Ant Design sizing) */
  size?: InputProps['size'];
  
  /** Disabled state */
  disabled?: boolean;
  
  /** Read-only state */
  readOnly?: boolean;

  // ─────────────────────────────────────────────────────────────────────────
  // Pass-through Props
  // ─────────────────────────────────────────────────────────────────────────
  
  /** Additional props passed to the Input component */
  inputProps?: Omit<InputProps, 'value' | 'onChange' | 'onFocus' | 'onBlur' | 'disabled' | 'readOnly' | 'size' | 'placeholder'>;
  
  /** Additional props passed to the Select component */
  selectProps?: Omit<SelectProps, 'value' | 'onChange' | 'disabled' | 'size' | 'showSearch' | 'filterOption' | 'dropdownRender' | 'getPopupContainer' | 'suffixIcon' | 'showArrow'>;
}

/**
 * Props for the internal CountrySelect component
 */
export interface CountrySelectProps {
  /** Currently selected country */
  value?: Country;
  
  /** Callback when country changes */
  onChange?: (country: Country) => void;
  
  /** List of countries to display */
  countries: Country[];
  
  /** Preferred countries to show at top */
  preferredCountries?: Country[];
  
  /** Enable search functionality */
  enableSearch?: boolean;
  
  /** Search placeholder */
  searchPlaceholder?: string;
  
  /** Not found text */
  searchNotFound?: string;
  
  /** Show dropdown arrow */
  enableArrow?: boolean;
  
  /** Custom dropdown icon */
  dropdownIcon?: ReactNode;
  
  /** Disable the dropdown */
  disabled?: boolean;
  
  /** Use SVG flags */
  useSVG?: boolean;
  
  /** Size variant */
  size?: InputProps['size'];
  
  /** Custom dropdown renderer */
  dropdownRender?: SelectProps['dropdownRender'];
  
  /** Popup container */
  getPopupContainer?: (triggerNode: HTMLElement) => HTMLElement;
  
  /** Additional select props */
  selectProps?: SelectProps;
}

/**
 * Props for the internal PhoneInput component
 */
export interface PhoneInputProps {
  /** Current value including dial code */
  value: string;
  
  /** Selected country */
  country: Country | null;
  
  /** Callback when value changes */
  onChange: (value: string) => void;
  
  /** Focus event handler */
  onFocus?: React.FocusEventHandler<HTMLInputElement>;
  
  /** Blur event handler */
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  
  /** Placeholder text */
  placeholder?: string;
  
  /** Disabled state */
  disabled?: boolean;
  
  /** Read-only state */
  readOnly?: boolean;
  
  /** Size variant */
  size?: InputProps['size'];
  
  /** Disable parentheses in formatting */
  disableParentheses?: boolean;
  
  /** Additional input props */
  inputProps?: Partial<InputProps>;
}

/**
 * Ref type for CountryPhoneInput
 */
export interface CountryPhoneInputRef {
  /** Focus the phone input */
  focus: () => void;
  
  /** Blur the phone input */
  blur: () => void;
  
  /** Get current phone value */
  getValue: () => PhoneValue;
  
  /** Get current country */
  getCountry: () => Country | null;
  
  /** Set country by ISO-2 code */
  setCountry: (iso2: string) => void;
  
  /** Clear the input (keeps country code) */
  clear: () => void;
}

export type { Country };
