import { View } from 'react-native';
import { AuthLayout } from '@/layouts/AuthLayout';
import AuthForm from '@/components/form/auth/AuthForm';
import { AppText } from '@/components/ui/AppText';
import useVerifyOTP from '@/features/auth/forgot-password/hooks/useVerifyOTP';
import { useLocalSearchParams } from 'expo-router';

export default function VerifyOTPStep() {
  const { email } = useLocalSearchParams<{ email: string }>();
  const verifyOTP = useVerifyOTP();
  return (
    <AuthLayout>
      <View className="flex-1 w-full justify-center px-6 py-8">
        <View className="mb-8">
          <AppText variant="h1" className="text-center text-[#E95D77] mb-2">
            Verify Code
          </AppText>
          <AppText variant="subtitle" className="text-center">
            Enter the verification code sent to your email
          </AppText>
        </View>

        <View className="w-full">
          <AuthForm email={email} type="verifyOTP" onSubmit={verifyOTP} />
        </View>
      </View>
    </AuthLayout>
  );
}
