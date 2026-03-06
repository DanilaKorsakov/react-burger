import { createAsyncThunk } from '@reduxjs/toolkit';

import { getIngredients } from '@utils/api.js';

export const loadIngredients = createAsyncThunk(
  'ingredients/getIngredients',
  getIngredients
);
