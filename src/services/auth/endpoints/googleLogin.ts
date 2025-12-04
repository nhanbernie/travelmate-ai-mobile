import { EndpointBuilder } from "@reduxjs/toolkit/query/react";
import { GoogleLoginRequest, AuthResponse } from "../../api/types";
import { API_ENDPOINTS } from "../../api/config";

export const googleLoginEndpoint = (builder: EndpointBuilder<any, any, any>) =>
  builder.mutation<AuthResponse, GoogleLoginRequest>({
    query: (credentials) => ({
      url: API_ENDPOINTS.AUTH.GOOGLE_LOGIN,
      method: "POST",
      body: credentials,
    }),

    invalidatesTags: ["User", "Auth"],
    transformResponse: (response: AuthResponse) => {
      return response;
    },
    transformErrorResponse: (response: any) => {
      console.error("Google login error:", response);
      return response;
    },
  });
