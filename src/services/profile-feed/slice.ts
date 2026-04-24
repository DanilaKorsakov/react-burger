import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import type { TFeedOrders } from '@utils/types.ts';

export type ProfileFeedState = {
  orders: Omit<TFeedOrders, 'success'>;
  error: string | null;
  isLoading: boolean;
};

export const initialState: ProfileFeedState = {
  orders: {
    orders: [],
    total: 0,
    totalToday: 0,
  },
  error: null,
  isLoading: false,
};

export const profileFeedSlice = createSlice({
  name: 'profileFeed',
  initialState,
  reducers: {
    onProfileConnecting: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    onProfileError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    onProfileMessage: (state, action: PayloadAction<TFeedOrders>) => {
      state.orders = action.payload;
      state.isLoading = false;
    },
  },
  selectors: {
    getProfileOrders: (state) => state.orders,
  },
});

export const { getProfileOrders } = profileFeedSlice.selectors;
export const { onProfileError, onProfileMessage, onProfileConnecting } =
  profileFeedSlice.actions;
