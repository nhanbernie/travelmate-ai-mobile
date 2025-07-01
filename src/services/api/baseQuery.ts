import {
  fetchBaseQuery,
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query/react';
import type { RootState } from '@/redux/store';
import { setTokens, logout } from '@/slices/auth.slice';
import { API_CONFIG, API_ENDPOINTS } from './config';

const PUBLIC_ENDPOINTS = [
  API_ENDPOINTS.AUTH.LOGIN,
  API_ENDPOINTS.AUTH.REGISTER,
  API_ENDPOINTS.AUTH.FORGOT_PASSWORD,
  API_ENDPOINTS.AUTH.VERIFY_OTP,
  API_ENDPOINTS.AUTH.RESET_PASSWORD,
  API_ENDPOINTS.AUTH.CREATE_OTP,
];

const getUrlFromArgs = (arg: any) => {
  if (typeof arg === 'string') return arg;
  if (typeof arg === 'object' && arg.url) return arg.url;
  return '';
};

// Base query with interceptors
const baseQuery = fetchBaseQuery({
  baseUrl: API_CONFIG.BASE_URL,
  prepareHeaders: (headers, { getState, ...rest }) => {
    const url = getUrlFromArgs(rest.arg);
    const isPublic = PUBLIC_ENDPOINTS.some((ep) => url.includes(ep));
    if (!isPublic) {
      const state = getState() as RootState;
      const token = (state as any).auth?.token;
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
    }
    headers.set('Content-Type', 'application/json');
    headers.set('Accept', 'application/json');
    return headers;
  },
});

// Base query with refresh token interceptor
export const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  // Determine if this is a public endpoint
  const url = typeof args === 'string' ? args : args.url;
  const isPublic = PUBLIC_ENDPOINTS.some((ep) => url.includes(ep));
  let result = await baseQuery(args, api, extraOptions);

  // If unauthorized (401), try to refresh token
  if (!isPublic && result.error && result.error.status === 401) {
    console.log('Token expired, attempting refresh...');

    const refreshToken = ((api.getState() as any).auth as any)?.refreshToken;

    if (refreshToken) {
      // Attempt to refresh token using correct API format
      const refreshResult = await baseQuery(
        {
          url: API_ENDPOINTS.AUTH.REFRESH,
          method: 'POST',
          body: { refresh_token: refreshToken }, // Match API expected format
        },
        api,
        extraOptions
      );

      if (refreshResult.data) {
        // Extract access_token from API response format
        const responseData = refreshResult.data as any;
        const newAccessToken = responseData.data?.access_token;
        const newRefreshToken = responseData.data?.refresh_token;

        if (newAccessToken) {
          // Update both tokens in store
          api.dispatch(
            setTokens({
              access_token: newAccessToken,
              refresh_token: newRefreshToken || refreshToken, // Use new refresh token or keep existing one
              expires_in: responseData.data?.expires_in,
            })
          );

          // Retry original request with new token
          result = await baseQuery(args, api, extraOptions);
        } else {
          console.log('Invalid refresh response format, logging out...');
          api.dispatch(logout());
        }
      } else {
        // Refresh failed, logout user
        console.log('Refresh token failed, logging out...');
        api.dispatch(logout());
      }
    } else {
      // No refresh token, logout user
      api.dispatch(logout());
    }
  }

  return result;
};
