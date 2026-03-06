import { createAsyncThunk } from '@reduxjs/toolkit';

import { createOrder as createOrderApi } from '@utils/api.js';

export const createOrder = createAsyncThunk('orderDetails/createOrder', createOrderApi);
