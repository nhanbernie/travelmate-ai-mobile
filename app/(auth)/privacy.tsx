import React from 'react';
import { ScrollView, View } from 'react-native';
import { AppText } from '@/components/ui';
import { AuthLayout } from '@/layouts/AuthLayout';

const PrivacyPage = () => {
  return (
    <AuthLayout>
      <ScrollView className="flex-1 px-6 py-8">
        <AppText variant="h2" className="mb-6">
          Privacy Policy
        </AppText>

        <AppText variant="body" className="mb-4 leading-6">
          Your privacy is important to us. This policy explains how we
          collect...
        </AppText>
      </ScrollView>
    </AuthLayout>
  );
};

export default PrivacyPage;
