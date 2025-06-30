import {
  fetchBaseQuery,
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query/react';

// Base URL configuration
const BASE_URL = __DEV__
  ? 'http://localhost:3000/api/v1' // Development
  : 'https://your-production-api.com/api/v1'; // Production

// Base query with headers preparation
export const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  prepareHeaders: (headers, { getState }) => {
    // Get token from Redux state
    const state = getState() as any;
    const token = state?.auth?.token;

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

    const state = api.getState() as any;
    const refreshToken = state?.auth?.refreshToken;

    if (refreshToken) {
      // Attempt to refresh token
      const refreshResult = await baseQuery(
        {
          url: '/auth/refresh',
          method: 'POST',
          body: { refreshToken },
        },
        api,
        extraOptions
      );

      if (refreshResult.data) {
        const newToken = (refreshResult.data as any).data.token;
        // Update token in store using dispatch
        api.dispatch({ type: 'auth/setToken', payload: newToken });

        // Retry original request with new token
        result = await baseQuery(args, api, extraOptions);
      } else {
        // Refresh failed, logout user
        console.log('Refresh token failed, logging out...');
        api.dispatch({ type: 'auth/logout' });
      }
    } else {
      // No refresh token, logout user
      api.dispatch({ type: 'auth/logout' });
    }
  }

  return result;
};
