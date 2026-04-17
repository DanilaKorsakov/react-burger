import { createAction } from '@reduxjs/toolkit';

export const wsProfileConnect = createAction<string, 'profileFeed/wsProfileConnect'>(
  'profileFeed/wsProfileConnect'
);

export const wsProfileDisconnect = createAction('profileFeed/wsProfileDisconnect');
