import React from 'react';
import { View, Pressable, ActivityIndicator } from 'react-native';
import { AppText } from '../ui/AppText';
import { useLanguage, SupportedLanguage } from '@/hooks/language/useLanguage';
import { cn } from '@/utils/cn';
import Ionicons from '@expo/vector-icons/Ionicons';

interface LanguageSwitcherProps {
  className?: string;
  showIcon?: boolean;
  variant?: 'button' | 'dropdown' | 'tabs';
}

const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({
  className,
  showIcon = true,
  variant = 'button',
}) => {
  const {
    currentLanguage,
    changeLanguage,
    getLanguageName,
    supportedLanguages,
    isChanging,
  } = useLanguage();

  const handleLanguageChange = async (language: SupportedLanguage) => {
    if (isChanging || language === currentLanguage) return;
    await changeLanguage(language);
  };

  if (variant === 'button') {
    return (
      <Pressable
        onPress={() =>
          handleLanguageChange(currentLanguage === 'en' ? 'vi' : 'en')
        }
        disabled={isChanging}
        className={cn(
          'flex-row items-center justify-center px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800',
          isChanging && 'opacity-50',
          className
        )}
      >
        {showIcon && !isChanging && (
          <Ionicons
            name="language-outline"
            size={20}
            color="#6B7280"
            style={{ marginRight: 8 }}
          />
        )}
        {isChanging && (
          <ActivityIndicator
            size="small"
            color="#6B7280"
            style={{ marginRight: 8 }}
          />
        )}
        <AppText className="text-gray-700 dark:text-gray-300 font-medium">
          {getLanguageName(currentLanguage)}
        </AppText>
      </Pressable>
    );
  }

  if (variant === 'tabs') {
    return (
      <View
        className={cn(
          'flex-row rounded-lg bg-gray-100 dark:bg-gray-800 p-1',
          className
        )}
      >
        {supportedLanguages.map((language) => (
          <Pressable
            key={language}
            onPress={() => handleLanguageChange(language)}
            disabled={isChanging}
            className={cn(
              'flex-1 py-2 px-3 rounded-md items-center justify-center',
              currentLanguage === language
                ? 'bg-white dark:bg-gray-700 shadow-sm'
                : 'bg-transparent',
              isChanging && 'opacity-50'
            )}
          >
            <AppText
              className={cn(
                'text-sm font-medium',
                currentLanguage === language
                  ? 'text-[#E95D77] dark:text-[#E95D77]'
                  : 'text-gray-600 dark:text-gray-400'
              )}
            >
              {getLanguageName(language)}
            </AppText>
          </Pressable>
        ))}
      </View>
    );
  }

  if (variant === 'dropdown') {
    return (
      <View className={cn('', className)}>
        {supportedLanguages.map((language) => (
          <Pressable
            key={language}
            onPress={() => handleLanguageChange(language)}
            disabled={isChanging}
            className={cn(
              'flex-row items-center justify-between py-3 px-4 border-b border-gray-200 dark:border-gray-700',
              currentLanguage === language
                ? 'bg-[#FEE7ED] dark:bg-[#FEE7ED]/10'
                : 'bg-transparent',
              isChanging && 'opacity-50'
            )}
          >
            <View className="flex-row items-center">
              <AppText
                className={cn(
                  'text-base',
                  currentLanguage === language
                    ? 'text-[#E95D77] font-semibold'
                    : 'text-gray-700 dark:text-gray-300'
                )}
              >
                {getLanguageName(language)}
              </AppText>
            </View>
            {currentLanguage === language && !isChanging && (
              <Ionicons name="checkmark" size={20} color="#E95D77" />
            )}
            {isChanging && currentLanguage === language && (
              <ActivityIndicator size="small" color="#E95D77" />
            )}
          </Pressable>
        ))}
      </View>
    );
  }

  return null;
};

export default LanguageSwitcher;
