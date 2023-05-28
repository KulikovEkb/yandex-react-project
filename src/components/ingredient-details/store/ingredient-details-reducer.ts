import * as actions from './ingredient-details-actions';
import {TIngredientDetailsActions} from "./ingredient-details-actions";

type TIngredientDetailsState = {
  name: string,
  image: string,
  calories: number,
  proteins: number,
  fat: number,
  carbohydrates: number,
};

const initialState: TIngredientDetailsState = {
  name: '',
  image: '',
  calories: 0,
  proteins: 0,
  fat: 0,
  carbohydrates: 0,
};

export function ingredientDetailsReducer(state = initialState, action: TIngredientDetailsActions): TIngredientDetailsState {
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
