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
  code: string;
}

export interface ResetPasswordRequest {
  token: string;
  password: string;
  confirmPassword: string;
}

export interface RefreshTokenRequest {
  refreshToken: string;
}

export interface ChangePasswordRequest {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface AuthResponse {
  success: boolean;
  data: {
    user: {
      id: string;
      email: string;
      username: string;
      avatar?: string;
      firstName?: string;
      lastName?: string;
    };
    token: string;
    refreshToken: string;
  };
  message: string;
}

export interface ApiResponse<T = any> {
  success: boolean;
  data: T;
  message: string;
}

export interface ApiError {
  success: false;
  message: string;
  code?: string;
  details?: any;
}
