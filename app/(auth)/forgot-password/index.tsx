import { View } from 'react-native';
import { AuthLayout } from '@/layouts/AuthLayout';
import AuthForm from '@/components/form/auth/AuthForm';
import { AppText } from '@/components/ui/AppText';

export default function ForgotPasswordStep1() {
  return (
    <AuthLayout>
      <View className="flex-1 w-full justify-center px-6 py-8">
        <View className="mb-8">
          <AppText variant="h1" className="text-center text-[#E95D77] mb-2">
            Forgot Password
          </AppText>
          <AppText variant="subtitle" className="text-center">
            Enter your email to receive verification code
          </AppText>
        </View>

        <View className="w-full">
          <AuthForm type="forgotPassword" />
        </View>
      </View>
    </AuthLayout>
  );
}
