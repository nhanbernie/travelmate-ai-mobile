// Environment configuration
export const ENV_CONFIG = {
  DEV: {
    // IMPORTANT: Replace this with your actual LAN IP address!
    API_BASE_URL: 'https://travelmate-ai-server-production.up.railway.app/',
  },
  PROD: {
    API_BASE_URL: 'https://your-production-api.com',
  },
} as const;

// Get current environment config
export const getCurrentEnvConfig = () => {
  return __DEV__ ? ENV_CONFIG.DEV : ENV_CONFIG.PROD;
};

// API endpoints
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    REFRESH: '/auth/refresh',
    LOGOUT: '/auth/logout',
    PROFILE: '/auth/profile',
    FORGOT_PASSWORD: '/auth/forgot-password',
    VERIFY_OTP: '/auth/verify-otp',
    RESET_PASSWORD: '/auth/reset-password',
    CHANGE_PASSWORD: '/auth/change-password',
    CREATE_OTP: '/auth/create-otp',
  },
  // Future endpoints
  USER: {
    // USER endpoints here
  },
  TRAVEL: {
    // TRAVEL endpoints here
  },
} as const;

// Export base URL
export const BASE_URL = getCurrentEnvConfig().API_BASE_URL;

console.log('[API CONFIG] BASE_URL:', BASE_URL);
