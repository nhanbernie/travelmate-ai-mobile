import { createAsyncThunk } from '@reduxjs/toolkit';

export const loginUser = createAsyncThunk<
  any,
  { rejectValue: { error: string } }
>('auth/login', async (credentials, { rejectWithValue }) => {
  try {
    // const result = await authApi.login(credentials);
    // return result;
  } catch (error) {
    return rejectWithValue;
  }
});

export const logoutUser = createAsyncThunk('auth/logout', async () => {
  return true;
});
