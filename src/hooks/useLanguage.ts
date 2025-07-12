import { useTranslation } from 'react-i18next';
import { useCallback, useState } from 'react';

export type SupportedLanguage = 'en' | 'vi';

export const useLanguage = () => {
  const { i18n, t } = useTranslation();
  const [isChanging, setIsChanging] = useState(false);

  const currentLanguage = i18n.language as SupportedLanguage;
  const changeLanguage = useCallback(
    async (language: SupportedLanguage) => {
      if (isChanging || language === i18n.language) return;

      try {
        setIsChanging(true);
        await i18n.changeLanguage(language);
      } catch (error) {
        console.error('Error changing language:', error);
      } finally {
        setIsChanging(false);
      }
    },
    [i18n, isChanging]
  );

  const getLanguageName = useCallback((language: SupportedLanguage) => {
    const languageNames = {
      en: 'English',
      vi: 'Tiếng Việt',
    };
    return languageNames[language];
  }, []);

  const supportedLanguages: SupportedLanguage[] = ['en', 'vi'];

  return {
    currentLanguage,
    changeLanguage,
    getLanguageName,
    supportedLanguages,
    isChanging,
    t,
  };
};
