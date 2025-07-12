import i18n from '@/i18n';

export interface IInputFieldProps {
  name: string;
  label?: string;
  type?: 'text' | 'password' | 'email' | 'number';
  placeholder?: string;
  className?: string;
}

const getCommonFields = (): IInputFieldProps[] => [
  {
    label: i18n.t('auth.fields.email.label'),
    name: 'email',
    type: 'email',
    placeholder: i18n.t('auth.fields.email.placeholder'),
  },
  {
    label: i18n.t('auth.fields.password.label'),
    name: 'password',
    type: 'password',
    placeholder: i18n.t('auth.fields.password.placeholder'),
  },
];

export const INPUT_FIELDS = (
  type: 'register' | 'login' | 'forgotPassword' | 'verifyOTP' | 'resetPassword'
): IInputFieldProps[] => {
  const commonFields = getCommonFields();

  const fields: Record<
    'register' | 'login' | 'forgotPassword' | 'verifyOTP' | 'resetPassword',
    IInputFieldProps[]
  > = {
    register: [
      {
        label: i18n.t('auth.fields.username.label'),
        name: 'username',
        type: 'text',
        placeholder: i18n.t('auth.fields.username.placeholder'),
      },
      ...commonFields,
      {
        label: i18n.t('auth.fields.confirmPassword.label'),
        name: 'confirmPassword',
        type: 'password',
        placeholder: i18n.t('auth.fields.confirmPassword.placeholder'),
      },
    ],
    login: [...commonFields],
    forgotPassword: [
      {
        label: i18n.t('auth.fields.email.label'),
        name: 'email',
        type: 'email',
        placeholder: i18n.t('auth.fields.email.placeholder'),
      },
    ],
    verifyOTP: [
      {
        label: i18n.t('auth.fields.verificationCode.label'),
        name: 'code',
        type: 'number',
        placeholder: i18n.t('auth.fields.verificationCode.placeholder'),
      },
    ],
    resetPassword: [
      {
        label: i18n.t('auth.fields.newPassword.label'),
        name: 'password',
        type: 'password',
        placeholder: i18n.t('auth.fields.newPassword.placeholder'),
      },
      {
        label: i18n.t('auth.fields.confirmPassword.label'),
        name: 'confirmPassword',
        type: 'password',
        placeholder: i18n.t('auth.fields.confirmPassword.placeholder'),
      },
    ],
  };

  return fields[type];
};

const getButtonTitle = (type: string): string => {
  const buttonKeys: Record<string, string> = {
    login: 'auth.login.button',
    register: 'auth.register.button',
    forgotPassword: 'auth.forgotPassword.button',
    verifyOTP: 'auth.verifyOtp.button',
    resetPassword: 'auth.resetPassword.button',
  };

  return i18n.t(buttonKeys[type]) || i18n.t('common.submit');
};

export const BUTTON_TITLE = (type: string): string => {
  return getButtonTitle(type);
};

export const getProcessingText = (type: string): string => {
  const processingKeys: Record<string, string> = {
    login: 'auth.login.processing',
    register: 'auth.register.processing',
    forgotPassword: 'auth.forgotPassword.processing',
    verifyOTP: 'auth.verifyOtp.processing',
    resetPassword: 'auth.resetPassword.processing',
  };

  return i18n.t(processingKeys[type]) || i18n.t('common.loading');
};
