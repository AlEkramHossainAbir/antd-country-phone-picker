# CountryPhoneInput

A production-ready, fully-typed phone input component for **Ant Design v5+**. Designed to feel like a native Ant Design component while solving common UX problems found in other phone input libraries.

[![npm version](https://img.shields.io/npm/v/antd-country-phone-picker.svg)](https://www.npmjs.com/package/antd-country-phone-picker)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue.svg)](https://www.typescriptlang.org/)
[![Ant Design](https://img.shields.io/badge/Ant%20Design-v5.29+-1890ff.svg)](https://ant.design/)

## ✨ Features

- 🎯 **Protected Dial Code** - Users cannot accidentally delete or modify the country code
- 🔍 **Searchable Country Dropdown** - Search by name, ISO code, or dial code
- 📏 **Automatic Length Validation** - Enforces maximum phone length per country
- 🎨 **Native Ant Design Feel** - Matches AntD styling, theming, and behavior
- 📦 **Lightweight** - No heavy dependencies like libphonenumber
- 🌐 **240+ Countries** - Comprehensive country data with flags
- 💪 **Fully Typed** - Complete TypeScript support with strict mode
- 🔄 **Controlled & Uncontrolled** - Works both ways
- ♿ **Accessible** - Keyboard navigation and screen reader friendly
- 🌙 **Dark Mode Ready** - Automatic dark theme support
- 📱 **SSR Safe** - Works with Next.js and other SSR frameworks

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

Make sure you have these installed:

```json
{
  "react": ">=18.0.0",
  "react-dom": ">=18.0.0",
  "antd": ">=5.0.0"
}
```

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

## 📖 Usage Patterns

### Controlled Mode

```tsx
import { useState } from 'react';
import { CountryPhoneInput, PhoneValue } from 'antd-country-phone-picker';

function ControlledExample() {
  const [phone, setPhone] = useState<string>('+1');

  return (
    <CountryPhoneInput
      value={phone}
      onChange={(value: PhoneValue) => setPhone(value.fullNumber)}
    />
  );
}
```

### Uncontrolled Mode

```tsx
import { useRef } from 'react';
import { CountryPhoneInput, CountryPhoneInputRef } from 'antd-country-phone-picker';

function UncontrolledExample() {
  const phoneRef = useRef<CountryPhoneInputRef>(null);

  const handleSubmit = () => {
    const value = phoneRef.current?.getValue();
    console.log('Phone value:', value);
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

```tsx
<CountryPhoneInput
  defaultCountry="US"
  preferredCountries={['US', 'GB', 'CA', 'AU']}
/>
```

### Restrict to Specific Countries

```tsx
<CountryPhoneInput
  onlyCountries={['US', 'CA', 'MX']}
  defaultCountry="US"
/>
```

### Exclude Countries

```tsx
<CountryPhoneInput
  excludeCountries={['KP', 'IR']}
  defaultCountry="US"
/>
```

## 📋 Props Reference

### Value & Control Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `string` | - | Controlled value - full phone number with dial code |
| `defaultValue` | `string` | - | Default value for uncontrolled mode |
| `defaultCountry` | `string` | `'US'` | Default country by ISO2 code (e.g., "US", "BD") |
| `defaultCode` | `string` | - | Default country by dial code (e.g., "1", "880") |
| `onChange` | `(value: PhoneValue) => void` | - | Callback when phone value changes |
| `onCountryChange` | `(country: Country) => void` | - | Callback when country selection changes |

### Country Filtering Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `preferredCountries` | `string[]` | - | ISO2 codes to show at top of list |
| `onlyCountries` | `string[]` | - | ISO2 codes to include exclusively |
| `excludeCountries` | `string[]` | - | ISO2 codes to exclude from list |
| `distinct` | `boolean` | `false` | Show only one country per dial code |

### Dropdown Configuration Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `enableSearch` | `boolean` | `true` | Enable search in dropdown |
| `searchIcon` | `ReactNode` | Search icon SVG | Custom icon for search field (SVG or React element) |
| `searchPlaceholder` | `string` | `'Search country'` | Placeholder for search input |
| `searchNotFound` | `ReactNode` | `'No country found'` | Content when search has no results |
| `enableArrow` | `boolean` | `true` | Show dropdown arrow icon |
| `dropdownIcon` | `ReactNode` | - | Custom dropdown arrow icon |
| `disableDropdown` | `boolean` | `false` | Disable the country dropdown |
| `popupRender` | `SelectProps['dropdownRender']` | - | Custom dropdown render function |
| `getPopupContainer` | `(triggerNode: HTMLElement) => HTMLElement` | - | Container for dropdown portal |

### Display Configuration Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `useSVG` | `boolean` | `true` | Use SVG flags (PNG fallback if false) |
| `flagUrl` | `string` | - | Custom base URL for flag images |

### Styling Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `className` | `string` | - | Additional class for wrapper |
| `selectClassName` | `string` | - | Additional class for select |
| `inputClassName` | `string` | - | Additional class for input |
| `style` | `CSSProperties` | - | Inline styles for wrapper |
| `size` | `'small' \| 'middle' \| 'large'` | `'middle'` | Component size |
| `variant` | `'outlined' \| 'borderless' \| 'filled'` | `'outlined'` | Border style variant |
| `status` | `'error' \| 'warning'` | - | Validation status |
| `disabled` | `boolean` | `false` | Disabled state |
| `readOnly` | `boolean` | `false` | Read-only state |
| `placeholder` | `string` | `'Phone number'` | Input placeholder |

### Passthrough Props

| Prop | Type | Description |
|------|------|-------------|
| `selectProps` | `SelectPassthroughProps` | Props passed to Ant Design Select |
| `inputProps` | `InputPassthroughProps` | Props passed to Ant Design Input |

## 📤 Value Format

The `onChange` callback receives a `PhoneValue` object:

```typescript
interface PhoneValue {
  /** Full phone number with dial code (e.g., "+12025551234") */
  fullNumber: string;
  
  /** Phone number without dial code (e.g., "2025551234") */
  phoneNumber: string;
  
  /** Country dial code with + (e.g., "+1") */
  dialCode: string;
  
  /** Country dial code without + (e.g., "1") */
  rawDialCode: string;
  
  /** ISO2 country code (e.g., "US") */
  countryCode: string;
  
  /** Full country data object */
  country: Country | null;
  
  /** Basic validation - true if phone has at least 4 digits */
  isValid: boolean;
}
```

### Example Value

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
    // ...
  },
  isValid: true
}
```

## 🎛️ Ref Methods

Access component methods using a ref:

```typescript
interface CountryPhoneInputRef {
  /** Focus the phone input field */
  focus: () => void;
  
  /** Blur the phone input field */
  blur: () => void;
  
  /** Get the current phone value */
  getValue: () => PhoneValue;
  
  /** Set the country programmatically by ISO2 code */
  setCountry: (iso2: string) => void;
  
  /** Clear the phone number (keeps dial code) */
  clear: () => void;
  
  /** Get the underlying input element */
  getInputElement: () => HTMLInputElement | null;
}
```

## 🛡️ Input Protection

The dial code is protected and cannot be removed or modified manually:

- **Backspace at dial code boundary** → Prevented
- **Delete in dial code area** → Prevented  
- **Select All + Delete** → Prevented (only phone digits are selected)
- **Paste over dial code** → Pasted content appended to phone digits
- **Cut dial code** → Prevented

The dial code **only** changes when:
- User selects a different country from the dropdown
- `setCountry()` is called programmatically

## 📏 Phone Length Validation

Phone number length is automatically validated based on the selected country:

- Maximum digits are enforced at the input level
- Extra digits are blocked, not truncated after entry
- When country changes, existing digits are trimmed if needed
- Paste operations respect the maximum length

Length limits are derived from country format patterns (e.g., `+1 (...) ...-....` = 10 digits for US).

## 🎨 Styling & Theming

### Using with Ant Design Theme

The component automatically respects Ant Design's theme configuration:

```tsx
import { ConfigProvider, theme } from 'antd';

<ConfigProvider
  theme={{
    algorithm: theme.darkAlgorithm,
    token: {
      colorPrimary: '#1890ff',
    },
  }}
>
  <CountryPhoneInput />
</ConfigProvider>
```

### Custom Styling

```tsx
<CountryPhoneInput
  className="my-phone-input"
  selectClassName="my-select"
  inputClassName="my-input"
  style={{ maxWidth: 400 }}
/>
```

### CSS Module Classes

The component uses CSS Modules. Key classes:
- `.wrapper` - Main container
- `.countrySelect` - Country dropdown
- `.phoneInput` - Phone number input
- `.flagImage` - Flag image
- `.countryOption` - Dropdown option

## 🔧 Advanced Usage

### Custom Search Icon

```tsx
import { SearchOutlined } from '@ant-design/icons';

<CountryPhoneInput
  searchIcon={<SearchOutlined style={{ color: '#1890ff' }} />}
  searchPlaceholder="Find your country"
/>
```

### Custom Popup Container

Useful in modals or scrollable containers:

```tsx
<CountryPhoneInput
  getPopupContainer={(trigger) => trigger.parentElement || document.body}
/>
```

### Custom Dropdown Rendering

```tsx
<CountryPhoneInput
  popupRender={(menu) => (
    <>
      {menu}
      <div style={{ padding: 8 }}>
        <a href="/help">Need help?</a>
      </div>
    </>
  )}
/>
```

### Custom Flag Source

```tsx
<CountryPhoneInput
  flagUrl="https://your-cdn.com/flags"
  useSVG={false} // Use PNG instead
/>
```

## 🧩 Compatibility

| Environment | Support |
|-------------|---------|
| React | 18.x, 19.x |
| Ant Design | 5.0+ (v5.29+ recommended) |
| Next.js | 13+, 14+, 15+ (App Router & Pages Router) |
| TypeScript | 4.7+ |
| Browsers | All modern browsers |
| SSR | ✅ Fully compatible |
| Dark Mode | ✅ Automatic |
| RTL | ✅ Supported |

## 📄 License

MIT © 2025

---

## 🤝 Contributing

Contributions are welcome! Please read our contributing guidelines before submitting a PR.

## 🐛 Issues

Found a bug? Please [open an issue](https://github.com/your-repo/antd-country-phone-picker/issues) with a detailed description and reproduction steps.
