import { EndpointBuilder } from '@reduxjs/toolkit/query/react';
import { ApiResponse } from '../../api/types';

export const createOtpEndpoint = (builder: EndpointBuilder<any, any, any>) =>
  builder.mutation<ApiResponse<{ message: string }>, { email: string }>({
    query: (data) => ({
      url: '/auth/create-otp',
      method: 'POST',
      body: data,
    }),
  });
