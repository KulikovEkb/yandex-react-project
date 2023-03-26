import {Middleware, MiddlewareAPI} from 'redux'
import {AppDispatch, TApplicationActions, TRootState} from "../../types";
import {TWsActions} from "./types/actions";

type TWsMessage =
  | { success: false; message: string }
  | { success: true; orders: []; total: number; totalToday: number }

const webSocketMiddleware = (url: string, wsActions: TWsActions): Middleware =>
  ((store: MiddlewareAPI<AppDispatch, TRootState>) => {
    let socket: WebSocket | null = null;

    return next => (action: TApplicationActions) => {
      const { dispatch, getState } = store;
      const { type, payload } = action;
      const { wsStart, wsStop, onOpen, onClose, onError, onMessage } = wsActions;

      if (action.type === wsActions.wsStart)
        socket = new WebSocket(url);

      if (socket) {
        socket.onopen = event => {
          dispatch({type: onOpen, payload: event});
        }

        socket.onerror = event => {
          dispatch({ type: onError, payload: event });
        }

        socket.onmessage = (event: MessageEvent<string>) => {
          // todo(kulikov): deal with token refresh
          const data = JSON.parse(event.data) as TWsMessage;

          dispatch({ type: onMessage, payload: data });
        }

        socket.onclose = event => {
          dispatch({ type: onClose, payload: event });
        }

        if (action.type === wsActions.wsStop)
          socket.close();
      }

      next(action);
    }
  }) as Middleware;

export default webSocketMiddleware;
