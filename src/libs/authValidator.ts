import * as Yup from 'yup';
import { AUTH_FORM_ERROR_MESSAGES } from '@/constants/message.constant';

const AUTH_PASSWORD =
  /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{6,}$/;
const AUTH_CODE_VERIFICATION = /^[0-9]+$/;

const validatorSchema = {
  login: Yup.object().shape({
    email: Yup.string()
      .email(AUTH_FORM_ERROR_MESSAGES.EMU001)
      .required(AUTH_FORM_ERROR_MESSAGES.EMU002),
    password: Yup.string()
      .min(12, AUTH_FORM_ERROR_MESSAGES.EMU003)
      .required(AUTH_FORM_ERROR_MESSAGES.EMU004),
  }),
  register: Yup.object().shape({
    username: Yup.string()
      .min(3, AUTH_FORM_ERROR_MESSAGES.EMU005)
      .required(AUTH_FORM_ERROR_MESSAGES.EMU006),
    email: Yup.string()
      .email(AUTH_FORM_ERROR_MESSAGES.EMU001)
      .required(AUTH_FORM_ERROR_MESSAGES.EMU002),
    password: Yup.string()
      .min(12, AUTH_FORM_ERROR_MESSAGES.EMU003)
      .matches(AUTH_PASSWORD, AUTH_FORM_ERROR_MESSAGES.EMU009)
      .required(AUTH_FORM_ERROR_MESSAGES.EMU004),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password')], AUTH_FORM_ERROR_MESSAGES.EMU007)
      .required(AUTH_FORM_ERROR_MESSAGES.EMU008),
  }),
  forgotPassword: Yup.object().shape({
    email: Yup.string()
      .email(AUTH_FORM_ERROR_MESSAGES.EMU001)
      .required(AUTH_FORM_ERROR_MESSAGES.EMU002),
  }),
  verifyOTP: Yup.object().shape({
    code: Yup.string()
      .length(6, AUTH_FORM_ERROR_MESSAGES.EMU010)
      .matches(AUTH_CODE_VERIFICATION, AUTH_FORM_ERROR_MESSAGES.EMU011)
      .required(AUTH_FORM_ERROR_MESSAGES.EMU012),
  }),
  resetPassword: Yup.object().shape({
    password: Yup.string()
      .min(12, AUTH_FORM_ERROR_MESSAGES.EMU003)
      .matches(AUTH_PASSWORD, AUTH_FORM_ERROR_MESSAGES.EMU009)
      .required(AUTH_FORM_ERROR_MESSAGES.EMU004),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password')], AUTH_FORM_ERROR_MESSAGES.EMU007)
      .required(AUTH_FORM_ERROR_MESSAGES.EMU008),
  }),
  changePassword: Yup.object().shape({
    oldPassword: Yup.string()
      .required(AUTH_FORM_ERROR_MESSAGES.EMU013)
      .min(12, AUTH_FORM_ERROR_MESSAGES.EMU003)
      .matches(AUTH_PASSWORD, AUTH_FORM_ERROR_MESSAGES.EMU009),
    newPassword: Yup.string()
      .required(AUTH_FORM_ERROR_MESSAGES.EMU014)
      .min(12, AUTH_FORM_ERROR_MESSAGES.EMU003)
      .matches(AUTH_PASSWORD, AUTH_FORM_ERROR_MESSAGES.EMU009)
      .notOneOf([Yup.ref('oldPassword')], AUTH_FORM_ERROR_MESSAGES.EMU015),
    confirmPassword: Yup.string()
      .required(AUTH_FORM_ERROR_MESSAGES.EMU016)
      .oneOf([Yup.ref('newPassword')], AUTH_FORM_ERROR_MESSAGES.EMU017),
  }),
};
export default validatorSchema;
