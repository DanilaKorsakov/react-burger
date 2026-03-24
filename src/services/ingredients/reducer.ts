import { createSlice } from '@reduxjs/toolkit';

import { loadIngredients } from '@services/ingredients/actions.js';

import type { TIngredient } from '@utils/types.ts';

type IngredientsState = {
  ingredients: TIngredient[];
  loading: boolean;
  error: null | string;
};

const initialState: IngredientsState = {
  ingredients: [],
  loading: false,
  error: null,
};

export const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  selectors: {
    getIngredients: (state) => state.ingredients,
    getIngredientsError: (state) => state.error,
    getIngredientsLoading: (state) => state.loading,
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadIngredients.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadIngredients.fulfilled, (state, action) => {
        state.loading = false;
        state.ingredients = action.payload;
      })
      .addCase(loadIngredients.rejected, (state, action) => {
        state.error = action.error?.message ?? 'Unknown error';
      });
  },
});

export const { getIngredients, getIngredientsError, getIngredientsLoading } =
  ingredientsSlice.selectors;
