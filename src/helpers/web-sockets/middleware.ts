import {Middleware, MiddlewareAPI} from 'redux'
import {AppDispatch, TApplicationActions, TRootState} from "../../types";
import {TWsActions} from "./types/actions";

const webSocketMiddleware = (wsActions: TWsActions): Middleware =>
  ((store: MiddlewareAPI<AppDispatch, TRootState>) => {
    let socket: WebSocket | null = null;

    return next => (action: TApplicationActions) => {
      const { dispatch} = store;

      if (action.type === wsActions.wsStart)
        socket = new WebSocket((action as { endpoint: string }).endpoint);

      if (socket) {
        socket.onopen = () => dispatch(wsActions.onOpen())

        socket.onerror = event => dispatch(wsActions.onError(event))

        socket.onmessage = (event: MessageEvent<string>) => {
          // todo(kulikov): deal with token refresh
          dispatch(wsActions.onMessage(event.data));
        }

        socket.onclose = () => dispatch(wsActions.onClose())

        if (action.type === wsActions.wsStop)
          socket.close();
      }

      next(action);
    }
  }) as Middleware;

export default webSocketMiddleware;
