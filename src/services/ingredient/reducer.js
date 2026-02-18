import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  ingredient: {},
};

export const ingredientSlice = createSlice({
  name: 'ingredient',
  initialState,
  selectors: {
    getIngredient: (state) => state.ingredient,
  },
  reducers: {
    getIngredientDetails: (state, action) => {
      state.ingredient = action.payload;
    },
    deleteIngredientDetails: (state) => {
      state.ingredient = {};
    },
  },
});

export const { getIngredientDetails, deleteIngredientDetails } = ingredientSlice.actions;
export const { getIngredient } = ingredientSlice.selectors;
