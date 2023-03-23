import * as actions from './ingredient-details-actions';
import {TIngredientDetailsActions} from "./ingredient-details-actions";

type TIngredientDetailsState = {
  name: string | null,
  image: string | null,
  calories: number | null,
  proteins: number | null,
  fat: number | null,
  carbohydrates: number | null,
};

const initialState: TIngredientDetailsState = {
  name: null,
  image: null,
  calories: null,
  proteins: null,
  fat: null,
  carbohydrates: null,
};

export function ingredientDetailsReducer(state = initialState, action: TIngredientDetailsActions) {
  switch (action.type) {
    case actions.SET_DETAILS: {
      return {
        ...state,
        name: action.ingredient.name,
        image: action.ingredient.image_large,
        calories: action.ingredient.calories,
        proteins: action.ingredient.proteins,
        fat: action.ingredient.fat,
        carbohydrates: action.ingredient.carbohydrates,
      };
    }

    case actions.RESET_DETAILS: {
      return {
        ...initialState,
      };
    }

    default: {
      return state;
    }
  }
}
