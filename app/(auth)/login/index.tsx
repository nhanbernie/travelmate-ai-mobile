import { View } from 'react-native';
import { AuthLayout } from '@/components/layouts/AuthLayout';
import AuthForm from '@/components/form/auth/AuthForm';
import { AppText } from '@/components/ui/AppText';
import useLoginSubmit from '@/features/auth/login/hooks/useLoginSubmit';
import { useTranslation } from 'react-i18next';

export default function LoginPage() {
  const { t } = useTranslation();
  const onSubmit = useLoginSubmit();

  return (
    <AuthLayout>
      <View className="flex-1 w-full justify-center px-6 py-8">
        <View className="mb-8">
          <AppText variant="h1" className="text-center text-[#E95D77] mb-2 font-extrabold">
            {t('auth.login.title')}
          </AppText>
          <AppText variant="subtitle" className="text-center text-[#4B5563]">
            {t('auth.login.subtitle')}
          </AppText>
        </View>

        <View className="w-full">
          <AuthForm type="login" onSubmit={onSubmit} />
        </View>
      </View>
    </AuthLayout>
  );
}
