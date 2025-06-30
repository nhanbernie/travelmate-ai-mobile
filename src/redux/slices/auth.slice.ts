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
        token: string;
        refreshToken?: string;
      }>
    ) => {
      const { user, token, refreshToken } = action.payload;
      state.user = user;
      state.token = token;
      state.refreshToken = refreshToken || null;
      state.isAuthenticated = true;
      state.isLoading = false;
      state.error = null;
    },

    // Update token (for refresh)
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
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
  setUser,
  logout,
  resetAuth,
} = authSlice.actions;

export default authSlice.reducer;
