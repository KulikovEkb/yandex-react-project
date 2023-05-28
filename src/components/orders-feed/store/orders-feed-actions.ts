export const ORDERS_FEED_CONNECTION_START: 'ORDERS_FEED_CONNECTION_START' = 'ORDERS_FEED_CONNECTION_START';
export const ORDERS_FEED_CONNECTION_STOP: 'ORDERS_FEED_CONNECTION_STOP' = 'ORDERS_FEED_CONNECTION_STOP';
export const ORDERS_FEED_CONNECTION_SUCCESS: 'ORDERS_FEED_CONNECTION_SUCCESS' = 'ORDERS_FEED_CONNECTION_SUCCESS';
export const ORDERS_FEED_CONNECTION_CLOSED: 'ORDERS_FEED_CONNECTION_CLOSED' = 'ORDERS_FEED_CONNECTION_CLOSED';
export const ORDERS_FEED_CONNECTION_ERROR: 'ORDERS_FEED_CONNECTION_ERROR' = 'ORDERS_FEED_CONNECTION_ERROR';
export const ORDERS_FEED_GET_MESSAGE: 'ORDERS_FEED_GET_MESSAGE' = 'ORDERS_FEED_GET_MESSAGE';
export const ORDERS_FEED_SEND_MESSAGE: 'ORDERS_FEED_SEND_MESSAGE' = 'ORDERS_FEED_SEND_MESSAGE';

interface IStartOrdersFeedConnectionAction {
  readonly type: typeof ORDERS_FEED_CONNECTION_START;
  readonly endpoint: string;
}

interface IStopOrdersFeedConnectionAction {
  readonly type: typeof ORDERS_FEED_CONNECTION_STOP;
}

export interface IConnectOrdersFeedWebSocketSuccessAction {
  readonly type: typeof ORDERS_FEED_CONNECTION_SUCCESS;
}

export interface IConnectOrdersFeedWebSocketClosedAction {
  readonly type: typeof ORDERS_FEED_CONNECTION_CLOSED;
}

export interface IOrdersFeedWebSocketErrorAction {
  readonly type: typeof ORDERS_FEED_CONNECTION_ERROR;
  readonly error: Event;
}

export interface IGetOrdersFeedMessageAction {
  readonly type: typeof ORDERS_FEED_GET_MESSAGE;
  readonly message: string;
}

export interface ISendOrdersFeedMessageAction {
  readonly type: typeof ORDERS_FEED_SEND_MESSAGE;
}

export type TOrdersFeedActions =
  | IStartOrdersFeedConnectionAction
  | IStopOrdersFeedConnectionAction
  | IConnectOrdersFeedWebSocketSuccessAction
  | IConnectOrdersFeedWebSocketClosedAction
  | IOrdersFeedWebSocketErrorAction
  | IGetOrdersFeedMessageAction
  | ISendOrdersFeedMessageAction;

export function startOrdersFeedConnectionAction(): IStartOrdersFeedConnectionAction {
  return {type: ORDERS_FEED_CONNECTION_START, endpoint: 'wss://norma.nomoreparties.space/orders/all'};
}

export function stopOrdersFeedConnectionAction(): IStopOrdersFeedConnectionAction {
  return {type: ORDERS_FEED_CONNECTION_STOP};
}

export function connectOrdersFeedWebSocketSuccessAction(): IConnectOrdersFeedWebSocketSuccessAction {
  return {type: ORDERS_FEED_CONNECTION_SUCCESS};
}

export function connectOrdersFeedWebSocketClosedAction(): IConnectOrdersFeedWebSocketClosedAction {
  return {type: ORDERS_FEED_CONNECTION_CLOSED};
}

export function ordersFeedWebSocketErrorAction(error: Event): IOrdersFeedWebSocketErrorAction {
  return {type: ORDERS_FEED_CONNECTION_ERROR, error};
}

export function getOrdersFeedMessageAction(message: string): IGetOrdersFeedMessageAction {
  return {type: ORDERS_FEED_GET_MESSAGE, message};
}
