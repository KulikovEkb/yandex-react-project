import {DECREMENT_INGREDIENT_COUNTER} from "../../burger-ingredients/store/ingredients-actions";
import {AppDispatch, AppThunk} from "../../../types";
import {TIngredient} from "../../../types/ingredient";
import {TFillerIngredient} from "../types/filler-type";

export const ADD_BUN: 'ADD_BUN' = 'ADD_BUN';
export const ADD_INGREDIENT: 'ADD_INGREDIENT' = 'ADD_INGREDIENT';
export const REMOVE_INGREDIENT: 'REMOVE_INGREDIENT' = 'REMOVE_INGREDIENT';
export const SET_INGREDIENTS: 'SET_INGREDIENTS' = 'SET_INGREDIENTS';

export interface IAddBunAction {
  readonly type: typeof ADD_BUN;
  readonly bun: TIngredient;
}

export interface IAddIngredientAction {
  readonly type: typeof ADD_INGREDIENT;
  readonly ingredient: TIngredient;
}

export interface IRemoveIngredientAction {
  readonly type: typeof REMOVE_INGREDIENT;
  readonly key: string;
}

export interface ISetIngredientsAction {
  readonly type: typeof SET_INGREDIENTS;
  readonly ingredients: TFillerIngredient[];
}

export type TConstructorActions =
  | IAddBunAction
  | IAddIngredientAction
  | IRemoveIngredientAction
  | ISetIngredientsAction;

export const removeIngredient = (id: string, key: string): AppThunk => (dispatch: AppDispatch) => {
  dispatch({type: DECREMENT_INGREDIENT_COUNTER, id});
  dispatch({type: REMOVE_INGREDIENT, key});
};
