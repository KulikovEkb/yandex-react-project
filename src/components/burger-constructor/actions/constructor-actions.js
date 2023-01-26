import {DECREMENT_INGREDIENT_COUNTER} from "../../burger-ingredients/actions/ingredients-actions";

export const ADD_BUN = 'ADD_BUN';
export const ADD_INGREDIENT = 'ADD_INGREDIENT';
export const REMOVE_INGREDIENT = 'REMOVE_INGREDIENT';
export const SET_INGREDIENTS = 'SET_INGREDIENTS';

export function removeIngredient(id, key) {
  return function (dispatch) {

    dispatch({type: DECREMENT_INGREDIENT_COUNTER, id})
    dispatch({type: REMOVE_INGREDIENT, key})
  }
}
