import { ENV } from "@/utils/env";

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: "/auth/login",
    REGISTER: "/auth/register",
    REFRESH: "/auth/refresh",
    LOGOUT: "/auth/logout",
    PROFILE: "/auth/profile",
    FORGOT_PASSWORD: "/auth/forgot-password",
    VERIFY_OTP: "/auth/verify-otp",
    RESET_PASSWORD: "/auth/reset-password",
    CHANGE_PASSWORD: "/auth/change-password",
    CREATE_OTP: "/auth/create-otp",
    GOOGLE_LOGIN: "/auth/google",
  },
  USER: {},
  TRAVEL: {},
  ITINERARY: {
    GENERATE: "/itinerary/generate",
    MY_ITINERARIES: "/itinerary/my-itineraries",
    DETAIL: "/itinerary", // Will append /{id}
  },
} as const;

export const API_CONFIG = {
  BASE_URL: ENV.API.BASE_URL,
  TIMEOUT: ENV.API.TIMEOUT,
} as const;
