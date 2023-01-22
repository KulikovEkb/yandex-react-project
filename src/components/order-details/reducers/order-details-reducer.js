import * as actions from '../actions/order-details-actions';

const initialState = {
  orderNumber: {},
  createdOrderRequest: false,
  createOrderFail: false,
};

export function orderDetailsReducer(state = initialState, action) {
  switch (action.type) {
    case actions.CREATE_ORDER_REQUEST: {
      return {...state, createdOrderRequest: true};
    }

    case actions.CREATE_ORDER_SUCCESS: {
      return {...state, createdOrderRequest: false, orderNumber: action.orderNumber};
    }

    case actions.CREATE_ORDER_FAIL: {
      return {...state, createdOrderRequest: false, createOrderFail: true};
    }

    default: {
      return state;
    }
  }
}