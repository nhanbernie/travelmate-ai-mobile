// API Types
export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface VerifyOTPRequest {
  email: string;
  otp: string;
}

export interface ResetPasswordRequest {
  email: string;
  otp: string;
  newPassword: string;
}

export interface RefreshTokenRequest {
  refresh_token: string;
}

export interface ChangePasswordRequest {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}

// User interface matching API response
export interface User {
  id: string;
  username: string;
  email: string;
  roles: string[];
  firstName?: string;
  lastName?: string;
  createdAt: string;
  updatedAt: string;
  avatar?: string;
}

// Auth response for login - matching actual API
export interface AuthResponse {
  success: boolean;
  data: {
    access_token: string;
    refresh_token: string;
    expires_in: number;
    user: User;
  };
  message: string;
  statusCode: number;
  timestamp: string;
}

// Refresh token response - matching actual API
export interface RefreshTokenResponse {
  success: boolean;
  data: {
    access_token: string;
    refresh_token: string;
    expires_in: number;
  };
  message: string;
  statusCode: number;
  timestamp: string;
}

// Generic API response
export interface ApiResponse<T = any> {
  success: boolean;
  data: T;
  message: string;
  statusCode: number;
  timestamp: string;
}

export interface ApiError {
  success: false;
  message: string;
  statusCode: number;
  timestamp: string;
  code?: string;
  details?: any;
}
