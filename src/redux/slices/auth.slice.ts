import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface User {
  id: string;
  email: string;
  username: string;
  avatar?: string;
  firstName?: string;
  lastName?: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  token: null,
  refreshToken: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Set loading state
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },

    // Set error
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
      state.isLoading = false;
    },

    // Clear error
    clearError: (state) => {
      state.error = null;
    },

    // Set credentials after successful login/register
    setCredentials: (
      state,
      action: PayloadAction<{
        user: User;
        access_token: string;
        refresh_token: string;
        expires_in?: number;
      }>
    ) => {
      const { user, access_token, refresh_token, expires_in } = action.payload;
      state.user = user;
      state.token = access_token;
      state.refreshToken = refresh_token;
      state.isAuthenticated = true;
      state.isLoading = false;
      state.error = null;
    },

    // Update token (for refresh) - support both formats
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },

    // Update refresh token
    setRefreshToken: (state, action: PayloadAction<string>) => {
      state.refreshToken = action.payload;
    },

    // Update both tokens (for refresh response)
    setTokens: (
      state,
      action: PayloadAction<{
        access_token: string;
        refresh_token: string;
        expires_in?: number;
      }>
    ) => {
      const { access_token, refresh_token } = action.payload;
      state.token = access_token;
      state.refreshToken = refresh_token;
    },

    // Update user profile
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },

    // Logout
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.refreshToken = null;
      state.isAuthenticated = false;
      state.isLoading = false;
      state.error = null;
    },

    // Reset auth state
    resetAuth: () => initialState,
  },
});

export const {
  setLoading,
  setError,
  clearError,
  setCredentials,
  setToken,
  setRefreshToken,
  setTokens,
  setUser,
  logout,
  resetAuth,
} = authSlice.actions;

export default authSlice.reducer;
