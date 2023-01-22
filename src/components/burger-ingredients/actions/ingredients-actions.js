import normaClient from "../../../clients/norma-client";

export const GET_INGREDIENTS_REQUEST = 'GET_INGREDIENTS_REQUEST';
export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS';
export const GET_INGREDIENTS_FAIL = 'GET_INGREDIENTS_FAIL';

export const INGREDIENT_MODAL_OPEN = 'INGREDIENT_MODAL_OPEN';
export const INGREDIENT_MODAL_CLOSED = 'INGREDIENT_MODAL_CLOSED';

export const SET_BUN_ID = 'SET_BUN_COUNTER';
export const INCREMENT_INGREDIENT_COUNTER = 'INCREMENT_INGREDIENT_COUNTER';
export const DECREMENT_INGREDIENT_COUNTER = 'DECREMENT_INGREDIENT_COUNTER';

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
