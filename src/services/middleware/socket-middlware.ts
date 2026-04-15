import type {
  ActionCreatorWithoutPayload,
  ActionCreatorWithPayload,
} from '@reduxjs/toolkit';
import type { Middleware } from 'redux';

import type { RootState } from '@services/store.ts';

export const FEED_URL = 'wss://new-stellarburgers.education-services.ru/orders/all';

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

export const socketMiddleware = <R, S>(
  wsActions: WsActionsTypes<R, S>
): Middleware<object, RootState> => {
  return ({ dispatch }) => {
    let socket: WebSocket | null = null;
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
        socket = new WebSocket(action.payload);
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
            dispatch(onMessage(parsedData));
          } catch (e) {
            dispatch(onError((e as Error).message));
          }
        };

        socket.onclose = (): void => {
          onClose && dispatch(onClose());
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
        socket.close();
        socket = null;

        return;
      }

      next(action);
    };
  };
};
