import {applyMiddleware, createStore} from 'redux';
import thunk from 'redux-thunk';
import {compose} from 'redux';
import {rootReducer} from "./root-reducer";
import webSocketMiddleware from "../helpers/web-sockets/middleware";
import {
  connectOrdersFeedWebSocketClosedAction,
  connectOrdersFeedWebSocketSuccessAction,
  getOrdersFeedMessageAction,
  ordersFeedWebSocketErrorAction,
  ORDERS_FEED_CONNECTION_START,
  ORDERS_FEED_CONNECTION_STOP,
} from "../components/orders-feed/store/orders-feed-actions";
import {
  connectUserOrdersFeedWebSocketClosedAction,
  connectUserOrdersFeedWebSocketSuccessAction,
  getUserOrdersFeedMessageAction,
  userOrdersFeedWebSocketErrorAction,
  USER_ORDERS_FEED_CONNECTION_START,
  USER_ORDERS_FEED_CONNECTION_STOP,
} from "../components/user-orders-feed/store/user-orders-feed-actions";

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
    onOpen: connectOrdersFeedWebSocketSuccessAction,
    onClose: connectOrdersFeedWebSocketClosedAction,
    onError: ordersFeedWebSocketErrorAction,
    onMessage: getOrdersFeedMessageAction,
  }),
  webSocketMiddleware({
    wsStart: USER_ORDERS_FEED_CONNECTION_START,
    wsStop: USER_ORDERS_FEED_CONNECTION_STOP,
    onOpen: connectUserOrdersFeedWebSocketSuccessAction,
    onClose: connectUserOrdersFeedWebSocketClosedAction,
    onError: userOrdersFeedWebSocketErrorAction,
    onMessage: getUserOrdersFeedMessageAction,
  }),
));

// todo(kulikov): replace with configureStore
export const store = createStore(rootReducer, enhancer);
