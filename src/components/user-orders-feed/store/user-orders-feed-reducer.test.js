import {userOrdersFeedReducer} from "./user-orders-feed-reducer";
import {
  USER_ORDERS_FEED_CONNECTION_CLOSED,
  USER_ORDERS_FEED_CONNECTION_ERROR,
  USER_ORDERS_FEED_CONNECTION_SUCCESS, USER_ORDERS_FEED_GET_MESSAGE
} from "./user-orders-feed-actions";

const initialState = {
  isConnected: false,
  orders: [],
};

describe('user orders feed reducer', function () {
  it('should return the initial state', function () {
    expect(userOrdersFeedReducer(undefined, {})).toEqual(initialState);
  });

  it('should set connection opened', function () {
    expect(userOrdersFeedReducer({...initialState}, {type: USER_ORDERS_FEED_CONNECTION_SUCCESS}))
      .toEqual({...initialState, isConnected: true, error: undefined})
  });

  it('should set connection failed', function () {
    const errorEvent = new ErrorEvent('test error type');

    expect(userOrdersFeedReducer({...initialState}, {type: USER_ORDERS_FEED_CONNECTION_ERROR, error: errorEvent}))
      .toEqual({...initialState, error: errorEvent})
  });

  it('should set connection closed', function () {
    expect(userOrdersFeedReducer({...initialState, isConnected: true}, {type: USER_ORDERS_FEED_CONNECTION_CLOSED}))
      .toEqual({...initialState, isConnected: false})
  });

  it('should set user orders', function () {
    const message = {
      success: true,
      orders: [
        {
          _id: "642091470905fd001b6236c6",
          ingredients: [
            "60d3b41abdacab0026a733c7",
            "60d3b41abdacab0026a733cb",
            "60d3b41abdacab0026a733c7"
          ],
          status: 'done',
          name: "Био-марсианский флюоресцентный бургер",
          createdAt: "2023-03-26T18:39:03.643Z",
          updatedAt: "2023-03-26T18:39:04.084Z",
          number: 46149,
        }
      ],
    };

    expect(userOrdersFeedReducer({...initialState}, {type: USER_ORDERS_FEED_GET_MESSAGE, message: JSON.stringify(message)}))
      .toEqual({...initialState, orders: message.orders})
  });
});