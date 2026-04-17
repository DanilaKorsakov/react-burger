import { createAction } from '@reduxjs/toolkit';

export const wsConnect = createAction<string, 'feed/wsConnect'>('feed/wsConnect');

export const wsDisconnect = createAction('feed/wsDisconnect');
