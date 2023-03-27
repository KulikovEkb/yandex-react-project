import * as actions from './orders-feed-actions';
import {TOrder} from "../types/order";
import {TOrdersFeedActions} from "./orders-feed-actions";
import {TOrdersResponse} from "../types/orders-response";

type TOrdersFeedState = {
  isConnected: boolean;
  orders: TOrder[];
  error?: Event;
}

const initialState: TOrdersFeedState = {
  isConnected: false,
  orders: [],
};

export function ordersFeedReducer(state = initialState, action: TOrdersFeedActions): TOrdersFeedState {
  switch (action.type) {
    case actions.ORDERS_FEED_CONNECTION_SUCCESS:
      return {...state, isConnected: true, error: undefined};

    case actions.ORDERS_FEED_CONNECTION_ERROR:
      return {...state, isConnected: false, error: action.error};

    case actions.ORDERS_FEED_CONNECTION_CLOSED:
      return {...state, isConnected: false, error: undefined};

    case actions.ORDERS_FEED_GET_MESSAGE:
      const allOrders = JSON.parse(action.message) as TOrdersResponse;

      return {...state, orders: allOrders.orders};

    default:
      return state;
  }
}
