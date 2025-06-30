import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { authApi } from '../services/auth';
import { authReducer } from './slices';

export const store = configureStore({
  reducer: {
    // Auth slice
    auth: authReducer,
    // RTK Query APIs
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }).concat(
      // Add RTK Query middleware
      authApi.middleware
    ),
  devTools: __DEV__,
});

// Enable refetch on focus/reconnect for RTK Query
setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
