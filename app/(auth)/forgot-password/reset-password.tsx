import { View } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { AuthLayout } from '@/layouts/AuthLayout';
import AuthForm from '@/components/form/auth/AuthForm';
import { AppText } from '@/components/ui/AppText';

export default function ResetPasswordStep() {
  const { token } = useLocalSearchParams<{ token: string }>();

  const handleResetPassword = async (data: {
    password: string;
    confirmPassword: string;
  }) => {
    try {
      // TODO: Call API to reset password
      console.log('Resetting password with token:', token, 'data:', data);

      // Navigate to login with success message
      router.push('/(auth)/login');
    } catch (error) {
      console.error('Reset password error:', error);
    }
  };

  return (
    <AuthLayout>
      <View className="flex-1 w-full justify-center px-6 py-8">
        <View className="mb-8">
          <AppText variant="h1" className="text-center text-[#E95D77] mb-2">
            Create New Password
          </AppText>
          <AppText variant="subtitle" className="text-center">
            Enter your new password
          </AppText>
        </View>

        <View className="w-full">
          <AuthForm
            type="resetPassword"
            onSubmit={handleResetPassword}
            token={token}
          />
        </View>
      </View>
    </AuthLayout>
  );
}
