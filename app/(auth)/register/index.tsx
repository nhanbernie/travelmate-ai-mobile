import { View } from 'react-native';
import { AuthLayout } from '@/layouts/AuthLayout';
import AuthForm from '@/components/form/auth/AuthForm';
import { AppText } from '@/components/ui/AppText';
export default function RegisterPage() {
  return (
    <AuthLayout>
      <View className="flex-1 w-full justify-center px-6 py-8">
        <View className="mb-8">
          <AppText variant="h1" className="text-center mb-2">
            Tạo tài khoản mới
          </AppText>
          <AppText variant="subtitle" className="text-center">
            Điền thông tin để đăng ký
          </AppText>
        </View>

        <View className="w-full">
          <AuthForm type="register" />
        </View>
      </View>
    </AuthLayout>
  );
}
