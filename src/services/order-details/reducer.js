import { createSlice } from '@reduxjs/toolkit';

import { createOrder } from '@services/order-details/actions.js';

const initialState = {
  name: '',
  order: {},
  error: null,
  loading: false,
};

export const orderDetailsSlice = createSlice({
  name: 'orderDetails',
  initialState,
  selectors: {
    getOrder: (state) => state.order,
    getOrderError: (state) => state.error,
    getOrderLoading: (state) => state.loading,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.order = action.payload.order;
        state.name = action.payload.name;
        state.loading = false;
        state.error = null;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.error = action.error?.message ?? 'Unknown error';
        state.loading = false;
      });
  },
});

export const { getOrder, getOrderError, getOrderLoading } = orderDetailsSlice.selectors;
