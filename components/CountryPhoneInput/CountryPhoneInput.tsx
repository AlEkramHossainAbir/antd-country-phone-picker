'use client';

/**
 * CountryPhoneInput - Main Component
 * A production-ready phone input component for Ant Design
 * 
 * Features:
 * - Country selection with searchable dropdown
 * - Protected dial code that cannot be deleted
 * - Full Ant Design integration
 * - Controlled and uncontrolled modes
 * - SSR-safe
 * 
 * @example
 * ```tsx
 * <CountryPhoneInput
 *   defaultCountry="US"
 *   onChange={(value) => console.log(value)}
 *   preferredCountries={['US', 'GB', 'CA']}
 * />
 * ```
 */

import React, {
  forwardRef,
  useImperativeHandle,
  useMemo,
  useCallback,
  useRef,
  useState,
} from 'react';
import { Select, Input, Space } from 'antd';
import type { InputRef } from 'antd';
import { DownOutlined } from '@ant-design/icons';

import type { Country } from './countries';
import type {
  CountryPhoneInputProps,
  CountryPhoneInputRef,
} from './types';
import { usePhoneInput } from './usePhoneInput';
import {
  getFlagUrl,
  getFlagEmoji,
} from './utils';

import styles from './CountryPhoneInput.module.css';

/**
 * Flag component with fallback to emoji
 * Uses standard img element for npm package compatibility (not Next.js Image)
 */
const CountryFlag: React.FC<{
  iso2: string;
  useSVG?: boolean;
  flagUrl?: string;
  size?: number;
}> = React.memo(({ iso2, useSVG = true, flagUrl, size = 20 }) => {
  const [error, setError] = React.useState(false);

  if (error) {
    return (
      <span className={styles.flagEmoji} style={{ fontSize: size }}>
        {getFlagEmoji(iso2)}
      </span>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={getFlagUrl(iso2, useSVG, flagUrl)}
      alt={`${iso2} flag`}
      className={styles.flagImage}
      style={{ width: size, height: Math.round(size * 0.75) }}
      onError={() => setError(true)}
      loading="lazy"
    />
  );
});

CountryFlag.displayName = 'CountryFlag';

/**
 * Country option renderer
 */
const CountryOption: React.FC<{
  country: Country;
  useSVG?: boolean;
  flagUrl?: string;
}> = React.memo(({ country, useSVG, flagUrl }) => {
  return (
    <div className={styles.countryOption}>
      <CountryFlag iso2={country.iso2} useSVG={useSVG} flagUrl={flagUrl} />
      <span className={styles.countryName}>{country.name}</span>
      <span className={styles.dialCode}>+{country.dialCode}</span>
    </div>
  );
});

CountryOption.displayName = 'CountryOption';

/**
 * Selected country display (in the Select trigger)
 */
const SelectedCountry: React.FC<{
  country: Country;
  useSVG?: boolean;
  flagUrl?: string;
}> = React.memo(({ country, useSVG, flagUrl }) => {
  return (
    <div className={styles.selectedCountry}>
      <CountryFlag iso2={country.iso2} useSVG={useSVG} flagUrl={flagUrl} size={18} />
    </div>
  );
});

SelectedCountry.displayName = 'SelectedCountry';

/**
 * CountryPhoneInput Component
 * 
 * A composite phone input with country selection that integrates
 * seamlessly with Ant Design forms and components.
 */
const CountryPhoneInput = forwardRef<CountryPhoneInputRef, CountryPhoneInputProps>(
  (props, ref) => {
    const {
      // Value props
      value,
      defaultValue,
      defaultCountry,
      defaultCode,
      onChange,
      onCountryChange,

      // Country filtering
      preferredCountries,
      onlyCountries,
      excludeCountries,
      distinct,

      // Dropdown config
      enableSearch = true,
      searchIcon,
      searchPlaceholder = 'Search country',
      searchNotFound = 'No country found',
      enableArrow = true,
      dropdownIcon,
      disableDropdown = false,
      popupRender,
      getPopupContainer,

      // Display config
      useSVG = true,
      flagUrl,

      // Passthrough props
      selectProps,
      inputProps,

      // Styling
      className,
      selectClassName,
      inputClassName,
      style,
      size = 'middle',
      disabled = false,
      readOnly = false,
      placeholder = 'Phone number',
      variant = 'outlined',
      status,
    } = props;

    // Use the custom hook for state management
    const {
      state,
      filteredCountries,
      handleCountryChange,
      handleInputChange,
      handleKeyDown,
      handlePaste,
      handleSelect,
      handleFocus,
      handleClick,
      focus,
      blur,
      clear,
      setCountry,
      getPhoneValue,
    } = usePhoneInput({
      value,
      defaultValue,
      defaultCountry,
      defaultCode,
      preferredCountries,
      onlyCountries,
      excludeCountries,
      distinct,
      onChange,
      onCountryChange,
      disabled,
      readOnly,
    });

    // Expose imperative methods
    useImperativeHandle(
      ref,
      () => ({
        focus,
        blur,
        getValue: getPhoneValue,
        setCountry,
        clear,
        getInputElement: () => antdInputRef.current?.input ?? null,
      }),
      [focus, blur, getPhoneValue, setCountry, clear]
    );

    // Ref for Ant Design Input component
    const antdInputRef = useRef<InputRef>(null);

    // Search state for dropdown
    const [searchQuery, setSearchQuery] = useState('');

    // Filter countries based on search query
    const displayedCountries = useMemo(() => {
      if (!searchQuery.trim()) return filteredCountries;
      
      const query = searchQuery.toLowerCase().replace(/^\+/, '');
      return filteredCountries.filter((country) => {
        return (
          country.name.toLowerCase().includes(query) ||
          country.iso2.toLowerCase().includes(query) ||
          country.dialCode.includes(query)
        );
      });
    }, [filteredCountries, searchQuery]);

    // Build Select options
    const selectOptions = useMemo(() => {
      return displayedCountries.map((country) => ({
        value: country.iso2,
        label: (
          <CountryOption country={country} useSVG={useSVG} flagUrl={flagUrl} />
        ),
      }));
    }, [displayedCountries, useSVG, flagUrl]);

    // Handle Select change
    const onSelectChange = useCallback(
      (iso2: string) => {
        handleCountryChange(iso2);
        setSearchQuery(''); // Clear search on selection
      },
      [handleCountryChange]
    );

    // Custom dropdown render with search field
    const customDropdownRender = useCallback(
      (menu: React.ReactElement) => (
        <>
          {enableSearch && (
            <div style={{ padding: '8px' }}>
              <Input
                placeholder={searchPlaceholder}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                prefix={searchIcon || (
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{ opacity: 0.45 }}
                  >
                    <circle cx="11" cy="11" r="8" />
                    <path d="m21 21-4.35-4.35" />
                  </svg>
                )}
                style={{ marginBottom: '8px' }}
                allowClear
              />
            </div>
          )}
          {displayedCountries.length === 0 ? (
            <div style={{ padding: '8px 12px', color: '#999', textAlign: 'center' }}>
              {searchNotFound}
            </div>
          ) : (
            menu
          )}
        </>
      ),
      [enableSearch, searchPlaceholder, searchQuery, searchIcon, displayedCountries.length, searchNotFound]
    );

    // Dropdown suffix icon
    const suffixIcon = useMemo(() => {
      if (!enableArrow) return null;
      if (dropdownIcon) return dropdownIcon;
      return <DownOutlined className={styles.arrowIcon} />;
    }, [enableArrow, dropdownIcon]);

    // Get size class
    const sizeClass = useMemo(() => {
      switch (size) {
        case 'small':
          return styles.sizeSmall;
        case 'large':
          return styles.sizeLarge;
        default:
          return styles.sizeMiddle;
      }
    }, [size]);

    // Wrapper class
    const wrapperClassName = useMemo(() => {
      return [
        styles.wrapper,
        sizeClass,
        disabled && styles.disabled,
        readOnly && styles.readOnly,
        status === 'error' && styles.error,
        status === 'warning' && styles.warning,
        className,
      ]
        .filter(Boolean)
        .join(' ');
    }, [sizeClass, disabled, readOnly, status, className]);

    return (
      <div className={wrapperClassName} style={style}>
        <Space.Compact block className={styles.inputGroup}>
          {/* Country Select */}
          <Select
            {...selectProps}
            className={`${styles.countrySelect} ${selectClassName || ''}`}
            value={state.country.iso2}
            onChange={onSelectChange}
            options={selectOptions}
            showSearch={false}
            optionLabelProp="label"
            suffixIcon={suffixIcon}
            disabled={disabled || disableDropdown}
            size={size}
            variant={variant}
            status={status}
            popupRender={popupRender || customDropdownRender}
            getPopupContainer={getPopupContainer}
            popupMatchSelectWidth={280}
            labelRender={() => (
              <SelectedCountry
                country={state.country}
                useSVG={useSVG}
                flagUrl={flagUrl}
              />
            )}
          />

          {/* Phone Input */}
          <Input
            {...inputProps}
            ref={antdInputRef}
            className={`${styles.phoneInput} ${inputClassName || ''}`}
            value={state.inputValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            onPaste={handlePaste}
            onSelect={handleSelect}
            onFocus={handleFocus}
            onClick={handleClick}
            placeholder={placeholder}
            disabled={disabled}
            readOnly={readOnly}
            size={size}
            variant={variant}
            status={status}
          />
        </Space.Compact>
      </div>
    );
  }
);

CountryPhoneInput.displayName = 'CountryPhoneInput';

export default CountryPhoneInput;
