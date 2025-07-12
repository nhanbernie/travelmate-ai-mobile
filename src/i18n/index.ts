import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NativeModules, Platform } from 'react-native';

// Import translation files
import vi from './locales/vi.json';
import en from './locales/en.json';

// Get device language
const getDeviceLanguage = () => {
  let locale = 'en'; // Default fallback

  if (Platform.OS === 'ios') {
    locale =
      NativeModules.SettingsManager?.settings?.AppleLocale ||
      NativeModules.SettingsManager?.settings?.AppleLanguages?.[0] ||
      'en';
  } else {
    locale = NativeModules.I18nManager?.localeIdentifier || 'en';
  }

  return locale.split('_')[0].split('-')[0]; // Extract language code
};

const LANGUAGE_DETECTOR = {
  type: 'languageDetector' as const,
  async: true,
  detect: async (callback: (lang: string) => void) => {
    try {
      // Try to get saved language from AsyncStorage
      const savedLanguage = await AsyncStorage.getItem('user-language');
      if (savedLanguage) {
        console.log('Found saved language:', savedLanguage);
        callback(savedLanguage);
        return;
      }

      // Fallback to device locale
      const deviceLocale = getDeviceLanguage();
      console.log('Using device locale:', deviceLocale);
      callback(deviceLocale);
    } catch (error) {
      console.log('Error detecting language:', error);
      callback('en'); // Fallback to English
    }
  },
  init: () => {},
  cacheUserLanguage: async (language: string) => {
    try {
      console.log('Saving language to AsyncStorage:', language);
      await AsyncStorage.setItem('user-language', language);
    } catch (error) {
      console.log('Error saving language:', error);
    }
  },
};

const resources = {
  vi: {
    translation: vi,
  },
  en: {
    translation: en,
  },
};

i18n
  .use(LANGUAGE_DETECTOR as any)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    debug: __DEV__,

    // Have a common namespace used around the full app
    ns: ['translation'],
    defaultNS: 'translation',

    interpolation: {
      escapeValue: false, // Not needed for React Native
    },

    // React i18next options
    react: {
      useSuspense: false,
      bindI18n: 'languageChanged',
      bindI18nStore: 'added',
      transEmptyNodeValue: '',
      transSupportBasicHtmlNodes: false,
      transKeepBasicHtmlNodesFor: [],
    },

    // Custom options
    supportedLngs: ['en', 'vi'],
    nonExplicitSupportedLngs: true,

    // Disable some features that might cause issues
    saveMissing: false,
    cleanCode: true,
    detection: {
      caches: ['localStorage'],
    },
  });

// Add event listener to track language changes
i18n.on('languageChanged', (lng) => {
  console.log('Language changed to:', lng);
});

// Add event listener to track initialization
i18n.on('initialized', (options) => {
  console.log('i18n initialized with language:', i18n.language);
});

export default i18n;
