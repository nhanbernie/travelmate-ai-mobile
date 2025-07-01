import { EndpointBuilder } from '@reduxjs/toolkit/query/react';
import { RegisterRequest, AuthResponse } from '../../api/types';
import { API_ENDPOINTS } from '../../api/config';

export const registerEndpoint = (builder: EndpointBuilder<any, any, any>) =>
  builder.mutation<AuthResponse, RegisterRequest>({
    query: (userData) => ({
      url: API_ENDPOINTS.AUTH.REGISTER,
      method: 'POST',
      body: userData,
    }),
    invalidatesTags: ['User', 'Auth'],
  });
