import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "../api/baseQuery";
import {
  getMeEndpoint,
  loginEndpoint,
  registerEndpoint,
  refreshTokenEndpoint,
  createOtpEndpoint,
  verifyOtpEndpoint,
  forgotPasswordEndpoint,
  resetPasswordEndpoint,
  changePasswordEndpoint,
  logoutEndpoint,
  googleLoginEndpoint,
} from "./endpoints";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["User", "Auth"],
  endpoints: (builder) => ({
    getMe: getMeEndpoint(builder),
    login: loginEndpoint(builder),
    register: registerEndpoint(builder),
    refreshToken: refreshTokenEndpoint(builder),
    createOtp: createOtpEndpoint(builder),
    verifyOtp: verifyOtpEndpoint(builder),
    forgotPassword: forgotPasswordEndpoint(builder),
    resetPassword: resetPasswordEndpoint(builder),
    changePassword: changePasswordEndpoint(builder),
    logout: logoutEndpoint(builder),
    googleLogin: googleLoginEndpoint(builder),
  }),
});

export const {
  useGetMeQuery,
  useLoginMutation,
  useRegisterMutation,
  useRefreshTokenMutation,
  useCreateOtpMutation,
  useVerifyOtpMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useChangePasswordMutation,
  useLogoutMutation,
  useGoogleLoginMutation,
} = authApi;
