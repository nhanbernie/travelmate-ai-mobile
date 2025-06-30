import { EndpointBuilder } from '@reduxjs/toolkit/query/react';
import { VerifyOTPRequest, ApiResponse } from '../../api/types';

export const verifyOtpEndpoint = (builder: EndpointBuilder<any, any, any>) =>
  builder.mutation<ApiResponse<{ token: string }>, VerifyOTPRequest>({
    query: (data) => ({
      url: '/auth/verify-otp',
      method: 'POST',
      body: data,
    }),
  });
