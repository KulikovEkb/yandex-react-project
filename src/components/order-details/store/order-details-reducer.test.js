import {orderDetailsReducer} from "./order-details-reducer";
import {CREATE_ORDER_FAIL, CREATE_ORDER_REQUEST, CREATE_ORDER_SUCCESS} from "./order-details-actions";

const initialState = {
  orderNumber: null,
  createOrderRequest: false,
  createOrderFail: false,
};

describe('orders details reducer', function () {
  it('should return the initial state', function () {
    expect(orderDetailsReducer(undefined, {})).toEqual(initialState);
  });

  it('should set `create-order` request started', function () {
    expect(orderDetailsReducer({...initialState}, {type: CREATE_ORDER_REQUEST}))
      .toEqual({...initialState, createOrderRequest: true})
  });

  it('should set `create-order` request failed', function () {
    expect(orderDetailsReducer({...initialState}, {type: CREATE_ORDER_FAIL}))
      .toEqual({...initialState, createOrderRequest: false, createOrderFail: true})
  });

  it('should set `create-order` request succeeded', function () {
    expect(orderDetailsReducer({...initialState}, { type: CREATE_ORDER_SUCCESS, orderNumber: 666}))
      .toEqual({...initialState, orderNumber: 666})
  });
});