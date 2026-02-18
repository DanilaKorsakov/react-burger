import { createAsyncThunk } from '@reduxjs/toolkit';

import { createOrder as createOrderApi } from '@utils/ingredients-api.js';

export const createOrder = createAsyncThunk(
  'orderDetails/createOrder',
  async (ingredients) => {
    return createOrderApi(ingredients);
  }
);
