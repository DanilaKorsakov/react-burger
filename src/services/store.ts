import { combineSlices, configureStore } from '@reduxjs/toolkit';

import { burgerConstructorSlice } from '@services/burger-constructor/reducer.js';
import { ingredientsSlice } from '@services/ingredients/reducer.js';
import { orderDetailsSlice } from '@services/order-details/reducer.js';
import { userSlice } from '@services/user/reducer.js';

const rootReducer = combineSlices(
  ingredientsSlice,
  burgerConstructorSlice,
  orderDetailsSlice,
  userSlice
);

export const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
