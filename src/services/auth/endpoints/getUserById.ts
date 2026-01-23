import { EndpointBuilder } from "@reduxjs/toolkit/query/react";
import { ApiResponse, AuthResponse } from "../../api/types";

export const getUserByIdEndpoint = (builder: EndpointBuilder<any, any, any>) =>
  builder.query<ApiResponse<AuthResponse["data"]["user"]>, string>({
    query: (userId) => `/users/${userId}`,
    providesTags: (result, error, userId) => [{ type: "User", id: userId }],
  });
