import React from 'react';
import { ScrollView, View } from 'react-native';
import { AppText } from '@/components/ui';
import { AuthLayout } from '@/layouts/AuthLayout';

export default function TermsPage() {
  return (
    <AuthLayout>
      <ScrollView className="flex-1 px-6 py-8">
        <AppText variant="h2" className="mb-6">
          Terms of Service
        </AppText>

        <AppText variant="body" className="mb-4 leading-6">
          Welcome to Schedoryn. By using our service, you agree to these
          terms...
        </AppText>

        {/* Add more terms content */}
      </ScrollView>
    </AuthLayout>
  );
}
