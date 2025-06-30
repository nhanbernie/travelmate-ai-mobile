import { EndpointBuilder } from '@reduxjs/toolkit/query/react';
import { ApiResponse, AuthResponse } from '../../api/types';

export const getMeEndpoint = (builder: EndpointBuilder<any, any, any>) =>
  builder.query<ApiResponse<AuthResponse['data']['user']>, void>({
    query: () => '/auth/profile',
    providesTags: ['User'],
  });
