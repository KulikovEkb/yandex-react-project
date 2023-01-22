import normaClient from "../../../clients/norma-client";
import {ADD_BUN, ADD_INGREDIENT} from "../../burger-constructor/actions/constructor-actions";

export const GET_INGREDIENTS_REQUEST = 'GET_INGREDIENTS_REQUEST';
export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS';
export const GET_INGREDIENTS_FAIL = 'GET_INGREDIENTS_FAIL';

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

export function addIngredient(ingredient) {
  return function (dispatch) {
    if (ingredient.type === 'bun') {
      dispatch({type: SET_BUN_ID, id: ingredient._id});
      dispatch({type: ADD_BUN, bun: ingredient});
    } else {
      dispatch({type: INCREMENT_INGREDIENT_COUNTER, id: ingredient._id});
      dispatch({type: ADD_INGREDIENT, ingredient});
    }
  }
}
