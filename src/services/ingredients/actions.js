import { createAsyncThunk } from '@reduxjs/toolkit';

import { getIngredients } from '@utils/ingredients-api.js';

export const loadIngredients = createAsyncThunk(
  'ingredients/getIngredients',
  async () => {
    return getIngredients();
  }
);
