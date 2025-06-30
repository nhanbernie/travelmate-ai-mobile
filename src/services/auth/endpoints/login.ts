import { EndpointBuilder } from '@reduxjs/toolkit/query/react';
import { LoginRequest, AuthResponse } from '../../api/types';
import { API_ENDPOINTS } from '../../api/config';

export const loginEndpoint = (builder: EndpointBuilder<any, any, any>) =>
  builder.mutation<AuthResponse, LoginRequest>({
    query: (credentials) => ({
      url: API_ENDPOINTS.AUTH.LOGIN,
      method: 'POST',
      body: credentials,
    }),

    invalidatesTags: ['User', 'Auth'],
    transformResponse: (response: AuthResponse) => {
      console.log('Login response:', response);
      return response;
    },
    transformErrorResponse: (response: any) => {
      console.error('Login error:', response);
      return response;
    },
  });
