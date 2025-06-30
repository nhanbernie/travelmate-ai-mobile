import { EndpointBuilder } from '@reduxjs/toolkit/query/react';
import { RefreshTokenRequest, RefreshTokenResponse } from '../../api/types';
import { API_ENDPOINTS } from '../../api/config';

export const refreshTokenEndpoint = (builder: EndpointBuilder<any, any, any>) =>
  builder.mutation<RefreshTokenResponse, RefreshTokenRequest>({
    query: (data) => ({
      url: API_ENDPOINTS.AUTH.REFRESH,
      method: 'POST',
      body: data,
    }),
  });
