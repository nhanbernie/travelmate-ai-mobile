import { EndpointBuilder } from '@reduxjs/toolkit/query/react';
import { ForgotPasswordRequest, ApiResponse } from '../../api/types';

export const forgotPasswordEndpoint = (
  builder: EndpointBuilder<any, any, any>
) =>
  builder.mutation<ApiResponse<{ message: string }>, ForgotPasswordRequest>({
    query: (data) => ({
      url: '/auth/forgot-password',
      method: 'POST',
      body: data,
    }),
  });
