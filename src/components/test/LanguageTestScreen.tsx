import React from 'react';
import { View, ScrollView, Pressable } from 'react-native';
import { AppText } from '@/components/ui/AppText';
import SafeLanguageSwitcher from '@/components/ui/SafeLanguageSwitcher';
import { useTranslation } from 'react-i18next';
import i18n from '@/i18n';

const LanguageTestScreen = () => {
  const { t } = useTranslation();
  const currentLanguage = i18n.language;

  const handleLanguageChange = async (language: string) => {
    try {
      await i18n.changeLanguage(language);
    } catch (error) {
      console.error('Error changing language:', error);
    }
  };

  return (
    <ScrollView style={{ flex: 1, padding: 20 }}>
      <AppText variant="h1" className="text-center text-[#E95D77] mb-4">
        Language Test Screen
      </AppText>

      <View className="mb-6">
        <AppText variant="h3" className="mb-2">
          Current Language: {currentLanguage}
        </AppText>
      </View>

      <View className="mb-6">
        <AppText variant="h3" className="mb-2">
          Safe Language Switcher - Button:
        </AppText>
        <SafeLanguageSwitcher variant="button" />
      </View>

      <View className="mb-6">
        <AppText variant="h3" className="mb-2">
          Safe Language Switcher - Tabs:
        </AppText>
        <SafeLanguageSwitcher variant="tabs" />
      </View>

      <View className="mb-6">
        <AppText variant="h3" className="mb-2">
          Direct Language Change:
        </AppText>
        <View className="flex-row gap-4">
          <Pressable
            onPress={() => handleLanguageChange('en')}
            className="px-4 py-2 bg-blue-500 rounded-md"
          >
            <AppText className="text-white">English</AppText>
          </Pressable>
          <Pressable
            onPress={() => handleLanguageChange('vi')}
            className="px-4 py-2 bg-green-500 rounded-md"
          >
            <AppText className="text-white">Tiếng Việt</AppText>
          </Pressable>
        </View>
      </View>

      <View className="mb-6">
        <AppText variant="h3" className="mb-2">
          Sample Translations:
        </AppText>
        <AppText variant="body" className="mb-1">
          App Name: {t('app_name', 'Schedoryn')}
        </AppText>
        <AppText variant="body" className="mb-1">
          Login Title: {t('auth.login.title', 'Welcome Back!')}
        </AppText>
        <AppText variant="body" className="mb-1">
          Register Title: {t('auth.register.title', 'Welcome to Schedoryn')}
        </AppText>
        <AppText variant="body" className="mb-1">
          Email Label: {t('auth.fields.email.label', 'Email')}
        </AppText>
        <AppText variant="body" className="mb-1">
          Language: {t('language', 'Language')}
        </AppText>
      </View>
    </ScrollView>
  );
};

export default LanguageTestScreen;
