import { EndpointBuilder } from '@reduxjs/toolkit/query/react';
import { ChangePasswordRequest, ApiResponse } from '../../api/types';

export const changePasswordEndpoint = (
  builder: EndpointBuilder<any, any, any>
) =>
  builder.mutation<ApiResponse<{ message: string }>, ChangePasswordRequest>({
    query: (data) => ({
      url: '/auth/change-password',
      method: 'POST',
      body: data,
    }),
  });
