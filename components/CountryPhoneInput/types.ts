/**
 * CountryPhoneInput - Type Definitions
 * Production-ready phone input component for Ant Design
 */

import type { InputProps } from 'antd';
import type { SelectProps } from 'antd';
import type { ReactNode } from 'react';
import type { Country } from './countries';

/**
 * Structured phone value returned by the component
 */
export interface PhoneValue {
  /** Full phone number including dial code (e.g., "+1234567890") */
  fullNumber: string;
  /** Phone number without dial code (e.g., "234567890") */
  phoneNumber: string;
  /** Country dial code with + (e.g., "+1") */
  dialCode: string;
  /** Country dial code without + (e.g., "1") */
  rawDialCode: string;
  /** ISO2 country code (e.g., "US") */
  countryCode: string;
  /** Country data object */
  country: Country | null;
  /** Whether the phone number is valid (basic validation) */
  isValid: boolean;
}

/**
 * Props passed through to Ant Design Select
 * Excludes props that are managed internally
 */
export type SelectPassthroughProps = Omit<
  SelectProps,
  | 'value'
  | 'onChange'
  | 'options'
  | 'showSearch'
  | 'filterOption'
  | 'optionLabelProp'
  | 'optionFilterProp'
  | 'popupRender'
  | 'suffixIcon'
  | 'getPopupContainer'
  | 'notFoundContent'
  | 'placeholder'
>;

/**
 * Props passed through to Ant Design Input
 * Excludes props that are managed internally
 */
export type InputPassthroughProps = Omit<
  InputProps,
  | 'value'
  | 'onChange'
  | 'onKeyDown'
  | 'onPaste'
  | 'onSelect'
  | 'addonBefore'
  | 'prefix'
>;

/**
 * Main component props
 */
export interface CountryPhoneInputProps {
  // ─────────────────────────────────────────────────────────────
  // Value & Control Props
  // ─────────────────────────────────────────────────────────────
  
  /** Controlled value - full phone number with dial code */
  value?: string;
  
  /** Default value for uncontrolled mode */
  defaultValue?: string;
  
  /** Default country by ISO2 code (e.g., "US", "BD") */
  defaultCountry?: string;
  
  /** Default country by dial code (e.g., "1", "880") */
  defaultCode?: string;
  
  /** Callback when phone value changes */
  onChange?: (value: PhoneValue) => void;
  
  /** Callback when country changes */
  onCountryChange?: (country: Country) => void;
  
  // ─────────────────────────────────────────────────────────────
  // Country Filtering Props
  // ─────────────────────────────────────────────────────────────
  
  /** ISO2 codes of countries to show at the top of the list */
  preferredCountries?: string[];
  
  /** ISO2 codes of countries to include exclusively */
  onlyCountries?: string[];
  
  /** ISO2 codes of countries to exclude */
  excludeCountries?: string[];
  
  /** Show only distinct dial codes (one country per dial code) */
  distinct?: boolean;
  
  // ─────────────────────────────────────────────────────────────
  // Dropdown Configuration Props
  // ─────────────────────────────────────────────────────────────
  
  /** Enable search in dropdown */
  enableSearch?: boolean;
  
  /** Custom search icon (appears on left side of search input) */
  searchIcon?: ReactNode;
  
  /** Placeholder for search input */
  searchPlaceholder?: string;
  
  /** Content shown when search has no results */
  searchNotFound?: ReactNode;
  
  /** Show dropdown arrow */
  enableArrow?: boolean;
  
  /** Custom dropdown arrow icon */
  dropdownIcon?: ReactNode;
  
  /** Completely disable the dropdown */
  disableDropdown?: boolean;
  
  /** Custom dropdown render function */
  popupRender?: SelectProps['popupRender'];
  
  /** Container for dropdown portal (same as AntD Select) */
  getPopupContainer?: (triggerNode: HTMLElement) => HTMLElement;
  
  // ─────────────────────────────────────────────────────────────
  // Display Configuration Props
  // ─────────────────────────────────────────────────────────────
  
  /** Use SVG flags (true) or emoji/PNG fallback (false) */
  useSVG?: boolean;
  
  /** Base URL for flag images when useSVG is true */
  flagUrl?: string;
  
  /** Disable parentheses in formatted phone number */
  disableParentheses?: boolean;
  
  /** Show country code in the input as prefix */
  showDialCode?: boolean;
  
  /** Format the phone number as user types */
  formatOnType?: boolean;
  
  // ─────────────────────────────────────────────────────────────
  // Passthrough Props
  // ─────────────────────────────────────────────────────────────
  
  /** Props passed to Ant Design Select */
  selectProps?: SelectPassthroughProps;
  
  /** Props passed to Ant Design Input */
  inputProps?: InputPassthroughProps;
  
  // ─────────────────────────────────────────────────────────────
  // Styling Props
  // ─────────────────────────────────────────────────────────────
  
  /** Additional class name for the wrapper */
  className?: string;
  
  /** Additional class name for the select */
  selectClassName?: string;
  
  /** Additional class name for the input */
  inputClassName?: string;
  
  /** Inline styles for the wrapper */
  style?: React.CSSProperties;
  
  /** Size of the input (matches AntD sizes) */
  size?: 'small' | 'middle' | 'large';
  
  /** Disabled state */
  disabled?: boolean;
  
  /** Read-only state */
  readOnly?: boolean;
  
  /** Placeholder for the phone input */
  placeholder?: string;
  
  /** Border style variant */
  variant?: 'outlined' | 'borderless' | 'filled';
  
  /** Show error/warning status */
  status?: 'error' | 'warning';
}

/**
 * Ref handle for imperative operations
 */
export interface CountryPhoneInputRef {
  /** Focus the phone input field */
  focus: () => void;
  /** Blur the phone input field */
  blur: () => void;
  /** Get the current phone value */
  getValue: () => PhoneValue;
  /** Set the country programmatically */
  setCountry: (iso2: string) => void;
  /** Clear the phone number (keeps dial code) */
  clear: () => void;
  /** Get the input element */
  getInputElement: () => HTMLInputElement | null;
}

/**
 * Internal state for the component
 */
export interface PhoneInputState {
  /** Currently selected country */
  country: Country;
  /** Current input value (includes dial code) */
  inputValue: string;
  /** Cursor position to restore after updates */
  cursorPosition: number | null;
}
