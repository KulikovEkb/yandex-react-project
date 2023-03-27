import {applyMiddleware, createStore} from 'redux';
import thunk from 'redux-thunk';
import {compose} from 'redux';
import {rootReducer} from "./root-reducer";
import webSocketMiddleware from "../helpers/web-sockets/middleware";
import {
  ConnectOrdersFeedWebSocketClosedAction,
  ConnectOrdersFeedWebSocketSuccessAction,
  GetOrdersFeedMessageAction,
  OrdersFeedWebSocketErrorAction,
  ORDERS_FEED_CONNECTION_START,
  ORDERS_FEED_CONNECTION_STOP,
} from "../components/orders-feed/store/orders-feed-actions";

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

export const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const enhancer = composeEnhancers(applyMiddleware(
  thunk,
  webSocketMiddleware({
    wsStart: ORDERS_FEED_CONNECTION_START,
    wsStop: ORDERS_FEED_CONNECTION_STOP,
    onOpen: ConnectOrdersFeedWebSocketSuccessAction,
    onClose: ConnectOrdersFeedWebSocketClosedAction,
    onError: OrdersFeedWebSocketErrorAction,
    onMessage: GetOrdersFeedMessageAction,
  }),
  //webSocketMiddleware('wss://norma.nomoreparties.space/orders', {}),
));

// todo(kulikov): replace with configureStore
export const store = createStore(rootReducer, enhancer);
