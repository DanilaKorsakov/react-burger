import { createAsyncThunk } from '@reduxjs/toolkit';

import { setIsAuthChecked, setUser } from '@services/user/reducer.js';
import {
  register as registerApi,
  login as loginApi,
  logout as logoutApi,
  resetPassword as resetPasswordApi,
  getUser as getUserApi,
  changeUserData as changeUserDataApi,
} from '@utils/api.js';
import { isTokenExists } from '@utils/tokens.js';

export const register = createAsyncThunk('user/register', registerApi);

export const login = createAsyncThunk('user/login', loginApi);

export const logout = createAsyncThunk('user/logout', logoutApi);

export const resetPassword = createAsyncThunk('user/resetPassword', resetPasswordApi);

export const checkUserAuth = createAsyncThunk(
  'user/checkUserAuth',
  async (_, { dispatch }) => {
    try {
      if (isTokenExists()) {
        const response = await getUserApi();
        dispatch(setUser(response.user));
      }
    } finally {
      dispatch(setIsAuthChecked(true));
    }
  }
);

export const changeUserData = createAsyncThunk('user/changeUserData', changeUserDataApi);
