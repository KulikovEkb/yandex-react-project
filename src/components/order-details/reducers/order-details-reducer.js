import * as actions from '../actions/order-details-actions';

const initialState = {
  orderNumber: {},
  createOrderRequest: false,
  createOrderFail: false,
};

export function orderDetailsReducer(state = initialState, action) {
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