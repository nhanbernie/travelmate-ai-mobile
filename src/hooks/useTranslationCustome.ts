import { useTranslation } from 'react-i18next';

export const useTranslationCustom = () => {
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return { t, changeLanguage };
};
export default useTranslationCustom;
export type { SupportedLanguage } from './useLanguage';
