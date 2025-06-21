import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
  },
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // .addCase(loginUser.pending, (state) => {
      //   state.loading = true;
      //   state.error = null;
      // })
      // .addCase(loginUser.fulfilled, (state, action) => {
      //   state.loading = false;
      //   state.isAuthenticated = true;
      //   state.lastUpdated = Date.now();
      // })
      // .addCase(loginUser.rejected, (state, action) => {
      //   state.loading = false;
      //   state.error = action.payload?.error || 'Login failed';
      //   state.isAuthenticated = false;
      // })
      // .addCase(logoutUser.fulfilled, (state) => {
      //   state.isAuthenticated = false;
      //   state.data = null;
      //   state.error = null;
      //   state.lastUpdated = Date.now();
      // });
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
