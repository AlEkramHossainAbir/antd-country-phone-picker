# antd-country-phone-picker

A production-ready, fully-typed phone input component for **Ant Design v5+**. Designed to feel like a native Ant Design component while solving common UX problems found in other phone input libraries.

[![npm version](https://img.shields.io/npm/v/antd-country-phone-picker.svg)](https://www.npmjs.com/package/antd-country-phone-picker)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue.svg)](https://www.typescriptlang.org/)
[![Ant Design](https://img.shields.io/badge/Ant%20Design-v5+-1890ff.svg)](https://ant.design/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

---

## ✨ Features

- 🎯 **Protected Dial Code** – Users cannot accidentally delete or modify the country code
- 🔍 **Searchable Country Dropdown** – Search by name, ISO code, or dial code
- 📏 **Automatic Length Validation** – Enforces maximum phone length per country
- 🎨 **Native Ant Design Feel** – Matches AntD styling, theming, and behavior
- 📦 **Lightweight** – No heavy dependencies like libphonenumber
- 🌐 **240+ Countries** – Comprehensive country data with flags
- 💪 **Fully Typed** – Complete TypeScript support with strict mode
- 🔄 **Controlled & Uncontrolled** – Works both ways
- ♿ **Accessible** – Keyboard navigation and screen reader friendly
- 🌙 **Dark Mode Ready** – Automatic dark theme support
- 📱 **SSR Safe** – Works with Next.js, Vite, CRA, and other SSR frameworks
- 📝 **Browser Autofill Support** – Automatically detects and parses autofilled phone numbers
- 🔗 **Unified Visual Design** – Seamless merged input appearance
- 🎛️ **Controlled Dropdown** – Programmatically control dropdown visibility with `open` prop

---

## 📦 Installation

```bash
# npm
npm install antd-country-phone-picker

# yarn
yarn add antd-country-phone-picker

# pnpm
pnpm add antd-country-phone-picker
```

### Peer Dependencies

Ensure you have these installed:

```json
{
  "react": ">=18.0.0",
  "react-dom": ">=18.0.0",
  "antd": ">=5.0.0"
}
```

**Important:** You must import Ant Design's CSS in your project. The component's internal styles are automatically included.

```tsx
// In your main entry file (e.g., App.tsx or index.tsx)
import 'antd/dist/reset.css'; // Ant Design v5
```

---

## 🚀 Quick Start

### Basic Usage

```tsx
import { CountryPhoneInput } from 'antd-country-phone-picker';

function App() {
  return (
    <CountryPhoneInput
      defaultCountry="US"
      onChange={(value) => console.log(value)}
    />
  );
}
```

### With Ant Design Form

```tsx
import { Form, Button } from 'antd';
import { CountryPhoneInput } from 'antd-country-phone-picker';

function PhoneForm() {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log('Phone:', values.phone);
    // values.phone contains the PhoneValue object
  };

  return (
    <Form form={form} onFinish={onFinish}>
      <Form.Item
        name="phone"
        label="Phone Number"
        rules={[
          {
            validator: (_, value) => {
              if (!value?.isValid) {
                return Promise.reject('Please enter a valid phone number');
              }
              return Promise.resolve();
            },
          },
        ]}
      >
        <CountryPhoneInput defaultCountry="US" />
      </Form.Item>
      
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
}
```

---

## 📖 Usage Patterns

### Controlled Mode

Use when you need to maintain the phone value in your own state:

```tsx
import { useState } from 'react';
import { CountryPhoneInput, PhoneValue } from 'antd-country-phone-picker';

function ControlledExample() {
  const [phone, setPhone] = useState<string>('+1');

  const handleChange = (value: PhoneValue) => {
    setPhone(value.fullNumber);
    console.log('Full number:', value.fullNumber);
    console.log('Phone only:', value.phoneNumber);
    console.log('Is valid:', value.isValid);
  };

  return (
    <div>
      <CountryPhoneInput value={phone} onChange={handleChange} />
      <p>Current value: {phone}</p>
    </div>
  );
}
```

### Uncontrolled Mode with Ref

Use when you want to access the value only when needed (e.g., on submit):

```tsx
import { useRef } from 'react';
import { CountryPhoneInput, CountryPhoneInputRef } from 'antd-country-phone-picker';

function UncontrolledExample() {
  const phoneRef = useRef<CountryPhoneInputRef>(null);

  const handleSubmit = () => {
    const value = phoneRef.current?.getValue();
    
    if (value?.isValid) {
      console.log('Submit phone:', value.fullNumber);
    } else {
      alert('Please enter a valid phone number');
    }
  };

  return (
    <>
      <CountryPhoneInput ref={phoneRef} defaultCountry="US" />
      <button onClick={handleSubmit}>Get Value</button>
    </>
  );
}
```

### With Preferred Countries

Show specific countries at the top of the dropdown:

```tsx
<CountryPhoneInput
  defaultCountry="US"
  preferredCountries={['US', 'GB', 'CA', 'AU']}
/>
```

### Restrict to Specific Countries

Only allow selection from certain countries:

```tsx
<CountryPhoneInput
  onlyCountries={['US', 'CA', 'MX']}
  defaultCountry="US"
/>
```

### Exclude Countries

Remove specific countries from the list:

```tsx
<CountryPhoneInput
  excludeCountries={['KP', 'IR']}
  defaultCountry="US"
/>
```

### Custom Styling

```tsx
<CountryPhoneInput
  className="my-phone-input"
  selectClassName="my-select"
  inputClassName="my-input"
  style={{ maxWidth: 400 }}
  size="large"
  variant="filled"
  grouped={true}
/>
```

---

## 📋 Complete Props Reference

### Value & Control Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `string` | `undefined` | **Controlled value** – Full phone number with dial code (e.g., `"+12025551234"`). When provided, component operates in controlled mode. |
| `defaultValue` | `string` | `undefined` | **Default value** for uncontrolled mode. Sets initial phone number. |
| `defaultCountry` | `string` | `'US'` | Default country by ISO2 code (e.g., `"US"`, `"GB"`, `"BD"`). Used when no value/defaultValue is provided. |
| `defaultCode` | `string` | `undefined` | Alternative to `defaultCountry` – set default country by dial code (e.g., `"1"`, `"44"`). |
| `onChange` | `(value: PhoneValue) => void` | `undefined` | **Callback** fired when phone value changes. Receives a `PhoneValue` object with full phone data. |
| `onCountryChange` | `(country: Country) => void` | `undefined` | **Callback** fired when country selection changes. Receives the full `Country` object. |

### Country Filtering Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `preferredCountries` | `string[]` | `undefined` | ISO2 codes to show at the **top** of the dropdown list (e.g., `['US', 'GB', 'CA']`). Useful for commonly used countries. |
| `onlyCountries` | `string[]` | `undefined` | **Restrict** dropdown to only these ISO2 codes. All other countries are hidden. |
| `excludeCountries` | `string[]` | `undefined` | **Remove** these ISO2 codes from the dropdown. |
| `distinct` | `boolean` | `false` | Show only **one country per dial code**. Useful to reduce list size when shared dial codes exist (e.g., US/CA both use `+1`). |

### Dropdown Configuration Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `enableSearch` | `boolean` | `true` | Enable the **search field** inside the dropdown. Users can search by country name, ISO code, or dial code. |
| `searchIcon` | `ReactNode` | Built-in search icon | Custom icon element shown in the search field (e.g., `<SearchOutlined />`). |
| `searchPlaceholder` | `string` | `'Search country'` | Placeholder text for the search input. |
| `searchNotFound` | `ReactNode` | `'No country found'` | Content displayed when search returns no results. Can be a string or custom React element. |
| `enableArrow` | `boolean` | `true` | Show the **dropdown arrow** icon next to the flag. |
| `dropdownIcon` | `ReactNode` | `<DownOutlined />` | Custom dropdown arrow icon element. |
| `disableDropdown` | `boolean` | `false` | **Completely disable** the country dropdown. Phone input remains functional but country cannot be changed. |
| `popupRender` | `SelectProps['popupRender']` | Built-in render | Custom render function for the dropdown menu. Receives the default menu as a parameter. |
| `getPopupContainer` | `(triggerNode: HTMLElement) => HTMLElement` | `undefined` | **Container** element for the dropdown portal. Essential for modals/scrollable containers. Default behavior attaches to document body. |
| `open` | `boolean` | `undefined` | **Controlled dropdown visibility**. When set, takes control of dropdown open/close state. |
| `onOpenChange` | `(open: boolean) => void` | `undefined` | Callback when dropdown visibility changes. Use with `open` for controlled mode. |
| `popupMatchSelectWidth` | `boolean \| number` | `280` | Whether the dropdown width matches the select width. Set `true` to match, `false` for auto-width, or a specific number (in pixels). |
| `popupClassName` | `string` | `undefined` | Custom CSS class name for the dropdown popup container. |

### Display Configuration Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `useSVG` | `boolean` | `true` | Use **SVG flags**. If `false`, falls back to PNG/emoji flags. SVG provides better quality and smaller size. |
| `flagUrl` | `string` | `undefined` | **Custom CDN URL** for flag images. Overrides default flag source. Must include trailing path structure. |
| `grouped` | `boolean` | `false` | **Visual grouping mode**. When `true`, the select and input fields appear unified by removing the border between them for a seamless look. |

### Grouped Visual Mode

Control the visual appearance of the input group:

```tsx
// Default (non-grouped) - separate select and input with visible border
<CountryPhoneInput defaultCountry="US" />

// Grouped mode - unified appearance with no border between select and input
<CountryPhoneInput defaultCountry="US" grouped={true} />
```

**When to use:**
- `grouped={false}` (default): Clear separation between country selector and phone input
- `grouped={true}`: Seamless, unified appearance for a more compact design

### Styling Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `className` | `string` | `undefined` | Additional CSS class for the **wrapper** element. |
| `selectClassName` | `string` | `undefined` | Additional CSS class for the **country select** dropdown. |
| `inputClassName` | `string` | `undefined` | Additional CSS class for the **phone input** field. |
| `style` | `CSSProperties` | `undefined` | Inline styles applied to the wrapper element. |
| `size` | `'small'` \| `'middle'` \| `'large'` | `'middle'` | Component size matching Ant Design sizes. Affects both select and input. |
| `variant` | `'outlined'` \| `'borderless'` \| `'filled'` | `'outlined'` | Border style variant (Ant Design v5+ feature). |
| `status` | `'error'` \| `'warning'` | `undefined` | Validation status. Shows error/warning styling. |
| `disabled` | `boolean` | `false` | Disable both country select and phone input. |
| `readOnly` | `boolean` | `false` | Make the input read-only. User can view but not edit. |
| `placeholder` | `string` | `'Phone number'` | Placeholder text for the phone input field. |

### Passthrough Props

| Prop | Type | Description |
|------|------|-------------|
| `selectProps` | `SelectPassthroughProps` | Additional props passed directly to Ant Design's `Select` component. Excludes internally managed props like `value`, `onChange`, `options`. |
| `inputProps` | `InputPassthroughProps` | Additional props passed directly to Ant Design's `Input` component. Excludes internally managed props like `value`, `onChange`, `onKeyDown`. |

---

## 📤 Phone Value Format

The `onChange` callback receives a comprehensive `PhoneValue` object:

```typescript
interface PhoneValue {
  /** Full phone number including dial code (e.g., "+12025551234") */
  fullNumber: string;
  
  /** Phone number WITHOUT dial code (e.g., "2025551234") */
  phoneNumber: string;
  
  /** Country dial code WITH + symbol (e.g., "+1") */
  dialCode: string;
  
  /** Country dial code WITHOUT + symbol (e.g., "1") */
  rawDialCode: string;
  
  /** ISO2 country code (e.g., "US") */
  countryCode: string;
  
  /** Full country data object */
  country: Country | null;
  
  /** Basic validation – true if phone has minimum length */
  isValid: boolean;
}
```

### Example Output

When a user enters a US phone number:

```javascript
{
  fullNumber: "+12025551234",
  phoneNumber: "2025551234",
  dialCode: "+1",
  rawDialCode: "1",
  countryCode: "US",
  country: {
    name: "United States",
    iso2: "US",
    dialCode: "1",
    format: "+. (...) ...-....",
    priority: 0,
    areaCodes: null
  },
  isValid: true  // true because US requires 10 digits and we have 10
}
```

### Validation Behavior

The `isValid` property performs **basic validation**:

- ✅ `true` when phone number meets the country's minimum length requirements
- ❌ `false` when phone number is too short or empty

**Note:** This is NOT a comprehensive carrier-level validation. For production systems requiring strict validation, integrate a library like `libphonenumber-js` or a backend validation service.

---

## 🛡️ Input Protection Rules

The dial code is **protected** and cannot be removed or modified by the user. This prevents common UX issues found in other phone input libraries.

### What's Protected

- **Backspace at dial code boundary** → Prevented. Cursor cannot move into dial code area.
- **Delete key in dial code area** → Prevented. Dial code characters cannot be deleted.
- **Select All + Delete** → Only phone digits are cleared. Dial code remains intact.
- **Paste over dial code** → Pasted content is appended to phone digits, not replacing dial code.
- **Cut dial code** → Prevented. Cannot cut or copy the dial code portion.

### How the Dial Code Changes

The dial code **only** changes when:

1. **User selects a different country** from the dropdown
2. **Programmatic call** to `setCountry()` via ref

### User Experience

This protection creates a **predictable, error-free experience**:

- Users always know their country code is correct
- No accidental deletion of dial codes
- Prevents invalid submissions due to malformed numbers
- Works intuitively with keyboard navigation

---

## 📏 Phone Length Validation

Phone number length is **automatically enforced** based on the selected country:

### How It Works

1. Each country has a defined format pattern (e.g., US: `+. (...) ...-....` = 10 digits)
2. Maximum digits are calculated from this pattern
3. The input **blocks** additional digits at the input level
4. When country changes, excess digits are automatically trimmed

### Example Behavior

```tsx
// User types in US number (max 10 digits)
+1 2025551234  ✅ Allowed (10 digits)
+1 20255512345 ❌ Blocked (11th digit prevented)

// User switches to UK (max varies)
+44 2071234567 ✅ Allowed (10 digits)
```

### Paste Behavior

When pasting a phone number:

- Only digits up to the maximum length are accepted
- Extra digits are discarded
- Dial code is preserved

---

## 🔧 Ant Design Integration

### getPopupContainer Usage

When using the component inside modals, drawers, or scrollable containers, you need to properly configure the dropdown container:

```tsx
import { Modal } from 'antd';

<Modal open={isOpen}>
  <CountryPhoneInput
    getPopupContainer={(trigger) => trigger.parentElement || document.body}
  />
</Modal>
```

**Why?** By default, Ant Design dropdowns attach to `document.body`. In modals or scrollable areas, this can cause positioning issues. The `getPopupContainer` prop tells the dropdown where to render.

### Controlled Dropdown Visibility

Use the `open` prop to programmatically control when the dropdown is open or closed:

```tsx
import { useState } from 'react';

function ControlledDropdownExample() {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <div>
      <button onClick={() => setDropdownOpen(true)}>Open Dropdown</button>
      <button onClick={() => setDropdownOpen(false)}>Close Dropdown</button>
      
      <CountryPhoneInput
        defaultCountry="US"
        open={dropdownOpen}
        onOpenChange={setDropdownOpen}
      />
    </div>
  );
}
```

### Popup Width Configuration

Control the dropdown width with `popupMatchSelectWidth`:

```tsx
// Dropdown width matches select trigger width
<CountryPhoneInput popupMatchSelectWidth={true} />

// Fixed width dropdown (280px is default)
<CountryPhoneInput popupMatchSelectWidth={280} />

// Auto-width based on content
<CountryPhoneInput popupMatchSelectWidth={false} />
```

### Select and Input Prop Passthrough

The component exposes two passthrough props for advanced customization:

#### selectProps

Pass additional props to the underlying Ant Design `Select` component:

```tsx
<CountryPhoneInput
  selectProps={{
    dropdownStyle: { maxHeight: 300 },
    showArrow: false,
    loading: false,
  }}
/>
```

**Note:** Internal props like `value`, `onChange`, `options` are managed by the component and cannot be overridden.

#### inputProps

Pass additional props to the underlying Ant Design `Input` component:

```tsx
<CountryPhoneInput
  inputProps={{
    maxLength: 20,
    autoComplete: 'tel',
    onBlur: (e) => console.log('Input blurred'),
  }}
/>
```

**Note:** Internal props like `value`, `onChange`, `onKeyDown` are managed by the component and cannot be overridden.

---

## 🎨 Styling & Compatibility

### Ant Design CSS Requirement

**The component requires Ant Design's CSS to be imported in your project.** The component's internal styles are automatically bundled and injected, so you don't need to import them separately.

```tsx
// In your main entry file (e.g., main.tsx, App.tsx, or _app.tsx)
import 'antd/dist/reset.css'; // Ant Design v5

// Component styles are automatically included - no additional import needed
```

### Using with Ant Design Theme

The component **automatically respects** Ant Design's theme configuration:

```tsx
import { ConfigProvider, theme } from 'antd';
import { CountryPhoneInput } from 'antd-country-phone-picker';

function App() {
  return (
    <ConfigProvider
      theme={{
        algorithm: theme.darkAlgorithm,
        token: {
          colorPrimary: '#1890ff',
          borderRadius: 4,
        },
      }}
    >
      <CountryPhoneInput defaultCountry="US" />
    </ConfigProvider>
  );
}
```

### Dark Mode

Dark mode is **automatically supported** through Ant Design's theme system:

```tsx
<ConfigProvider theme={{ algorithm: theme.darkAlgorithm }}>
  <CountryPhoneInput />
</ConfigProvider>
```

### WordPress Compatibility

The component is **safe for WordPress + React environments**:

- ✅ **No global CSS pollution** – Uses CSS Modules for scoped styles
- ✅ **No style conflicts** – Component styles won't leak into WordPress admin
- ✅ **Ant Design styles not bundled** – User must import them explicitly

**Setup in WordPress:**

```tsx
// In your React app entry point
import 'antd/dist/reset.css';
import { CountryPhoneInput } from 'antd-country-phone-picker';

// Use the component normally
function MyWordPressWidget() {
  return <CountryPhoneInput defaultCountry="US" />;
}
```

### Custom CSS Classes

You can target specific parts of the component:

```tsx
<CountryPhoneInput
  className="my-phone-wrapper"
  selectClassName="my-country-select"
  inputClassName="my-phone-input"
/>
```

```css
/* Custom styles */
.my-phone-wrapper {
  max-width: 400px;
}

.my-country-select {
  width: 120px;
}

.my-phone-input {
  flex: 1;
}
```

### CSS Module Classes (Internal)

The component uses CSS Modules internally. Key classes:

- `.wrapper` – Main container
- `.countrySelect` – Country dropdown
- `.phoneInput` – Phone number input
- `.flagImage` – Flag image element
- `.countryOption` – Dropdown option item

These are **scoped** and won't leak into your global styles.

---

## 🔧 Advanced Usage

### Custom Search Icon

```tsx
import { SearchOutlined } from '@ant-design/icons';

<CountryPhoneInput
  searchIcon={<SearchOutlined style={{ color: '#1890ff' }} />}
  searchPlaceholder="Find your country"
/>
```

### Custom Dropdown Rendering

Add custom content to the dropdown:

```tsx
<CountryPhoneInput
  popupRender={(menu) => (
    <>
      {menu}
      <div style={{ padding: 8, borderTop: '1px solid #f0f0f0' }}>
        <a href="/help">Can't find your country?</a>
      </div>
    </>
  )}
/>
```

### Custom Flag Source

Use your own CDN or flag assets:

```tsx
<CountryPhoneInput
  flagUrl="https://your-cdn.com/flags"
  useSVG={false}  // Use PNG instead of SVG
/>
```

### Programmatic Control

Use ref methods to control the component:

```tsx
import { useRef } from 'react';
import { CountryPhoneInputRef } from 'antd-country-phone-picker';

function AdvancedExample() {
  const phoneRef = useRef<CountryPhoneInputRef>(null);

  return (
    <>
      <CountryPhoneInput ref={phoneRef} />
      
      <button onClick={() => phoneRef.current?.focus()}>
        Focus Input
      </button>
      
      <button onClick={() => phoneRef.current?.setCountry('GB')}>
        Switch to UK
      </button>
      
      <button onClick={() => phoneRef.current?.clear()}>
        Clear Phone
      </button>
      
      <button onClick={() => {
        const value = phoneRef.current?.getValue();
        alert(JSON.stringify(value, null, 2));
      }}>
        Get Value
      </button>
    </>
  );
}
```

---

## 🎛️ Ref Methods

Access component methods using a ref:

```typescript
interface CountryPhoneInputRef {
  /** Focus the phone input field */
  focus: () => void;
  
  /** Blur the phone input field */
  blur: () => void;
  
  /** Get the current phone value object */
  getValue: () => PhoneValue;
  
  /** Change the country programmatically by ISO2 code */
  setCountry: (iso2: string) => void;
  
  /** Clear the phone number (keeps dial code intact) */
  clear: () => void;
  
  /** Get the underlying HTML input element */
  getInputElement: () => HTMLInputElement | null;
}
```

### Usage Example

```tsx
const phoneRef = useRef<CountryPhoneInputRef>(null);

// Focus the input
phoneRef.current?.focus();

// Get current value
const value = phoneRef.current?.getValue();
console.log(value.fullNumber); // "+12025551234"

// Change country to Canada
phoneRef.current?.setCountry('CA');

// Clear the phone number
phoneRef.current?.clear(); // Result: "+1" (dial code remains)
```

---

## 🧩 Compatibility

| Environment | Support | Notes |
|-------------|---------|-------|
| **React** | 18.x, 19.x | Minimum 18.0.0 required |
| **Ant Design** | 5.0+ | v5.29+ recommended for latest features |
| **Next.js** | 13+, 14+, 15+ | Both App Router & Pages Router supported |
| **Vite** | ✅ Supported | Works out of the box |
| **Create React App** | ✅ Supported | Standard setup works |
| **TypeScript** | 4.7+ | Full type safety and autocomplete |
| **Browsers** | All modern browsers | Chrome, Firefox, Safari, Edge |
| **SSR** | ✅ Fully compatible | No window/document access during render |
| **Dark Mode** | ✅ Automatic | Via Ant Design's theme system |
| **RTL** | ✅ Supported | Respects Ant Design's direction config |
| **WordPress + React** | ✅ Compatible | No global CSS conflicts |

### SSR Safety

The component is **100% SSR-safe**:

- No direct `window` or `document` access during render
- Uses `'use client'` directive for Next.js App Router
- Dropdown container logic respects Ant Design patterns
- Works seamlessly with server-side rendering

---

## 🌐 Country Data

The component includes data for **240+ countries** with:

- Country names
- ISO2 codes (e.g., `US`, `GB`)
- Dial codes (e.g., `+1`, `+44`)
- Phone number formats
- Flag emojis

### Exporting Country Data

You can import country utilities for custom use cases:

```tsx
import {
  countries,
  getCountryByIso2,
  getCountriesByDialCode,
  searchCountriesData,
} from 'antd-country-phone-picker';

// Get all countries
console.log(countries); // Array of 240+ countries

// Find specific country
const us = getCountryByIso2('US');
console.log(us.dialCode); // "1"

// Find all countries with dial code +1
const northAmerica = getCountriesByDialCode('1');
console.log(northAmerica); // [US, CA, ...]

// Search countries
const results = searchCountriesData('united');
console.log(results); // [United States, United Kingdom, ...]
```

---

## 🚨 Common Issues & Solutions

### Issue: Dropdown not visible in Modal

**Solution:** Use `getPopupContainer` to attach dropdown to the modal:

```tsx
<Modal open={isOpen}>
  <CountryPhoneInput
    getPopupContainer={(trigger) => trigger.parentElement || document.body}
  />
</Modal>
```

### Issue: Styles not applied

**Solution:** Make sure you've imported Ant Design's CSS:

```tsx
import 'antd/dist/reset.css';
```

### Issue: TypeScript errors

**Solution:** Ensure you're using TypeScript 4.7+ and have proper type imports:

```tsx
import type { PhoneValue, CountryPhoneInputRef } from 'antd-country-phone-picker';
```

### Issue: Validation always fails in Ant Design Form

**Solution:** Check the `isValid` property in your validator:

```tsx
<Form.Item
  name="phone"
  rules={[
    {
      validator: (_, value) => {
        if (!value || !value.isValid) {
          return Promise.reject('Invalid phone number');
        }
        return Promise.resolve();
      },
    },
  ]}
>
  <CountryPhoneInput />
</Form.Item>
```

---

## 📄 License

MIT © 2026

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

Feel free to check the [issues page](https://github.com/user/antd-country-phone-picker/issues) if you want to contribute.

### Development Setup

```bash
# Clone the repository
git clone https://github.com/user/antd-country-phone-picker.git

# Install dependencies
npm install

# Run development server (demo app)
npm run dev

# Build the library
npm run build:lib

# Type check
npm run typecheck

# Lint
npm run lint
```

---

## 🐛 Bug Reports

Found a bug? Please [open an issue](https://github.com/user/antd-country-phone-picker/issues) with:

1. **Description** of the bug
2. **Steps to reproduce**
3. **Expected behavior**
4. **Actual behavior**
5. **Environment** (React version, Ant Design version, browser)

---

## 🌟 Show Your Support

Give a ⭐️ if this project helped you!

---

**Made with ❤️ for the Ant Design community**
