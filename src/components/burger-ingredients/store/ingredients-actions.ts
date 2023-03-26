import * as normaClient from "../../../helpers/http-clients/norma-client";
import {ADD_BUN, ADD_INGREDIENT} from "../../burger-constructor/store/constructor-actions";
import {TIngredient} from "../../../types/ingredient";
import {AppDispatch, AppThunk} from "../../../types";

export const GET_INGREDIENTS_REQUEST: 'GET_INGREDIENTS_REQUEST' = 'GET_INGREDIENTS_REQUEST';
export const GET_INGREDIENTS_SUCCESS: 'GET_INGREDIENTS_SUCCESS' = 'GET_INGREDIENTS_SUCCESS';
export const GET_INGREDIENTS_FAIL: 'GET_INGREDIENTS_FAIL' = 'GET_INGREDIENTS_FAIL';

export const SET_BUN_ID: 'SET_BUN_ID' = 'SET_BUN_ID';
export const INCREMENT_INGREDIENT_COUNTER: 'INCREMENT_INGREDIENT_COUNTER' = 'INCREMENT_INGREDIENT_COUNTER';
export const DECREMENT_INGREDIENT_COUNTER: 'DECREMENT_INGREDIENT_COUNTER' = 'DECREMENT_INGREDIENT_COUNTER';

export interface IGetIngredientsAction {
  readonly type: 'GET_INGREDIENTS_REQUEST';
}
export interface IGetIngredientsSuccessAction {
  readonly type: 'GET_INGREDIENTS_SUCCESS';
  readonly ingredients: TIngredient[];
}
export interface IGetIngredientsFailedAction {
  readonly type: 'GET_INGREDIENTS_FAIL';
}

export interface ISetBunIdAction {
  readonly type: 'SET_BUN_ID';
  readonly id: string;
}
export interface IIncrementIngredientCounterAction {
  readonly type: 'INCREMENT_INGREDIENT_COUNTER';
  readonly id: string;
}
export interface IDecrementIngredientCounterAction {
  readonly type: 'DECREMENT_INGREDIENT_COUNTER';
  readonly id: string;
}

export type TIngredientsActions =
  | IGetIngredientsAction
  | IGetIngredientsSuccessAction
  | IGetIngredientsFailedAction
  | ISetBunIdAction
  | IIncrementIngredientCounterAction
  | IDecrementIngredientCounterAction;

export const getIngredients = (): AppThunk => async function (dispatch: AppDispatch) {
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

export const addIngredient = (ingredient: TIngredient): AppThunk => (dispatch: AppDispatch) => {
  if (ingredient.type === 'bun') {
    dispatch({type: SET_BUN_ID, id: ingredient._id});
    dispatch({type: ADD_BUN, bun: ingredient});
  } else {
    dispatch({type: INCREMENT_INGREDIENT_COUNTER, id: ingredient._id});
    dispatch({type: ADD_INGREDIENT, ingredient});
  }
};
