import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import type { TFeedOrders } from '@utils/types.ts';

export type FeedState = {
  orders: Omit<TFeedOrders, 'success'>;
  error: string | null;
  isLoading: boolean;
};

export const initialState: FeedState = {
  orders: {
    orders: [],
    total: 0,
    totalToday: 0,
  },
  error: null,
  isLoading: false,
};

export const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {
    onConnecting: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    onError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    onMessage: (state, action: PayloadAction<TFeedOrders>) => {
      state.orders = action.payload;
      state.isLoading = false;
    },
  },
  selectors: {
    getOrders: (state) => state.orders,
    getLoading: (state) => state.isLoading,
  },
});

export const { getOrders, getLoading } = feedSlice.selectors;
export const { onError, onMessage, onConnecting } = feedSlice.actions;
