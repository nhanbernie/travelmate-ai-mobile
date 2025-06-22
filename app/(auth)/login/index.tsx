import { View } from 'react-native';
import { AuthLayout } from '@/layouts/AuthLayout';
import AuthForm from '@/components/form/auth/AuthForm';
import { AppText } from '@/components/ui/AppText';
export default function LoginPage() {
  return (
    <AuthLayout>
      <View className="flex-1 w-full justify-center px-6 py-8">
        <View className="mb-8">
          <AppText variant="h1" className="text-center text-[#E95D77] mb-2">
            Welcome Back!
          </AppText>
          <AppText variant="subtitle" className="text-center text-[#4B5563]">
            Sign in to plan your next adventure
          </AppText>
        </View>

        <View className="w-full">
          <AuthForm type="login" />
        </View>
      </View>
    </AuthLayout>
  );
}
