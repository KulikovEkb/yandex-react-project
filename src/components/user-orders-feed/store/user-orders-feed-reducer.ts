import * as actions from './user-orders-feed-actions';
import {TOrder} from "../../../types/order";
import {TOrdersResponse} from "../../../types/orders-response";
import {TUserOrdersFeedActions} from "./user-orders-feed-actions";

type TOrdersFeedState = {
  isConnected: boolean;
  orders: TOrder[];
  error?: Event;
}

const initialState: TOrdersFeedState = {
  isConnected: false,
  orders: [],
};

export function userOrdersFeedReducer(state = initialState, action: TUserOrdersFeedActions): TOrdersFeedState {
  switch (action.type) {
    case actions.USER_ORDERS_FEED_CONNECTION_SUCCESS:
      return {...state, isConnected: true, error: undefined};

    case actions.USER_ORDERS_FEED_CONNECTION_ERROR:
      return {...state, isConnected: false, error: action.error};

    case actions.USER_ORDERS_FEED_CONNECTION_CLOSED:
      return {...state, isConnected: false, error: undefined};

    case actions.USER_ORDERS_FEED_GET_MESSAGE:
      const allOrders = JSON.parse(action.message) as TOrdersResponse;

      return {...state, orders: allOrders.orders};

    default:
      return state;
  }
}
