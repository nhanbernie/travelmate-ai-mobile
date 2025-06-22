import validatorSchema from '@/libs/authValidator';
import FormProvider from './FormProvider';
import { View, Pressable } from 'react-native';
import { INPUT_FIELDS, BUTTON_TITLE } from '@/common/constants/form.constant';
import { TextField } from './TextField';
import { useFormSubmit } from '@/hooks/useFormSubmit';
import { AppText } from '../ui/AppText';
import { cn } from '@/utils/cn';
import * as yup from 'yup';
export interface IAuthFormProps {
  type: 'login' | 'register' | 'forgotPassword';
}

const AuthForm = ({ type }: IAuthFormProps) => {
  type LoginFormData = yup.InferType<(typeof validatorSchema)[typeof type]>;

  const onSubmit = (data: LoginFormData) => {
    console.log(data);
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
        <View className="mt-8">
          <Pressable
            className={cn(
              'w-full py-4 px-6 rounded-xl shadow-sm',
              isValid && !isSubmitting
                ? 'bg-blue-500 active:bg-blue-600'
                : 'bg-gray-300'
            )}
            disabled={!isValid || isSubmitting}
            onPress={submitForm(onSubmit)}
          >
            <AppText
              variant="body"
              weight="semibold"
              className={cn(
                'text-center text-base',
                isValid && !isSubmitting ? 'text-white' : 'text-gray-500'
              )}
            >
              {isSubmitting ? 'Đang xử lý...' : BUTTON_TITLE(type)}
            </AppText>
          </Pressable>
        </View>
      </View>
    );
  };

  return (
    <FormProvider validatorSchema={validatorSchema[type]} onSubmit={onSubmit}>
      <AuthFormContent />
    </FormProvider>
  );
};

export default AuthForm;
