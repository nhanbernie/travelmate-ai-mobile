import { combineReducers } from '@reduxjs/toolkit';
import { authReducer } from './slices';
import { authApi } from '../services/auth';

const appReducer = combineReducers({
  auth: authReducer,
  [authApi.reducerPath]: authApi.reducer,
});

export default appReducer;
