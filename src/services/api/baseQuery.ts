import {
  fetchBaseQuery,
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query/react';
import type { RootState } from '../../redux/store';
import { setTokens, logout } from '../../redux/slices/auth.slice';
import { BASE_URL, API_ENDPOINTS } from './config';

// Base query with interceptors
const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  prepareHeaders: (headers, { getState }) => {
    // Get token from Redux state
    const state = getState() as RootState;
    const token = (state as any).auth?.token;

    // Set default headers
    headers.set('Content-Type', 'application/json');
    headers.set('Accept', 'application/json');

    // Add authorization header if token exists
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }

    return headers;
  },
});

// Base query with refresh token interceptor
export const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  // First attempt
  let result = await baseQuery(args, api, extraOptions);

  // If unauthorized (401), try to refresh token
  if (result.error && result.error.status === 401) {
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
