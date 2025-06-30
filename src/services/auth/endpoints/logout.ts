import { EndpointBuilder } from '@reduxjs/toolkit/query/react';
import { ApiResponse } from '../../api/types';

export const logoutEndpoint = (builder: EndpointBuilder<any, any, any>) =>
  builder.mutation<ApiResponse<{ message: string }>, void>({
    query: () => ({
      url: '/auth/logout',
      method: 'POST',
    }),
    invalidatesTags: ['User', 'Auth'],
  });
