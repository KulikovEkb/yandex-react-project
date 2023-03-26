import {Middleware, MiddlewareAPI} from 'redux'
import {AppDispatch, TApplicationActions, TRootState} from "../../types";

type TOnMessage =
  | { success: false; message: string }
  | { success: true; orders: []; total: number; totalToday: number }

interface IWSActions {
  wsStart: string
  wsStop: string

  onOpen: (event: Event) => TApplicationActions
  onMessage: (event: MessageEvent) => TApplicationActions
  onError: (event: Event) => TApplicationActions
  onClose: (event: Event) => TApplicationActions
}

const WebSocketMiddleware = (WSActions: IWSActions): Middleware =>
  ((store: MiddlewareAPI<AppDispatch, TRootState>) => {
    let socket: WebSocket | null = null
    let wsUrl = ''

    return next => (action: TApplicationActions) => {
      const {dispatch} = store;

      if (action.type === WSActions.wsStart) {
        wsUrl = (action as { payload: string }).payload;

        socket = new WebSocket(wsUrl);
      }

      if (socket) {
        socket.onopen = event => {
          dispatch(WSActions.onOpen(event));
        }

        socket.onerror = event => {
          dispatch(WSActions.onError(event));
        }

        socket.onmessage = (event: MessageEvent<string>) => {
          const data = JSON.parse(event.data) as TOnMessage;

          if (!data.success && data.message === 'Invalid or missing token') {
            socket?.close();

            refreshTokens().then(() =>
              dispatch({type: action.type, payload: wsUrl,} as TApplicationActions));
          } else {
            dispatch(WSActions.onMessage(event));
          }
        }

        socket.onclose = event => {
          dispatch(WSActions.onClose(event));
        }

        if (action.type === WSActions.wsStop)
          socket.close();
      }

      next(action);
    }
  }) as Middleware;

export default WebSocketMiddleware;
