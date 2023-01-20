// todo(kulikov): split into separate actions
import normaClient from "../../clients/norma-client";

export const GET_INGREDIENTS_REQUEST = 'GET_INGREDIENTS_REQUEST';
export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS';
export const GET_INGREDIENTS_FAIL = 'GET_INGREDIENTS_FAIL';

export const INGREDIENT_MODAL_OPEN = 'INGREDIENT_MODAL_OPEN';
export const INGREDIENT_MODAL_CLOSED = 'INGREDIENT_MODAL_CLOSED';

export const CREATE_ORDER_REQUEST = 'CREATE_ORDER_REQUEST';
export const CREATE_ORDER_SUCCESS = 'CREATE_ORDER_SUCCESS';
export const CREATE_ORDER_FAIL = 'CREATE_ORDER_FAIL';

// todo(kulikov): replace async if doesn't work
export function getIngredients() {
  return async function (dispatch) {
    dispatch({type: GET_INGREDIENTS_REQUEST});

    try {
      const ingredients = await normaClient.getIngredients();

      if (!ingredients) {
        dispatch({type: GET_INGREDIENTS_FAIL});
      } else {
        dispatch({type: GET_INGREDIENTS_SUCCESS, ingredients});
      }
    } catch {
      dispatch({type: GET_INGREDIENTS_FAIL});
    }
  };
}

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
