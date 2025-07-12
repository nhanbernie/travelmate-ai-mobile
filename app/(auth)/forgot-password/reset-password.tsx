import { View } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { AuthLayout } from '@/components/layouts/AuthLayout';
import AuthForm from '@/components/form/auth/AuthForm';
import { AppText } from '@/components/ui/AppText';
import useResetPassword from '@/features/auth/forgot-password/hooks/useResetPassword';
import { useTranslation } from 'react-i18next';

export default function ResetPasswordStep() {
  const { t } = useTranslation();
  const { email, otp } = useLocalSearchParams<{ email: string; otp: string }>();
  const resetPassword = useResetPassword();

  if (!email || !otp) {
    console.error('Missing required params:', { email, otp });
  }

  return (
    <AuthLayout>
      <View className="flex-1 w-full justify-center px-6 py-8">
        <View className="mb-8">
          <AppText variant="h1" className="text-center text-[#E95D77] mb-2">
            {t('auth.resetPassword.title')}
          </AppText>
          <AppText variant="subtitle" className="text-center">
            {t('auth.resetPassword.subtitle')}
          </AppText>
          {email && (
            <AppText className="text-center mt-2 text-gray-500">
              {email}
            </AppText>
          )}
        </View>

        <View className="w-full">
          <AuthForm
            type="resetPassword"
            email={email}
            token={otp} // Using token prop to pass OTP
            onSubmit={(formData) => {
              // Combine form data with params
              return resetPassword({
                email: email || '',
                otp: otp || '',
                password: formData.password,
              });
            }}
          />
        </View>
      </View>
    </AuthLayout>
  );
}
