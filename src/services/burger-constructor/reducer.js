import { createSlice, nanoid } from '@reduxjs/toolkit';

const initialState = {
  bun: null,
  ingredients: [],
};

export const burgerConstructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  selectors: {
    getPickedIngredients: (state) => state.ingredients,
    getBun: (state) => state.bun,
  },
  reducers: {
    addIngredient: {
      reducer: (state, action) => {
        state.ingredients.push(action.payload);
      },
      prepare: (ingredient) => {
        return {
          payload: { ...ingredient, key: nanoid() },
        };
      },
    },
    addBun: {
      reducer: (state, action) => {
        state.bun = action.payload;
      },
      prepare: (ingredient) => {
        return { payload: { ...ingredient, key: nanoid() } };
      },
    },
    deleteIngredient: (state, action) => {
      state.ingredients = state.ingredients.filter(
        (ingredient) => ingredient.key !== action.payload
      );
    },
    changeIngredientPlace: (state, action) => {
      const { sourceIndex, destinationIndex, ingredient } = action.payload;
      state.ingredients.splice(sourceIndex, 1);
      state.ingredients.splice(destinationIndex, 0, ingredient);
    },
    deleteIngredients: (state) => {
      state.ingredients = [];
      state.bun = null;
    },
  },
});

export const {
  addIngredient,
  addBun,
  deleteIngredient,
  changeIngredientPlace,
  deleteIngredients,
} = burgerConstructorSlice.actions;
export const { getPickedIngredients, getBun } = burgerConstructorSlice.selectors;
