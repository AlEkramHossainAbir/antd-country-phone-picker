'use client';

import React, {
  memo,
  useCallback,
  useRef,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from 'react';
import { Input, type InputRef } from 'antd';
import { useInputProtection } from '../hooks/useInputProtection';
import type { PhoneInputProps } from '../types';
import type { Country } from '../data/countries';

/**
 * Phone input component with protected dial code
 * 
 * The dial code portion of the input is protected from deletion.
 * Users can only edit the phone number digits after the dial code.
 */
const PhoneInput = forwardRef<InputRef, PhoneInputProps>(({
  value,
  country,
  onChange,
  onFocus,
  onBlur,
  placeholder = 'Phone number',
  disabled = false,
  readOnly = false,
  size,
  disableParentheses = false,
  inputProps = {},
}, ref) => {
  const internalRef = useRef<InputRef>(null);
  
  // Expose ref methods
  useImperativeHandle(ref, () => internalRef.current!, []);

  // Get input protection handlers
  const {
    handleKeyDown,
    handlePaste,
    handleCut,
    handleSelect,
    handleBeforeInput,
    getProtectedPosition,
  } = useInputProtection({
    country,
    value,
    onChange,
  });

  /**
   * Handle input change
   * Only allow digits after the dial code
   */
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;
      const protectedPos = getProtectedPosition();
      
      // Get the dial code prefix
      const dialCode = country ? `+${country.dialCode}` : '';
      
      // Ensure the value starts with the dial code
      if (!newValue.startsWith(dialCode)) {
        // If someone somehow removed the dial code, restore it
        const afterDialCode = newValue.replace(/[^\d]/g, '');
        onChange(`${dialCode}${afterDialCode}`);
        return;
      }
      
      // Remove non-digits from the part after dial code
      const beforeDialCode = newValue.slice(0, dialCode.length);
      const afterDialCode = newValue.slice(dialCode.length).replace(/[^\d]/g, '');
      
      onChange(`${beforeDialCode}${afterDialCode}`);
    },
    [country, onChange, getProtectedPosition]
  );

  /**
   * Handle focus - ensure cursor is after dial code
   */
  const handleFocus = useCallback(
    (e: React.FocusEvent<HTMLInputElement>) => {
      const input = e.target;
      const protectedPos = getProtectedPosition();
      
      // If cursor would be in protected area, move it after
      requestAnimationFrame(() => {
        const { selectionStart } = input;
        if (selectionStart !== null && selectionStart < protectedPos) {
          input.setSelectionRange(protectedPos, protectedPos);
        }
      });
      
      onFocus?.(e);
    },
    [getProtectedPosition, onFocus]
  );

  /**
   * Handle click - prevent cursor from entering protected area
   */
  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLInputElement>) => {
      const input = e.currentTarget;
      const protectedPos = getProtectedPosition();
      
      requestAnimationFrame(() => {
        const { selectionStart, selectionEnd } = input;
        
        if (selectionStart !== null && selectionStart < protectedPos) {
          if (selectionEnd !== null && selectionEnd > protectedPos) {
            // Selection spans protected and unprotected areas
            // Adjust to start after protected area
            input.setSelectionRange(protectedPos, selectionEnd);
          } else {
            // Cursor is in protected area
            input.setSelectionRange(protectedPos, protectedPos);
          }
        }
      });
    },
    [getProtectedPosition]
  );

  /**
   * Handle mouse up for selection adjustment
   */
  const handleMouseUp = useCallback(
    (e: React.MouseEvent<HTMLInputElement>) => {
      const input = e.currentTarget;
      const protectedPos = getProtectedPosition();
      
      requestAnimationFrame(() => {
        const { selectionStart, selectionEnd } = input;
        
        if (selectionStart !== null && selectionStart < protectedPos) {
          if (selectionEnd !== null && selectionEnd > protectedPos) {
            input.setSelectionRange(protectedPos, selectionEnd);
          } else {
            input.setSelectionRange(protectedPos, protectedPos);
          }
        }
      });
    },
    [getProtectedPosition]
  );

  /**
   * Ensure cursor position is valid after value changes
   */
  useEffect(() => {
    const input = internalRef.current?.input;
    if (!input || !country) return;
    
    const protectedPos = getProtectedPosition();
    const { selectionStart } = input;
    
    if (selectionStart !== null && selectionStart < protectedPos) {
      input.setSelectionRange(protectedPos, protectedPos);
    }
  }, [value, country, getProtectedPosition]);

  return (
    <Input
      {...inputProps}
      ref={internalRef}
      value={value}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
      onPaste={handlePaste}
      onCut={handleCut}
      onSelect={handleSelect}
      onBeforeInput={handleBeforeInput}
      onFocus={handleFocus}
      onBlur={onBlur}
      onClick={handleClick}
      onMouseUp={handleMouseUp}
      placeholder={placeholder}
      disabled={disabled}
      readOnly={readOnly}
      size={size}
      type="tel"
      inputMode="tel"
      autoComplete="tel"
      className={`antd-country-phone-input-input ${inputProps.className || ''}`.trim()}
    />
  );
});

PhoneInput.displayName = 'PhoneInput';

export { PhoneInput };
export default PhoneInput;
