import { refreshToken } from '@utils/tokens.ts';

import type {
  ActionCreatorWithoutPayload,
  ActionCreatorWithPayload,
} from '@reduxjs/toolkit';
import type { Middleware } from 'redux';

import type { RootState } from '@services/store.ts';

export const FEED_URL = 'wss://new-stellarburgers.education-services.ru/orders/all';

export const PROFILE_FEED_URL = `wss://new-stellarburgers.education-services.ru/orders?token=${localStorage.getItem('accessToken')?.replace('Bearer ', '')}`;

type WsActionsTypes<R, S> = {
  connect: ActionCreatorWithPayload<string>;
  disconnect: ActionCreatorWithoutPayload;
  onConnecting?: ActionCreatorWithoutPayload;
  onOpen?: ActionCreatorWithoutPayload;
  onClose?: ActionCreatorWithoutPayload;
  onError: ActionCreatorWithPayload<string>;
  onMessage: ActionCreatorWithPayload<R>;
  sendMessage?: ActionCreatorWithPayload<S>;
};

const RECONNECT_PERIOD = 3000;

export const socketMiddleware = <R, S>(
  wsActions: WsActionsTypes<R, S>,
  withTokenRefresh = false
): Middleware<object, RootState> => {
  return ({ dispatch }) => {
    let socket: WebSocket | null = null;
    let isConnected = false;
    let url = '';
    let reconnectTimer = 0;
    const {
      connect,
      disconnect,
      onConnecting,
      onOpen,
      onError,
      onClose,
      onMessage,
      sendMessage,
    } = wsActions;
    return (next) => (action) => {
      if (connect.match(action)) {
        url = action.payload;
        socket = new WebSocket(action.payload);
        isConnected = true;
        onConnecting && dispatch(onConnecting());

        socket.onopen = (): void => {
          onOpen && dispatch(onOpen());
        };

        socket.onerror = (): void => {
          dispatch(onError('Unknown error'));
        };

        socket.onmessage = (event): void => {
          try {
            const parsedData = JSON.parse(event.data);

            if (withTokenRefresh && parsedData.message === 'Invalid or missing token') {
              refreshToken().then((refreshData) => {
                const wssUrl = new URL(url);
                wssUrl.searchParams.set(
                  'token',
                  refreshData.accessToken.replace('Bearer ', '')
                );
                dispatch(connect(wssUrl.toString()));
              });

              dispatch(disconnect());

              return;
            }
            dispatch(onMessage(parsedData));
          } catch (e) {
            dispatch(onError((e as Error).message));
          }
        };

        socket.onclose = (): void => {
          onClose && dispatch(onClose());

          if (isConnected) {
            reconnectTimer = window.setTimeout(() => {
              dispatch(connect(url));
            }, RECONNECT_PERIOD);
          }
        };

        return;
      }

      if (socket && sendMessage?.match(action)) {
        try {
          const data = JSON.stringify(action.payload);
          socket.send(data);
        } catch (e) {
          dispatch(onError((e as Error).message));
        }

        return;
      }

      if (socket && disconnect.match(action)) {
        clearTimeout(reconnectTimer);
        reconnectTimer = 0;
        isConnected = false;
        socket.close();
        socket = null;

        return;
      }

      next(action);
    };
  };
};
