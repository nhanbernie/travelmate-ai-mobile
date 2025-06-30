import { EndpointBuilder } from '@reduxjs/toolkit/query/react';
import { RefreshTokenRequest, ApiResponse } from '../../api/types';

export const refreshTokenEndpoint = (builder: EndpointBuilder<any, any, any>) =>
  builder.mutation<ApiResponse<{ token: string }>, RefreshTokenRequest>({
    query: (data) => ({
      url: '/auth/refresh',
      method: 'POST',
      body: data,
    }),
  });
