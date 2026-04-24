import { createSlice, type PayloadAction, type SerializedError } from '@reduxjs/toolkit';

import {
  register,
  login,
  logout,
  resetPassword,
  changeUserData,
} from '@services/user/actions.js';

import type { TUser } from '@utils/types.ts';

type UserState = {
  user: null | TUser;
  loading: boolean;
  error: null | string;
  isAuthChecked: boolean;
  isPasswordReset: boolean;
};

export const initialState: UserState = {
  user: null,
  loading: false,
  error: null,
  isAuthChecked: false,
  isPasswordReset: false,
};

const userActionPrefixes: string[] = [
  register.typePrefix,
  login.typePrefix,
  logout.typePrefix,
  resetPassword.typePrefix,
  changeUserData.typePrefix,
];

export const userSlice = createSlice({
  name: 'user',
  initialState,
  selectors: {
    getUserData: (state) => state.user,
    getLoading: (state) => state.loading,
    getError: (state) => state.error,
    getIsPasswordReset: (state) => state.isPasswordReset,
    getIsAuthChecked: (state) => state.isAuthChecked,
  },
  reducers: {
    setIsPasswordReset: (state, action: PayloadAction<boolean>) => {
      state.isPasswordReset = action.payload;
    },
    setError: (state, action: PayloadAction<null | string>) => {
      state.error = action.payload;
    },
    setIsAuthChecked: (state, action: PayloadAction<boolean>) => {
      state.isAuthChecked = action.payload;
    },
    setUser: (state, action: PayloadAction<TUser>) => {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
        state.error = null;
        state.isAuthChecked = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
        state.error = null;
        state.isAuthChecked = true;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.loading = false;
        state.error = null;
      })
      .addCase(resetPassword.fulfilled, (state) => {
        state.loading = false;
        state.isPasswordReset = true;
        state.error = null;
      })
      .addCase(changeUserData.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.user = action.payload;
      })
      .addMatcher(
        (action) =>
          userActionPrefixes.some((prefix) => action.type.startsWith(prefix)) &&
          action.type.endsWith('/pending'),
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )
      .addMatcher(
        (action) =>
          userActionPrefixes.some((prefix) => action.type.startsWith(prefix)) &&
          action.type.endsWith('/rejected'),
        (state, action) => {
          state.loading = false;
          const rejectedAction = action as { error?: SerializedError };
          state.error = rejectedAction.error?.message ?? 'Unknown error';
        }
      );
  },
});

export const { setIsPasswordReset, setError, setUser, setIsAuthChecked } =
  userSlice.actions;

export const {
  getLoading,
  getError,
  getUserData,
  getIsPasswordReset,
  getIsAuthChecked,
} = userSlice.selectors;
