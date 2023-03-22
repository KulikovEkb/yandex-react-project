import * as actions from './ingredients-actions';
import {TIngredientsActions} from "./ingredients-actions";
import categorizeIngredients from "../../../helpers/ingredients-categorizer";
import {TIngredients} from "../../../types/ingredients";

type TIngredientsState = {
  ingredients: TIngredients | null;
  getIngredientsRequest: boolean;
  getIngredientsFail: boolean;

  bunId: string | null;
  countersMap: Map<string, number> | null;
}

const initialState: TIngredientsState = {
  ingredients: null,
  getIngredientsRequest: false,
  getIngredientsFail: false,

  bunId: null,
  countersMap: null,
};

export function ingredientsReducer(state = initialState, action: TIngredientsActions) {
  switch (action.type) {
    case actions.GET_INGREDIENTS_REQUEST: {
      return {...state, getIngredientsRequest: true};
    }

    case actions.GET_INGREDIENTS_SUCCESS: {
      return {
        ...state,
        getIngredientsRequest: false,
        ingredients: categorizeIngredients(action.ingredients),
        countersMap: new Map(action.ingredients.map(x => [x._id, 0])),
      };
    }

    case actions.GET_INGREDIENTS_FAIL: {
      return {...state, getIngredientsRequest: false, getIngredientsFail: true};
    }

    case actions.SET_BUN_ID: {
      return {...state, bunId: action.id};
    }

    case actions.INCREMENT_INGREDIENT_COUNTER: {
      let newMap = new Map(state.countersMap);
      newMap.set(action.id, newMap.get(action.id)! + 1);

      return {...state, countersMap: newMap};
    }

    case actions.DECREMENT_INGREDIENT_COUNTER: {
      let newMap = new Map(state.countersMap);
      newMap.set(action.id, newMap.get(action.id)! - 1);

      return {...state, countersMap: newMap};
    }

    default: {
      return state;
    }
  }
}
