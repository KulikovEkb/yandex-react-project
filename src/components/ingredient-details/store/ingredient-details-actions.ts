import {TIngredient} from "../../../types/ingredient";

export const SET_DETAILS: 'SET_DETAILS' = 'SET_DETAILS';
export const RESET_DETAILS: 'RESET_DETAILS' = 'RESET_DETAILS';

export interface ISetDetailsAction {
  readonly type: 'SET_DETAILS';
  readonly ingredient: TIngredient;
}

export interface IReSetDetailsAction {
  readonly type: 'RESET_DETAILS';
}

export type TIngredientDetailsActions =
  | ISetDetailsAction
  | IReSetDetailsAction;
