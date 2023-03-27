import * as actions from './ingredients-actions';
import {TIngredientsActions} from "./ingredients-actions";
import {TIngredients} from "../../../types/ingredients";
import {TIngredient} from "../../../types/ingredient";

type TIngredientsState = {
  ingredients: TIngredients | null;
  ingredientsMap: Map<string, TIngredient>;
  getIngredientsRequest: boolean;
  getIngredientsFail: boolean;

  bunId: string | null;
  countersMap: Map<string, number>;
}

const initialState: TIngredientsState = {
  ingredients: null,
  ingredientsMap: new Map<string, TIngredient>(),
  getIngredientsRequest: false,
  getIngredientsFail: false,

  bunId: null,
  countersMap: new Map<string, number>(),
};

export function ingredientsReducer(state = initialState, action: TIngredientsActions): TIngredientsState {
  switch (action.type) {
    case actions.GET_INGREDIENTS_REQUEST: {
      return {...state, getIngredientsRequest: true};
    }

    case actions.GET_INGREDIENTS_SUCCESS: {
      const ingredients: TIngredients = {buns: [], sauces: [], fillers: []};
      const countersMap: Map<string, number> = new Map<string, number>();
      const ingredientsMap: Map<string, TIngredient> = new Map<string, TIngredient>();

      for (const i of action.ingredients) {
        ingredientsMap.set(i._id, i);
        countersMap.set(i._id, 0);

        switch (i.type) {
          case 'main':
            ingredients.fillers.push(i);
            break;

          case 'sauce':
            ingredients.sauces.push(i);
            break;

          case 'bun':
            ingredients.buns.push(i);
            break;

          default:
            break;
        }
      }

      return {
        ...state,
        getIngredientsRequest: false,
        ingredients: ingredients,
        ingredientsMap: ingredientsMap,
        countersMap: countersMap,
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
