import * as actions from './constructor-actions';
import {TConstructorActions} from "./constructor-actions";
import {TIngredient} from "../../../types/ingredient";
import {TFillerIngredient} from "../types/filler-type";

type TConstructorState = {
  bun: TIngredient | null,
  fillers: TFillerIngredient[],
}
const initialState: TConstructorState = {
  bun: null,
  fillers: [],
};

export function constructorReducer(state = initialState, action: TConstructorActions): TConstructorState {
  switch (action.type) {
    case actions.ADD_BUN: {
      return {...state, bun: {...action.bun}};
    }

    case actions.ADD_INGREDIENT: {
      return {
        ...state,
        fillers: [{...action.ingredient}, ...state.fillers],
      };
    }

    case actions.REMOVE_INGREDIENT: {
      return {
        ...state,
        fillers: state.fillers.filter(x => x.key !== action.key),
      };
    }

    case actions.SET_INGREDIENTS: {
      return {
        ...state,
        fillers: action.ingredients,
      };
    }

    default: {
      return state;
    }
  }
}
