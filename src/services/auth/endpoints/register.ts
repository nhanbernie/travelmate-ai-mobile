import { EndpointBuilder } from '@reduxjs/toolkit/query/react';
import { RegisterRequest, AuthResponse } from '../../api/types';

export const registerEndpoint = (builder: EndpointBuilder<any, any, any>) =>
  builder.mutation<AuthResponse, RegisterRequest>({
    query: (userData) => ({
      url: '/auth/register',
      method: 'POST',
      body: userData,
    }),
    invalidatesTags: ['User', 'Auth'],
  });
