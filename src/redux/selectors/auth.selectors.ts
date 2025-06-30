import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from '../store';

// Base selector for auth state
const selectAuth = (state: RootState) => state.auth;

// Memoized selectors
export const selectUser = createSelector([selectAuth], (auth) => auth.user);

export const selectToken = createSelector([selectAuth], (auth) => auth.token);

export const selectRefreshToken = createSelector(
  [selectAuth],
  (auth) => auth.refreshToken
);

export const selectIsAuthenticated = createSelector(
  [selectAuth],
  (auth) => auth.isAuthenticated
);

export const selectIsLoading = createSelector(
  [selectAuth],
  (auth) => auth.isLoading
);

export const selectAuthError = createSelector(
  [selectAuth],
  (auth) => auth.error
);

// Compound selectors
export const selectUserProfile = createSelector([selectUser], (user) =>
  user
    ? {
        id: user.id,
        username: user.username,
        email: user.email,
        avatar: user.avatar,
        fullName:
          user.firstName && user.lastName
            ? `${user.firstName} ${user.lastName}`
            : user.username,
      }
    : null
);

export const selectAuthStatus = createSelector(
  [selectIsAuthenticated, selectIsLoading, selectAuthError],
  (isAuthenticated, isLoading, error) => ({
    isAuthenticated,
    isLoading,
    hasError: !!error,
    error,
  })
);
