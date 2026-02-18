import { createSlice } from '@reduxjs/toolkit';

import { createOrder } from '@services/order-details/actions.js';

const initialState = {
  name: '',
  order: {},
  error: null,
  loading: false,
};

export const orderDetails = createSlice({
  name: 'orderDetails',
  initialState,
  selectors: {
    getOrder: (state) => state.order,
    getOrderError: (state) => state.error,
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
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.error = action.error?.message ?? 'Unknown error';
      });
  },
});

export const { getOrder, getOrderError } = orderDetails.selectors;
