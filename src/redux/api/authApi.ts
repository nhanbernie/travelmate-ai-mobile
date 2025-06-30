import { createApi, FetchBaseQueryError } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from './baseQuery';

// API Types
export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface VerifyOTPRequest {
  email: string;
  code: string;
}

export interface ResetPasswordRequest {
  token: string;
  password: string;
  confirmPassword: string;
}

export interface RefreshTokenRequest {
  refreshToken: string;
}

export interface AuthResponse {
  success: boolean;
  data: {
    user: {
      id: string;
      email: string;
      username: string;
      avatar?: string;
      firstName?: string;
      lastName?: string;
    };
    token: string;
    refreshToken: string;
  };
  message: string;
}

export interface ApiResponse<T = any> {
  success: boolean;
  data: T;
  message: string;
}

export interface ApiError {
  success: false;
  message: string;
  code?: string;
  details?: any;
}

// RTK Query API
export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['User', 'Auth'],
  endpoints: (builder) => ({
    // Login
    login: builder.mutation<AuthResponse, LoginRequest>({
      query: (credentials) => ({
        url: '/auth/login',
        method: 'POST',
        body: credentials,
      }),
      invalidatesTags: ['User', 'Auth'],
      transformResponse: (response: AuthResponse) => {
        console.log('Login response:', response);
        return response;
      },
      transformErrorResponse: (response: FetchBaseQueryError) => {
        console.error('Login error:', response);
        return response;
      },
    }),

    // Register
    register: builder.mutation<AuthResponse, RegisterRequest>({
      query: (userData) => ({
        url: '/auth/register',
        method: 'POST',
        body: userData,
      }),
      invalidatesTags: ['User', 'Auth'],
    }),

    // Forgot Password
    forgotPassword: builder.mutation<
      ApiResponse<{ message: string }>,
      ForgotPasswordRequest
    >({
      query: (data) => ({
        url: '/auth/forgot-password',
        method: 'POST',
        body: data,
      }),
    }),

    // Verify OTP
    verifyOTP: builder.mutation<
      ApiResponse<{ token: string }>,
      VerifyOTPRequest
    >({
      query: (data) => ({
        url: '/auth/verify-otp',
        method: 'POST',
        body: data,
      }),
    }),

    // Reset Password
    resetPassword: builder.mutation<
      ApiResponse<{ message: string }>,
      ResetPasswordRequest
    >({
      query: (data) => ({
        url: '/auth/reset-password',
        method: 'POST',
        body: data,
      }),
    }),

    // Refresh Token
    refreshToken: builder.mutation<
      ApiResponse<{ token: string }>,
      RefreshTokenRequest
    >({
      query: (data) => ({
        url: '/auth/refresh',
        method: 'POST',
        body: data,
      }),
    }),

    // Get User Profile
    getProfile: builder.query<ApiResponse<AuthResponse['data']['user']>, void>({
      query: () => '/auth/profile',
      providesTags: ['User'],
    }),

    // Update Profile
    updateProfile: builder.mutation<
      ApiResponse<AuthResponse['data']['user']>,
      Partial<AuthResponse['data']['user']>
    >({
      query: (data) => ({
        url: '/auth/profile',
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['User'],
    }),

    // Logout
    logout: builder.mutation<ApiResponse<{ message: string }>, void>({
      query: () => ({
        url: '/auth/logout',
        method: 'POST',
      }),
      invalidatesTags: ['User', 'Auth'],
    }),

    // Change Password
    changePassword: builder.mutation<
      ApiResponse<{ message: string }>,
      {
        oldPassword: string;
        newPassword: string;
        confirmPassword: string;
      }
    >({
      query: (data) => ({
        url: '/auth/change-password',
        method: 'POST',
        body: data,
      }),
    }),
  }),
});

// Export hooks for usage in components
export const {
  useLoginMutation,
  useRegisterMutation,
  useForgotPasswordMutation,
  useVerifyOTPMutation,
  useResetPasswordMutation,
  useRefreshTokenMutation,
  useGetProfileQuery,
  useUpdateProfileMutation,
  useLogoutMutation,
  useChangePasswordMutation,
} = authApi;
