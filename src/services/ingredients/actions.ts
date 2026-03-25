import { createAsyncThunk } from '@reduxjs/toolkit';

import { getIngredients } from '@utils/api.ts';

export const loadIngredients = createAsyncThunk(
  'ingredients/getIngredients',
  getIngredients
);
