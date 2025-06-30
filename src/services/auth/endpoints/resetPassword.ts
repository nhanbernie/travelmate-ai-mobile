import { EndpointBuilder } from '@reduxjs/toolkit/query/react';
import { ResetPasswordRequest, ApiResponse } from '../../api/types';

export const resetPasswordEndpoint = (
  builder: EndpointBuilder<any, any, any>
) =>
  builder.mutation<ApiResponse<{ message: string }>, ResetPasswordRequest>({
    query: (data) => ({
      url: '/auth/reset-password',
      method: 'POST',
      body: data,
    }),
  });
