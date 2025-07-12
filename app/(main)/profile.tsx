import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import React from 'react';
import ScreenWrapper from '@/components/layouts/ScreenWrapper ';
import { useScrollDetector } from '@/hooks/useScrollDetector';
import { useTranslation } from 'react-i18next';
import { LanguageSwitcher } from '@/components/ui';
import { AppText } from '@/components/ui/AppText';
import { useSafeNavigation } from '@/hooks/useSafeNavigation';
import LanguageTestScreen from '@/components/test/LanguageTestScreen';

const Profile = () => {
  const { t } = useTranslation();
  const { navigate } = useSafeNavigation();
  const { scrollHandler, scrollEventThrottle } = useScrollDetector(18, 7);

  const handleTestAuth = () => {
    navigate('/(auth)/login');
  };

  return (
    <ScreenWrapper>
      <ScrollView
        onScroll={scrollHandler}
        scrollEventThrottle={scrollEventThrottle}
        style={{ flex: 1 }}
      >
        <LanguageTestScreen />
      </ScrollView>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    alignItems: 'center',
    minHeight: '100%',
  },
  section: {
    width: '100%',
    marginBottom: 24,
    alignItems: 'center',
  },
  testButton: {
    backgroundColor: '#E95D77',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
});

export default Profile;
