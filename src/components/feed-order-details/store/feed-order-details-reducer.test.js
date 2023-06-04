import {feedOrderDetailsReducer} from "./feed-order-details-reducer";
import {GET_ORDER_FAIL, GET_ORDER_REQUEST, GET_ORDER_SUCCESS} from "./feed-order-details-actions";

const initialState = {
  isLoading: false,
  hasError: false,
  order: null,
};

describe('burger ingredients reducer', function () {
  it('should return the initial state', function () {
    expect(feedOrderDetailsReducer(undefined, {})).toEqual(initialState);
  });

  it('should set `get-order` request started', function () {
    expect(feedOrderDetailsReducer({...initialState}, {type: GET_ORDER_REQUEST}))
      .toEqual({...initialState, isLoading: true})
  });

  it('should set `get-order` request failed', function () {
    expect(feedOrderDetailsReducer({...initialState}, {type: GET_ORDER_FAIL}))
      .toEqual({...initialState, isLoading: false, hasError: true})
  });

  it('should set `get-order` request succeeded', function () {
    const order = {
      ingredients: [],
      _id: 'id',
      name: 'name',
      number: 5,
      status: 'pending',
      createdAt: 'creation time',
      updatedAt: 'update time',
    };

    expect(feedOrderDetailsReducer({...initialState}, { type: GET_ORDER_SUCCESS, order: {...order}}))
      .toEqual({...initialState, order: {...order}})
  });
});