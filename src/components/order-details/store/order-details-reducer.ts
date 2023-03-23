import * as actions from './order-details-actions';
import {TOrderDetailsActions} from "./order-details-actions";

type TOrderDetailsState = {
  // todo(kulikov): remove object
  orderNumber: number | object,
  createOrderRequest: boolean,
  createOrderFail: boolean,
};

const initialState: TOrderDetailsState = {
  orderNumber: {},
  createOrderRequest: false,
  createOrderFail: false,
};

export function orderDetailsReducer(state = initialState, action: TOrderDetailsActions) {
  switch (action.type) {
    case actions.CREATE_ORDER_REQUEST: {
      return {...state, createOrderRequest: true};
    }

    case actions.CREATE_ORDER_SUCCESS: {
      return {...state, createOrderRequest: false, orderNumber: action.orderNumber};
    }

    case actions.CREATE_ORDER_FAIL: {
      return {...state, createOrderRequest: false, createOrderFail: true};
    }

    default: {
      return state;
    }
  }
}
