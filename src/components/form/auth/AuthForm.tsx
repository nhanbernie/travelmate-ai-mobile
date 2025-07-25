import validatorSchema from '@/libs/authValidator';
import FormProvider from '../FormProvider';
import { View, Pressable } from 'react-native';
import {
  INPUT_FIELDS,
  BUTTON_TITLE,
  getProcessingText,
} from '@/common/constants/form.constant';
import { TextField } from '../TextField';
import { useFormSubmit } from '@/hooks/useFormSubmit';
import { AppText } from '@/ui/AppText';
import { cn } from '@/utils/cn';
import * as yup from 'yup';
import AuthLogin from '@/components/AuthLogin';
import { useTranslation } from 'react-i18next';
import { useSafeNavigation } from '@/hooks/useSafeNavigation';

export interface IAuthFormProps {
  type: 'login' | 'register' | 'forgotPassword' | 'verifyOTP' | 'resetPassword';
  onSubmit?: (data: any) => void | Promise<void>;
  email?: string; // For passing email to verify step
  token?: string; // For passing token to reset step
}

const AuthForm = ({
  type,
  onSubmit: customOnSubmit,
  email,
  token,
}: IAuthFormProps) => {
  const { t } = useTranslation();
  const { navigate } = useSafeNavigation();
  type LoginFormData = yup.InferType<(typeof validatorSchema)[typeof type]>;

  const defaultOnSubmit = (data: LoginFormData) => {};

  // Enhanced handleSubmit that includes email for verifyOTP
  const handleSubmit = (data: any) => {
    // For verifyOTP, combine the email from props with the code from form
    if (type === 'verifyOTP' && email) {
      return (
        customOnSubmit?.({ email, otp: data.code }) || defaultOnSubmit(data)
      );
    }

    // For other form types, pass data as is
    return customOnSubmit?.(data) || defaultOnSubmit(data);
  };

  const AuthFormContent = () => {
    const { submitForm, isValid, isSubmitting } =
      useFormSubmit<LoginFormData>();

    return (
      <View className="w-full">
        <View className="space-y-5">
          {INPUT_FIELDS(type).map((field) => {
            const { label, ...fieldWithoutLabel } = field;
            return <TextField key={field.name} {...fieldWithoutLabel} />;
          })}
        </View>

        {/* Display email when in verifyOTP mode */}
        {type === 'verifyOTP' && email && (
          <View className="mt-2">
            <AppText variant="caption" className="text-gray-500 text-center">
              {t('auth.verifyOtp.codeSentTo')} {email}
            </AppText>
          </View>
        )}

        <View className="flex">
          {/* add checkbox for remember me */}
          {type === 'login' && (
            <View className="flex-row items-center justify-between">
              <Pressable
                onPress={() => console.log('Remember me pressed')}
                className="flex-row items-center"
              >
                <View className="w-5 h-5 border border-gray-300 rounded-full mr-2" />
                <AppText variant="body" className="text-gray-700">
                  {t('auth.login.rememberMe')}
                </AppText>
              </Pressable>

              <View className="flex-row justify-end">
                <Pressable
                  onPress={() => navigate('/(auth)/forgot-password/index')}
                  className="text-[#00C5A7]"
                >
                  <AppText variant="body" className="text-[#F58601]">
                    {t('auth.login.forgotPassword')}
                  </AppText>
                </Pressable>
              </View>
            </View>
          )}
        </View>
        <View className="mt-4">
          <Pressable
            className={cn(
              'w-full py-4 px-6 rounded-3xl shadow-sm',
              isValid && !isSubmitting
                ? 'bg-[#00C5A7] active:bg-[#00B89A]'
                : 'bg-[#E0E0E0]'
            )}
            disabled={!isValid || isSubmitting}
            onPress={submitForm(handleSubmit)}
          >
            <AppText
              variant="body"
              weight="semibold"
              className={cn(
                'text-center text-base',
                isValid && !isSubmitting ? 'text-white' : 'text-gray-500'
              )}
            >
              {isSubmitting ? getProcessingText(type) : BUTTON_TITLE(type)}
            </AppText>
          </Pressable>
        </View>
        {/* Only show AuthLogin for login/register, not for password reset flow */}
        {(type === 'login' || type === 'register') && (
          <AuthLogin type={type as 'login' | 'register'} />
        )}
      </View>
    );
  };

  return (
    <FormProvider
      validatorSchema={validatorSchema[type]}
      onSubmit={handleSubmit}
    >
      <AuthFormContent />
    </FormProvider>
  );
};

export default AuthForm;
