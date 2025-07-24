import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { authApi } from '../services/auth';
import { itineraryApi } from '../services/itinerary';
import { authReducer } from './slices';
import { itineraryReducer } from './slices/itinerary.slice';
import { apiErrorHandler } from '@/services/api/apiErrorHandler';

export const store = configureStore({
  reducer: {
    // Auth slice
    auth: authReducer,
    // Itinerary slice
    itinerary: itineraryReducer,
    // RTK Query APIs
    [authApi.reducerPath]: authApi.reducer,
    [itineraryApi.reducerPath]: itineraryApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }).concat(
      // Add RTK Query middleware
      authApi.middleware,
      itineraryApi.middleware,
      // Add our custom error handler middleware
      apiErrorHandler
    ),
  devTools: __DEV__,
});

// Enable refetch on focus/reconnect for RTK Query
setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
