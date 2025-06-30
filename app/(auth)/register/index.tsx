import { View } from 'react-native';
import { AuthLayout } from '@/layouts/AuthLayout';
import AuthForm from '@/components/form/auth/AuthForm';
import { AppText } from '@/components/ui/AppText';
import { useRegisterSubmit } from './hooks/useRegister';
export default function RegisterPage() {
  const handleRegister = useRegisterSubmit();

  return (
    <AuthLayout>
      <View className="flex-1 w-full justify-center px-6 py-8">
        <View className="mb-8">
          <AppText variant="h1" className="text-center text-[#E95D77]  mb-2">
            Welcome to TravelMate AI
          </AppText>
          <AppText variant="subtitle" className="text-center text-[#4B5563]">
            Your Personal Travel Companion
          </AppText>
        </View>

        <View className="w-full">
          <AuthForm type="register" onSubmit={handleRegister} />
        </View>
      </View>
    </AuthLayout>
  );
}
