import * as Yup from 'yup';
import i18n from '@/i18n';

const AUTH_PASSWORD =
  /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{6,}$/;
const AUTH_CODE_VERIFICATION = /^[0-9]+$/;

// Helper function to get translated error messages
const getErrorMessage = (key: string) => i18n.t(key);

const validatorSchema = {
  login: Yup.object().shape({
    email: Yup.string()
      .email(getErrorMessage('auth.errors.invalidEmail'))
      .required(getErrorMessage('auth.errors.requiredField')),
    password: Yup.string()
      .matches(AUTH_PASSWORD, getErrorMessage('auth.errors.passwordComplexity'))
      .min(6, getErrorMessage('auth.errors.passwordTooShort'))
      .required(getErrorMessage('auth.errors.requiredField')),
  }),
  register: Yup.object().shape({
    username: Yup.string()
      .min(3, getErrorMessage('auth.errors.requiredField'))
      .required(getErrorMessage('auth.errors.requiredField')),
    email: Yup.string()
      .email(getErrorMessage('auth.errors.invalidEmail'))
      .required(getErrorMessage('auth.errors.requiredField')),
    password: Yup.string()
      .min(6, getErrorMessage('auth.errors.passwordTooShort'))
      .required(getErrorMessage('auth.errors.requiredField')),
    confirmPassword: Yup.string()
      .oneOf(
        [Yup.ref('password')],
        getErrorMessage('auth.errors.passwordsDoNotMatch')
      )
      .required(getErrorMessage('auth.errors.requiredField')),
  }),
  forgotPassword: Yup.object().shape({
    email: Yup.string()
      .email(getErrorMessage('auth.errors.invalidEmail'))
      .required(getErrorMessage('auth.errors.requiredField')),
  }),
  verifyOTP: Yup.object().shape({
    code: Yup.string()
      .length(6, getErrorMessage('auth.errors.invalidCode'))
      .matches(
        AUTH_CODE_VERIFICATION,
        getErrorMessage('auth.errors.invalidCode')
      )
      .required(getErrorMessage('auth.errors.requiredField')),
  }),
  resetPassword: Yup.object().shape({
    password: Yup.string()
      .min(6, getErrorMessage('auth.errors.passwordTooShort'))
      .required(getErrorMessage('auth.errors.requiredField')),
    confirmPassword: Yup.string()
      .oneOf(
        [Yup.ref('password')],
        getErrorMessage('auth.errors.passwordsDoNotMatch')
      )
      .required(getErrorMessage('auth.errors.requiredField')),
  }),
  changePassword: Yup.object().shape({
    oldPassword: Yup.string()
      .required(getErrorMessage('auth.errors.requiredField'))
      .min(6, getErrorMessage('auth.errors.passwordTooShort')),
    newPassword: Yup.string()
      .required(getErrorMessage('auth.errors.requiredField'))
      .min(6, getErrorMessage('auth.errors.passwordTooShort'))
      .notOneOf(
        [Yup.ref('oldPassword')],
        getErrorMessage('auth.errors.passwordsDoNotMatch')
      ),
    confirmPassword: Yup.string()
      .required(getErrorMessage('auth.errors.requiredField'))
      .oneOf(
        [Yup.ref('newPassword')],
        getErrorMessage('auth.errors.passwordsDoNotMatch')
      ),
  }),
};

export default validatorSchema;
