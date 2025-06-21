import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from '../store';

export const selectAuth = (state: RootState) => state.auth;

export const selectIsAuthenticated = createSelector(
  [selectAuth],
  (auth) => auth.user !== null
);
