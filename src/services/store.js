import { combineSlices, configureStore } from '@reduxjs/toolkit';

import { burgerConstructorSlice } from '@services/burger-constructor/reducer.js';
import { ingredientSlice } from '@services/ingredient/reducer.js';
import { ingredientsSlice } from '@services/ingredients/reducer.js';
import { orderDetails } from '@services/order-details/reducer.js';

const rootReducer = combineSlices(
  ingredientsSlice,
  ingredientSlice,
  burgerConstructorSlice,
  orderDetails
);

export const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production',
});
