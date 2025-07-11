import { EndpointBuilder } from '@reduxjs/toolkit/query/react';
import { ApiResponse, LogoutRequest } from '../../api/types';

export const logoutEndpoint = (builder: EndpointBuilder<any, any, any>) =>
  builder.mutation<ApiResponse, LogoutRequest>({
    query: (logoutData) => ({
      url: '/auth/logout',
      method: 'POST',
      body: logoutData,
    }),
    invalidatesTags: ['User', 'Auth'],
    transformResponse: (response: ApiResponse) => {
      return response;
    },
    transformErrorResponse: (response: any) => {
      console.error('Logout error:', response);
      return response;
    },
  });
