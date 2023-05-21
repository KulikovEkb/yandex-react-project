export const USER_ORDERS_FEED_CONNECTION_START: 'USER_ORDERS_FEED_CONNECTION_START' = 'USER_ORDERS_FEED_CONNECTION_START';
export const USER_ORDERS_FEED_CONNECTION_STOP: 'USER_ORDERS_FEED_CONNECTION_STOP' = 'USER_ORDERS_FEED_CONNECTION_STOP';
export const USER_ORDERS_FEED_CONNECTION_SUCCESS: 'USER_ORDERS_FEED_CONNECTION_SUCCESS' = 'USER_ORDERS_FEED_CONNECTION_SUCCESS';
export const USER_ORDERS_FEED_CONNECTION_CLOSED: 'USER_ORDERS_FEED_CONNECTION_CLOSED' = 'USER_ORDERS_FEED_CONNECTION_CLOSED';
export const USER_ORDERS_FEED_CONNECTION_ERROR: 'USER_ORDERS_FEED_CONNECTION_ERROR' = 'USER_ORDERS_FEED_CONNECTION_ERROR';
export const USER_ORDERS_FEED_GET_MESSAGE: 'USER_ORDERS_FEED_GET_MESSAGE' = 'USER_ORDERS_FEED_GET_MESSAGE';
export const USER_ORDERS_FEED_SEND_MESSAGE: 'USER_ORDERS_FEED_SEND_MESSAGE' = 'USER_ORDERS_FEED_SEND_MESSAGE';

interface IStartUserOrdersFeedConnectionAction {
  readonly type: 'USER_ORDERS_FEED_CONNECTION_START';
  readonly endpoint: string;
}

interface IStopUserOrdersFeedConnectionAction {
  readonly type: 'USER_ORDERS_FEED_CONNECTION_STOP';
}

export interface IConnectUserOrdersFeedWebSocketSuccessAction {
  readonly type: 'USER_ORDERS_FEED_CONNECTION_SUCCESS';
}

export interface IConnectUserOrdersFeedWebSocketClosedAction {
  readonly type: 'USER_ORDERS_FEED_CONNECTION_CLOSED';
}

export interface IUserOrdersFeedWebSocketErrorAction {
  readonly type: 'USER_ORDERS_FEED_CONNECTION_ERROR';
  readonly error: Event;
}

export interface IGetUserOrdersFeedMessageAction {
  readonly type: 'USER_ORDERS_FEED_GET_MESSAGE';
  readonly message: string;
}

export interface ISendUserOrdersFeedMessageAction {
  readonly type: 'USER_ORDERS_FEED_SEND_MESSAGE';
}

export type TUserOrdersFeedActions =
  | IStartUserOrdersFeedConnectionAction
  | IStopUserOrdersFeedConnectionAction
  | IConnectUserOrdersFeedWebSocketSuccessAction
  | IConnectUserOrdersFeedWebSocketClosedAction
  | IUserOrdersFeedWebSocketErrorAction
  | IGetUserOrdersFeedMessageAction
  | ISendUserOrdersFeedMessageAction;

export function startUserOrdersFeedConnectionAction(endpoint: string): IStartUserOrdersFeedConnectionAction {
  return {type: USER_ORDERS_FEED_CONNECTION_START, endpoint};
}

export function stopUserOrdersFeedConnectionAction(): IStopUserOrdersFeedConnectionAction {
  return {type: USER_ORDERS_FEED_CONNECTION_STOP};
}

export function connectUserOrdersFeedWebSocketSuccessAction(): IConnectUserOrdersFeedWebSocketSuccessAction {
  return {type: USER_ORDERS_FEED_CONNECTION_SUCCESS};
}

export function connectUserOrdersFeedWebSocketClosedAction(): IConnectUserOrdersFeedWebSocketClosedAction {
  return {type: USER_ORDERS_FEED_CONNECTION_CLOSED};
}

export function userOrdersFeedWebSocketErrorAction(error: Event): IUserOrdersFeedWebSocketErrorAction {
  return {type: USER_ORDERS_FEED_CONNECTION_ERROR, error};
}

export function getUserOrdersFeedMessageAction(message: string): IGetUserOrdersFeedMessageAction {
  return {type: USER_ORDERS_FEED_GET_MESSAGE, message};
}