# Internationalization (i18n) Implementation

This document describes the complete i18n implementation for the Schedoryn mobile app using React Native, Expo, and modern 2025 best practices.

## Overview

The app supports multiple languages with automatic device language detection, persistent language preference, and comprehensive translation coverage for all authentication screens.

## Supported Languages

- **English (en)** - Default fallback language
- **Vietnamese (vi)** - Full translation support

## Features

### 🌍 Language Detection

- Automatic device language detection on first app launch
- Persistent language preference using AsyncStorage
- Graceful fallback to English if unsupported language detected

### 🔄 Language Switching

- Multiple UI variants for language switching (button, tabs, dropdown)
- Instant language change without app restart
- Persistent language preference across app sessions

### 🔐 Authentication i18n

- Complete translation coverage for all auth screens:
  - Login
  - Register
  - Forgot Password
  - Verify OTP
  - Reset Password
- Localized form validation messages
- Dynamic field labels and placeholders
- Localized button text and processing states

### 📝 Form Validation

- i18n-enabled Yup validation schemas
- Translated error messages
- Context-aware validation text

## Architecture

### Files Structure

```
src/
├── i18n/
│   ├── index.ts              # Main i18n configuration
│   └── locales/
│       ├── en.json          # English translations
│       └── vi.json          # Vietnamese translations
├── hooks/
│   ├── useLanguage.ts       # Language management hook
│   └── useSafeNavigation.ts # Safe navigation hook
├── components/
│   └── ui/
│       └── LanguageSwitcher.tsx  # Language switcher component
├── libs/
│   └── authValidator.ts     # i18n-enabled validation schemas
└── common/
    └── constants/
        └── form.constant.ts # i18n-enabled form constants
```

## Configuration

### i18n Setup (`src/i18n/index.ts`)

```typescript
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NativeModules, Platform } from 'react-native';

// Features:
// - Device language detection
// - AsyncStorage persistence
// - Automatic fallback to English
// - Language detector plugin
// - React Native optimizations
```

### Translation Files

- **Nested structure** for better organization
- **Consistent naming** using dot notation
- **Fallback values** for missing translations
- **Context-aware** translations

## Usage

### Basic Translation

```typescript
import { useTranslation } from 'react-i18next';

const MyComponent = () => {
  const { t } = useTranslation();

  return <Text>{t('auth.login.title')}</Text>;
};
```

### Language Management

```typescript
import { useLanguage } from '@/hooks/useLanguage';

const MyComponent = () => {
  const { currentLanguage, changeLanguage, getLanguageName } = useLanguage();

  const handleLanguageChange = () => {
    changeLanguage(currentLanguage === 'en' ? 'vi' : 'en');
  };

  return (
    <Pressable onPress={handleLanguageChange}>
      <Text>{getLanguageName(currentLanguage)}</Text>
    </Pressable>
  );
};
```

### Language Switcher Component

```typescript
import { LanguageSwitcher } from '@/components/ui';

// Button variant
<LanguageSwitcher variant="button" showIcon={true} />

// Tabs variant
<LanguageSwitcher variant="tabs" />

// Dropdown variant
<LanguageSwitcher variant="dropdown" />
```

## Translation Keys Structure

### Authentication (`auth.*`)

```json
{
  "auth": {
    "login": {
      "title": "Welcome Back!",
      "subtitle": "Sign in to plan your next adventure",
      "button": "Sign In",
      "processing": "Signing in...",
      "rememberMe": "Remember me",
      "forgotPassword": "Forgot Password?",
      "noAccount": "Don't have an account? ",
      "signUp": "Sign Up"
    },
    "fields": {
      "email": {
        "label": "Email",
        "placeholder": "Enter your email"
      }
    },
    "errors": {
      "invalidEmail": "Please enter a valid email address",
      "passwordTooShort": "Password must be at least 6 characters",
      "requiredField": "This field is required"
    }
  }
}
```

### Common (`common.*`)

```json
{
  "common": {
    "loading": "Loading...",
    "submit": "Submit",
    "cancel": "Cancel",
    "save": "Save"
  }
}
```

## Form Validation with i18n

### Dynamic Form Fields

```typescript
const getCommonFields = (): IInputFieldProps[] => [
  {
    label: i18n.t('auth.fields.email.label'),
    name: 'email',
    type: 'email',
    placeholder: i18n.t('auth.fields.email.placeholder'),
  },
];
```

### Validation Schema

```typescript
const validatorSchema = {
  login: Yup.object().shape({
    email: Yup.string()
      .email(i18n.t('auth.errors.invalidEmail'))
      .required(i18n.t('auth.errors.requiredField')),
  }),
};
```

## Best Practices

### 1. **Consistent Key Naming**

- Use dot notation: `auth.login.title`
- Group related translations
- Use descriptive names

### 2. **Fallback Strategy**

- Always provide English fallback
- Use default values in `t()` function
- Handle missing translations gracefully

### 3. **Performance Optimization**

- Lazy loading translations
- Memoized language hooks
- Efficient re-renders

### 4. **User Experience**

- Device language detection
- Persistent language preference
- Smooth language switching
- No app restart required

### 5. **Maintenance**

- Organized file structure
- TypeScript support
- Centralized translation management
- Easy to add new languages

## Testing

### Language Switching Test

1. Open Profile screen
2. Use language switcher components
3. Verify translations change immediately
4. Check persistence after app restart

### Authentication Flow Test

1. Navigate to auth screens
2. Switch languages
3. Verify all text translates correctly
4. Test form validation messages
5. Check processing states

## Future Enhancements

### Planned Features

- **RTL Support** for Arabic/Hebrew languages
- **Pluralization** for count-based translations
- **Date/Time Formatting** per locale
- **Currency Formatting** per region
- **Translation Management** via external service

### Adding New Languages

1. Create new locale file: `src/i18n/locales/[lang].json`
2. Add to supported languages: `src/i18n/index.ts`
3. Update type definitions: `src/hooks/useLanguage.ts`
4. Add language name mapping
5. Test all flows

## Dependencies

```json
{
  "i18next": "^23.x.x",
  "react-i18next": "^14.x.x",
  "@react-native-async-storage/async-storage": "^1.x.x"
}
```

## Migration Notes

### From Hardcoded Strings

- Replace all hardcoded strings with `t()` calls
- Add translation keys to locale files
- Update form validation messages
- Test all user flows

### Breaking Changes

- Form constants now require i18n initialization
- Validation schemas depend on i18n
- Language detection runs on app startup

## Troubleshooting

### Common Issues

1. **Missing translations**: Check console for missing key warnings
2. **Language not persisting**: Verify AsyncStorage permissions
3. **Validation errors**: Ensure i18n is initialized before validation
4. **Performance issues**: Check for unnecessary re-renders
5. **Navigation context error**: Use `useSafeNavigation` hook instead of direct `router.push()`

### Navigation Context Error

If you encounter: `Error: Couldn't find a navigation context. Have you wrapped your app with 'NavigationContainer'?`

**Solution**: Use the `useSafeNavigation` hook instead of direct `router.push()`:

```typescript
// ❌ Don't do this
import { router } from 'expo-router';
router.push('/(auth)/login');

// ✅ Do this instead
import { useSafeNavigation } from '@/hooks/useSafeNavigation';

const { navigate } = useSafeNavigation();
navigate('/(auth)/login');
```

### Debug Mode

Enable debug mode in development:

```typescript
i18n.init({
  debug: __DEV__,
  // ... other options
});
```

### Safe Navigation Hook

The `useSafeNavigation` hook provides error-safe navigation:

```typescript
import { useSafeNavigation } from '@/hooks/useSafeNavigation';

const MyComponent = () => {
  const { navigate, canNavigate } = useSafeNavigation();

  const handleNavigation = () => {
    if (canNavigate()) {
      navigate('/(auth)/login');
    }
  };
};
```

This implementation provides a robust, scalable, and user-friendly internationalization system following 2025 best practices for React Native applications.
