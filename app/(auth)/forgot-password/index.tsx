import { View } from 'react-native';
import { AuthLayout } from '@/layouts/AuthLayout';
import AuthForm from '@/components/form/auth/AuthForm';
import { AppText } from '@/components/ui/AppText';
export default function ForgotPassword() {
  return (
    <AuthLayout>
      <View className="flex-1 w-full justify-center px-6 py-8">
        <View className="mb-8">
          <AppText variant="h1" className="text-center mb-2">
            Quên mật khẩu?
          </AppText>
          <AppText variant="subtitle" className="text-center">
            Nhập email để khôi phục mật khẩu
          </AppText>
        </View>

        <View className="w-full">
          <AuthForm type="forgotPassword" />
        </View>
      </View>
    </AuthLayout>
  );
}
