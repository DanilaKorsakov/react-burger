import { combineSlices, configureStore } from '@reduxjs/toolkit';

import { burgerConstructorSlice } from '@services/burger-constructor/reducer.js';
import { wsConnect, wsDisconnect } from '@services/feed/actions.ts';
import { feedSlice, onConnecting, onError, onMessage } from '@services/feed/reducer.ts';
import { ingredientsSlice } from '@services/ingredients/reducer.js';
import { socketMiddleware } from '@services/middleware/socket-middlware.ts';
import { orderDetailsSlice } from '@services/order-details/reducer.js';
import {
  wsProfileConnect,
  wsProfileDisconnect,
} from '@services/profile-feed/actions.ts';
import {
  onProfileConnecting,
  onProfileError,
  onProfileMessage,
  profileFeedSlice,
} from '@services/profile-feed/reducer.ts';
import { userSlice } from '@services/user/reducer.js';

const rootReducer = combineSlices(
  ingredientsSlice,
  burgerConstructorSlice,
  orderDetailsSlice,
  userSlice,
  feedSlice,
  profileFeedSlice
);

const feedMiddleware = socketMiddleware({
  connect: wsConnect,
  disconnect: wsDisconnect,
  onError,
  onConnecting,
  onMessage,
});

const profileFeedMiddleware = socketMiddleware({
  connect: wsProfileConnect,
  disconnect: wsProfileDisconnect,
  onError: onProfileError,
  onConnecting: onProfileConnecting,
  onMessage: onProfileMessage,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddlewares) => {
    return getDefaultMiddlewares().concat(feedMiddleware, profileFeedMiddleware);
  },
  devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
