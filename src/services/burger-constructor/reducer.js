import { createSlice, nanoid } from '@reduxjs/toolkit';

const initialState = {
  bun: null,
  ingredients: [],
  order: 0,
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
        state.ingredients.push({ ...action.payload, order: state.order });
        state.order += 1;
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
    revertIngredientPlaces: (state, action) => {
      const { index, ingredient } = action.payload;
      state.ingredients.splice(index, 1);
      state.ingredients.splice(ingredient.order, 0, ingredient);
    },
    changeIngredientsOrder: (state) => {
      state.ingredients.map((ingredient, index) => {
        ingredient.order = index;
      });
    },
    deleteIngredients: (state) => {
      state.ingredients = [];
      state.bun = null;
      state.order = 0;
    },
  },
});

export const {
  addIngredient,
  addBun,
  deleteIngredient,
  changeIngredientPlace,
  deleteIngredients,
  revertIngredientPlaces,
  changeIngredientsOrder,
} = burgerConstructorSlice.actions;
export const { getPickedIngredients, getBun } = burgerConstructorSlice.selectors;
