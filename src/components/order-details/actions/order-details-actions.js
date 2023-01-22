import normaClient from "../../../clients/norma-client";

export const CREATE_ORDER_REQUEST = 'CREATE_ORDER_REQUEST';
export const CREATE_ORDER_SUCCESS = 'CREATE_ORDER_SUCCESS';
export const CREATE_ORDER_FAIL = 'CREATE_ORDER_FAIL';

export function createOrder(elementsIds) {
  return async function (dispatch) {
    dispatch({type: CREATE_ORDER_REQUEST});

    try {
      const orderNumber = await normaClient.createOrder(elementsIds);

      dispatch({type: CREATE_ORDER_SUCCESS, orderNumber});
    } catch {
      dispatch({type: CREATE_ORDER_FAIL});
    }
  };
}
