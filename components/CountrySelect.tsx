'use client';

import React, { memo, useMemo, useCallback } from 'react';
import { Select, type SelectProps } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { Flag } from './Flag';
import type { CountrySelectProps } from '../types';
import type { Country } from '../data/countries';

const { Option, OptGroup } = Select;

/**
 * Renders a single country option with flag, name, and dial code
 */
const CountryOption: React.FC<{
  country: Country;
  useSVG?: boolean;
}> = memo(({ country, useSVG }) => (
  <div className="antd-country-phone-input-option">
    <Flag iso2={country.iso2} useSVG={useSVG} size={20} />
    <span className="antd-country-phone-input-option-name">{country.name}</span>
    <span className="antd-country-phone-input-option-code">+{country.dialCode}</span>
  </div>
));

CountryOption.displayName = 'CountryOption';

/**
 * Renders the selected country in the select trigger
 */
const CountryLabel: React.FC<{
  country: Country;
  useSVG?: boolean;
  showDialCode?: boolean;
}> = memo(({ country, useSVG, showDialCode = true }) => (
  <div className="antd-country-phone-input-label">
    <Flag iso2={country.iso2} useSVG={useSVG} size={20} />
    {showDialCode && (
      <span className="antd-country-phone-input-label-code">+{country.dialCode}</span>
    )}
  </div>
));

CountryLabel.displayName = 'CountryLabel';

/**
 * Country select dropdown component
 */
const CountrySelect: React.FC<CountrySelectProps> = memo(({
  value,
  onChange,
  countries,
  preferredCountries = [],
  enableSearch = true,
  searchPlaceholder = 'Search country...',
  searchNotFound = 'No country found',
  enableArrow = true,
  dropdownIcon,
  disabled = false,
  useSVG = true,
  size,
  dropdownRender,
  getPopupContainer,
  selectProps = {},
}) => {
  /**
   * Handle country selection change
   */
  const handleChange = useCallback(
    (iso2: string) => {
      const country = countries.find((c) => c.iso2 === iso2);
      if (country && onChange) {
        onChange(country);
      }
    },
    [countries, onChange]
  );

  /**
   * Custom filter for search
   */
  const filterOption = useCallback(
    (input: string, option: any): boolean => {
      if (!input) return true;
      
      const query = input.toLowerCase().replace(/^\+/, '');
      const country = countries.find((c) => c.iso2 === option?.value);
      
      if (!country) return false;
      
      const matchName = country.name.toLowerCase().includes(query);
      const matchIso2 = country.iso2.toLowerCase().includes(query);
      const matchDialCode = country.dialCode.includes(query);
      
      return matchName || matchIso2 || matchDialCode;
    },
    [countries]
  );

  /**
   * Render dropdown with preferred countries separator
   */
  const renderDropdown = useMemo(() => {
    if (dropdownRender) {
      return dropdownRender;
    }

    return undefined;
  }, [dropdownRender]);

  /**
   * Determine suffix icon
   */
  const suffixIcon = useMemo(() => {
    if (!enableArrow) return null;
    if (dropdownIcon) return dropdownIcon;
    return <DownOutlined className="antd-country-phone-input-arrow" />;
  }, [enableArrow, dropdownIcon]);

  /**
   * Build option list with preferred countries first
   */
  const optionsList = useMemo(() => {
    const preferredSet = new Set(preferredCountries.map((c) => c.iso2));
    const otherCountries = countries.filter((c) => !preferredSet.has(c.iso2));

    const options: React.ReactNode[] = [];

    // Add preferred countries
    if (preferredCountries.length > 0) {
      preferredCountries.forEach((country) => {
        options.push(
          <Option
            key={`preferred-${country.iso2}`}
            value={country.iso2}
            label={country.name}
          >
            <CountryOption country={country} useSVG={useSVG} />
          </Option>
        );
      });

      // Add separator
      options.push(
        <Option
          key="separator"
          value="__separator__"
          disabled
          className="antd-country-phone-input-separator"
        >
          <div className="antd-country-phone-input-separator-line" />
        </Option>
      );
    }

    // Add other countries
    otherCountries.forEach((country) => {
      options.push(
        <Option
          key={country.iso2}
          value={country.iso2}
          label={country.name}
        >
          <CountryOption country={country} useSVG={useSVG} />
        </Option>
      );
    });

    return options;
  }, [countries, preferredCountries, useSVG]);

  /**
   * Custom label render for selected value
   */
  const labelRender = useCallback(
    (props: { value?: string | number }) => {
      const selectedCountry = countries.find((c) => c.iso2 === props.value);
      if (!selectedCountry) return null;
      return <CountryLabel country={selectedCountry} useSVG={useSVG} />;
    },
    [countries, useSVG]
  );

  return (
    <Select
      {...selectProps}
      value={value?.iso2}
      onChange={handleChange}
      showSearch={enableSearch}
      filterOption={filterOption}
      disabled={disabled}
      size={size}
      suffixIcon={suffixIcon}
      dropdownRender={renderDropdown}
      getPopupContainer={getPopupContainer}
      placeholder="Select country"
      optionLabelProp="label"
      labelRender={labelRender}
      className={`antd-country-phone-input-select ${selectProps.className || ''}`.trim()}
      popupClassName={`antd-country-phone-input-dropdown ${selectProps.popupClassName || ''}`.trim()}
      notFoundContent={searchNotFound}
      searchValue={undefined}
      optionFilterProp="label"
      virtual
    >
      {optionsList}
    </Select>
  );
});

CountrySelect.displayName = 'CountrySelect';

export { CountrySelect, CountryOption, CountryLabel };
export default CountrySelect;
