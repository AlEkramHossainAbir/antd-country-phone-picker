'use client';

import React, {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react';
import { Space, type InputRef } from 'antd';
import { CountrySelect } from './CountrySelect';
import { PhoneInput } from './PhoneInput';
import { useCountries } from '../hooks/useCountries';
import {
  getCountryByIso2,
  getBestCountryForDialCode,
  guessCountryFromNumber,
  defaultCountry,
  type Country,
} from '../data/countries';
import { parsePhoneNumber, normalizePhoneValue } from '../utils/phone';
import type {
  CountryPhoneInputProps,
  CountryPhoneInputRef,
  PhoneValue,
} from '../types';

/**
 * Country Phone Input Component
 * 
 * A production-ready phone input component that combines:
 * - An Ant Design Select for country selection
 * - An Ant Design Input for phone number entry
 * 
 * Features:
 * - Protected dial code that cannot be deleted
 * - Full search support (name, ISO code, dial code)
 * - Preferred countries support
 * - Include/exclude country filtering
 * - SSR-safe for Next.js
 * - Fully controlled and uncontrolled modes
 */
const CountryPhoneInput = forwardRef<CountryPhoneInputRef, CountryPhoneInputProps>(
  (props, ref) => {
    const {
      // Value & Control
      value: controlledValue,
      defaultValue,
      defaultCountry: defaultCountryCode,
      defaultCode: defaultDialCode,
      onChange,
      onFocus,
      onBlur,

      // Country Filtering
      onlyCountries,
      excludeCountries,
      preferredCountries: preferredCountryCodes,

      // Search Configuration
      enableSearch = true,
      searchPlaceholder = 'Search country...',
      searchNotFound = 'No country found',

      // Dropdown Configuration
      enableArrow = true,
      dropdownIcon,
      disableDropdown = false,
      dropdownRender,
      getPopupContainer,

      // Display Options
      useSVG = true,
      distinct = false,
      disableParentheses = false,
      placeholder = 'Phone number',

      // Styling
      className = '',
      style,
      size = 'middle',
      disabled = false,
      readOnly = false,

      // Pass-through Props
      inputProps,
      selectProps,
    } = props;

    // Get filtered countries
    const { countries, preferred, getByIso2, getByDialCode } = useCountries({
      onlyCountries,
      excludeCountries,
      preferredCountries: preferredCountryCodes,
      distinct,
    });

    // Determine initial country
    const getInitialCountry = useCallback((): Country => {
      // Priority: defaultCountry > defaultCode > guess from value > first country
      if (defaultCountryCode) {
        const country = getByIso2(defaultCountryCode);
        if (country) return country;
      }

      if (defaultDialCode) {
        const country = getByDialCode(defaultDialCode);
        if (country) return country;
      }

      const initialValue = controlledValue ?? defaultValue ?? '';
      if (initialValue) {
        const guessed = guessCountryFromNumber(initialValue);
        if (guessed && countries.some((c) => c.iso2 === guessed.iso2)) {
          return guessed;
        }
      }

      // Default to first country in list or US
      return countries[0] ?? defaultCountry;
    }, [defaultCountryCode, defaultDialCode, controlledValue, defaultValue, getByIso2, getByDialCode, countries]);

    // State
    const [selectedCountry, setSelectedCountry] = useState<Country>(getInitialCountry);
    const [inputValue, setInputValue] = useState<string>(() => {
      const initial = controlledValue ?? defaultValue ?? '';
      if (initial) {
        return normalizePhoneValue(initial, getInitialCountry());
      }
      return `+${getInitialCountry().dialCode}`;
    });

    // Refs
    const phoneInputRef = useRef<InputRef>(null);
    const isControlled = controlledValue !== undefined;

    /**
     * Build phone value object
     */
    const buildPhoneValue = useCallback(
      (val: string, country: Country | null): PhoneValue => {
        return parsePhoneNumber(val, country);
      },
      []
    );

    /**
     * Handle country change from dropdown
     */
    const handleCountryChange = useCallback(
      (country: Country) => {
        setSelectedCountry(country);

        // Update input value with new dial code
        const currentDialCode = selectedCountry?.dialCode ?? '';
        const newDialCode = country.dialCode;
        
        let newValue: string;
        
        // Extract national number from current value
        const currentNational = inputValue
          .replace(new RegExp(`^\\+?${currentDialCode}`), '')
          .replace(/[^\d]/g, '');
        
        newValue = `+${newDialCode}${currentNational}`;
        
        setInputValue(newValue);

        // Fire onChange with new value
        const phoneValue = buildPhoneValue(newValue, country);
        onChange?.(phoneValue);
      },
      [selectedCountry, inputValue, buildPhoneValue, onChange]
    );

    /**
     * Handle phone input change
     */
    const handleInputChange = useCallback(
      (newValue: string) => {
        setInputValue(newValue);

        // Fire onChange
        const phoneValue = buildPhoneValue(newValue, selectedCountry);
        onChange?.(phoneValue);
      },
      [selectedCountry, buildPhoneValue, onChange]
    );

    /**
     * Sync with controlled value
     */
    useEffect(() => {
      if (isControlled && controlledValue !== undefined) {
        const normalized = normalizePhoneValue(controlledValue, selectedCountry);
        if (normalized !== inputValue) {
          setInputValue(normalized);

          // Also try to detect country from value if it changed
          const guessed = guessCountryFromNumber(controlledValue);
          if (guessed && guessed.iso2 !== selectedCountry?.iso2) {
            const inList = countries.some((c) => c.iso2 === guessed.iso2);
            if (inList) {
              setSelectedCountry(guessed);
            }
          }
        }
      }
    }, [controlledValue, isControlled, selectedCountry, countries, inputValue]);

    /**
     * Update input value when country changes (for uncontrolled mode)
     */
    useEffect(() => {
      if (!isControlled && selectedCountry) {
        // Ensure input starts with correct dial code
        const dialCode = `+${selectedCountry.dialCode}`;
        if (!inputValue.startsWith(dialCode)) {
          // Extract digits after any existing dial code
          const digits = inputValue.replace(/[^\d]/g, '');
          // Remove old dial code digits if present
          const nationalNumber = digits.slice(selectedCountry.dialCode.length);
          setInputValue(`${dialCode}${nationalNumber}`);
        }
      }
    }, [selectedCountry, isControlled, inputValue]);

    /**
     * Expose imperative methods
     */
    useImperativeHandle(
      ref,
      () => ({
        focus: () => {
          phoneInputRef.current?.focus();
        },
        blur: () => {
          phoneInputRef.current?.blur();
        },
        getValue: () => {
          return buildPhoneValue(inputValue, selectedCountry);
        },
        getCountry: () => {
          return selectedCountry;
        },
        setCountry: (iso2: string) => {
          const country = getByIso2(iso2);
          if (country) {
            handleCountryChange(country);
          }
        },
        clear: () => {
          const dialCode = `+${selectedCountry.dialCode}`;
          setInputValue(dialCode);
          onChange?.(buildPhoneValue(dialCode, selectedCountry));
        },
      }),
      [inputValue, selectedCountry, buildPhoneValue, getByIso2, handleCountryChange, onChange]
    );

    /**
     * Memoized class name
     */
    const containerClassName = useMemo(
      () =>
        [
          'antd-country-phone-input',
          disabled ? 'antd-country-phone-input-disabled' : '',
          readOnly ? 'antd-country-phone-input-readonly' : '',
          `antd-country-phone-input-${size}`,
          className,
        ]
          .filter(Boolean)
          .join(' '),
      [disabled, readOnly, size, className]
    );

    return (
      <Space.Compact
        className={containerClassName}
        style={style}
        block
      >
        <CountrySelect
          value={selectedCountry}
          onChange={handleCountryChange}
          countries={countries}
          preferredCountries={preferred}
          enableSearch={enableSearch}
          searchPlaceholder={searchPlaceholder}
          searchNotFound={searchNotFound}
          enableArrow={enableArrow}
          dropdownIcon={dropdownIcon}
          disabled={disabled || disableDropdown}
          useSVG={useSVG}
          size={size}
          dropdownRender={dropdownRender}
          getPopupContainer={getPopupContainer}
          selectProps={selectProps}
        />
        <PhoneInput
          ref={phoneInputRef}
          value={inputValue}
          country={selectedCountry}
          onChange={handleInputChange}
          onFocus={onFocus}
          onBlur={onBlur}
          placeholder={placeholder}
          disabled={disabled}
          readOnly={readOnly}
          size={size}
          disableParentheses={disableParentheses}
          inputProps={inputProps}
        />
      </Space.Compact>
    );
  }
);

CountryPhoneInput.displayName = 'CountryPhoneInput';

export { CountryPhoneInput };
export default CountryPhoneInput;
