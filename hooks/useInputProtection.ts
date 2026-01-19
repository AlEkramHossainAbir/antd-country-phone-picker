import { useCallback, useRef } from 'react';
import { Country } from '../data/countries';
import { clamp } from '../utils/phone';

interface UseInputProtectionOptions {
  /** Current country */
  country: Country | null;
  /** Current input value */
  value: string;
  /** Callback to update value */
  onChange: (value: string) => void;
}

interface UseInputProtectionReturn {
  /** Handle keydown events */
  handleKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  /** Handle paste events */
  handlePaste: (e: React.ClipboardEvent<HTMLInputElement>) => void;
  /** Handle cut events */
  handleCut: (e: React.ClipboardEvent<HTMLInputElement>) => void;
  /** Handle selection change */
  handleSelect: (e: React.SyntheticEvent<HTMLInputElement>) => void;
  /** Handle before input (for mobile/IME) */
  handleBeforeInput: (e: React.FormEvent<HTMLInputElement>) => void;
  /** Get protected position after dial code */
  getProtectedPosition: () => number;
  /** Reference to set on input element */
  inputRef: React.RefObject<HTMLInputElement | null>;
}

/**
 * Hook to protect the dial code portion of phone input from deletion
 * 
 * Implements strict protection rules:
 * - Dial code cannot be deleted via Backspace
 * - Dial code cannot be deleted via Delete
 * - Dial code cannot be deleted via select-all + delete
 * - Dial code can ONLY be changed via country select dropdown
 */
export function useInputProtection(
  options: UseInputProtectionOptions
): UseInputProtectionReturn {
  const { country, value, onChange } = options;
  const inputRef = useRef<HTMLInputElement | null>(null);

  /**
   * Get the protected position (length of dial code including +)
   */
  const getProtectedPosition = useCallback((): number => {
    if (!country) return 0;
    // +dialCode = 1 + dialCode.length
    return 1 + country.dialCode.length;
  }, [country]);

  /**
   * Handle keydown events to protect dial code
   */
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      const input = e.currentTarget;
      const { selectionStart, selectionEnd } = input;
      const protectedPos = getProtectedPosition();

      // Handle Backspace
      if (e.key === 'Backspace') {
        // If cursor is at or before protected position, prevent
        if (selectionStart !== null && selectionStart <= protectedPos) {
          // If there's a selection that includes protected area, prevent
          if (selectionEnd !== null && selectionEnd > selectionStart) {
            // Check if selection includes protected area
            if (selectionStart < protectedPos) {
              e.preventDefault();
              // If selection extends beyond protected area, delete only unprotected part
              if (selectionEnd > protectedPos) {
                const newValue = value.slice(0, protectedPos) + value.slice(selectionEnd);
                onChange(newValue);
                // Set cursor to protected position
                requestAnimationFrame(() => {
                  input.setSelectionRange(protectedPos, protectedPos);
                });
              }
              return;
            }
          } else {
            // No selection, cursor at or before protected position
            e.preventDefault();
            return;
          }
        }
      }

      // Handle Delete
      if (e.key === 'Delete') {
        if (selectionStart !== null && selectionStart < protectedPos) {
          e.preventDefault();
          // If selection extends beyond protected area, delete only unprotected part
          if (selectionEnd !== null && selectionEnd > protectedPos) {
            const newValue = value.slice(0, protectedPos) + value.slice(selectionEnd);
            onChange(newValue);
            requestAnimationFrame(() => {
              input.setSelectionRange(protectedPos, protectedPos);
            });
          }
          return;
        }
      }

      // Handle Ctrl+A / Cmd+A (select all)
      // We don't prevent it, but we handle subsequent delete/backspace

      // Handle Home key - should move to protected position, not start
      if (e.key === 'Home') {
        e.preventDefault();
        const endPos = e.shiftKey ? selectionEnd ?? protectedPos : protectedPos;
        input.setSelectionRange(protectedPos, e.shiftKey ? endPos : protectedPos);
        return;
      }

      // Handle arrow left - don't go before protected position
      if (e.key === 'ArrowLeft' && !e.shiftKey) {
        if (selectionStart !== null && selectionStart <= protectedPos) {
          e.preventDefault();
          input.setSelectionRange(protectedPos, protectedPos);
          return;
        }
      }

      // Handle Shift+ArrowLeft for selection - limit to protected position
      if (e.key === 'ArrowLeft' && e.shiftKey) {
        if (selectionStart !== null && selectionStart <= protectedPos) {
          e.preventDefault();
          return;
        }
      }
    },
    [value, onChange, getProtectedPosition]
  );

  /**
   * Handle paste events
   */
  const handlePaste = useCallback(
    (e: React.ClipboardEvent<HTMLInputElement>) => {
      const input = e.currentTarget;
      const { selectionStart, selectionEnd } = input;
      const protectedPos = getProtectedPosition();
      
      const pastedText = e.clipboardData.getData('text');
      // Remove non-digit characters from pasted text (except for initial +)
      const cleanedPaste = pastedText.replace(/[^\d]/g, '');
      
      if (!cleanedPaste) {
        e.preventDefault();
        return;
      }

      // If selection includes protected area, paste after protected position
      if (selectionStart !== null && selectionStart < protectedPos) {
        e.preventDefault();
        const insertPos = protectedPos;
        const endPos = selectionEnd !== null && selectionEnd > protectedPos 
          ? selectionEnd 
          : protectedPos;
        
        const newValue = value.slice(0, insertPos) + cleanedPaste + value.slice(endPos);
        onChange(newValue);
        
        requestAnimationFrame(() => {
          const newCursorPos = insertPos + cleanedPaste.length;
          input.setSelectionRange(newCursorPos, newCursorPos);
        });
        return;
      }

      // Normal paste - let it proceed but ensure we only paste digits
      e.preventDefault();
      const start = selectionStart ?? value.length;
      const end = selectionEnd ?? start;
      const newValue = value.slice(0, start) + cleanedPaste + value.slice(end);
      onChange(newValue);
      
      requestAnimationFrame(() => {
        const newCursorPos = start + cleanedPaste.length;
        input.setSelectionRange(newCursorPos, newCursorPos);
      });
    },
    [value, onChange, getProtectedPosition]
  );

  /**
   * Handle cut events
   */
  const handleCut = useCallback(
    (e: React.ClipboardEvent<HTMLInputElement>) => {
      const input = e.currentTarget;
      const { selectionStart, selectionEnd } = input;
      const protectedPos = getProtectedPosition();

      if (selectionStart === null || selectionEnd === null) return;

      // If selection includes protected area
      if (selectionStart < protectedPos) {
        e.preventDefault();
        
        // Copy only the non-protected selected text
        const copyStart = Math.max(selectionStart, protectedPos);
        const textToCopy = value.slice(copyStart, selectionEnd);
        
        if (textToCopy) {
          e.clipboardData.setData('text/plain', textToCopy);
          
          // Remove only the non-protected part
          if (selectionEnd > protectedPos) {
            const newValue = value.slice(0, protectedPos) + value.slice(selectionEnd);
            onChange(newValue);
            requestAnimationFrame(() => {
              input.setSelectionRange(protectedPos, protectedPos);
            });
          }
        }
        return;
      }
    },
    [value, onChange, getProtectedPosition]
  );

  /**
   * Handle selection change - ensure selection doesn't start before protected position
   */
  const handleSelect = useCallback(
    (e: React.SyntheticEvent<HTMLInputElement>) => {
      // We don't actively prevent selection, but we handle it on action
    },
    []
  );

  /**
   * Handle beforeInput for mobile browsers and IME
   */
  const handleBeforeInput = useCallback(
    (e: React.FormEvent<HTMLInputElement>) => {
      const input = e.currentTarget;
      const { selectionStart, selectionEnd } = input;
      const protectedPos = getProtectedPosition();
      const inputEvent = e.nativeEvent as InputEvent;

      // Handle deleteContentBackward (Backspace on mobile)
      if (inputEvent.inputType === 'deleteContentBackward') {
        if (selectionStart !== null && selectionStart <= protectedPos) {
          e.preventDefault();
          return;
        }
      }

      // Handle deleteContentForward (Delete on mobile)
      if (inputEvent.inputType === 'deleteContentForward') {
        if (selectionStart !== null && selectionStart < protectedPos) {
          e.preventDefault();
          return;
        }
      }

      // Handle deleteByCut
      if (inputEvent.inputType === 'deleteByCut') {
        if (selectionStart !== null && selectionStart < protectedPos) {
          e.preventDefault();
          return;
        }
      }
    },
    [getProtectedPosition]
  );

  return {
    handleKeyDown,
    handlePaste,
    handleCut,
    handleSelect,
    handleBeforeInput,
    getProtectedPosition,
    inputRef,
  };
}

export default useInputProtection;
