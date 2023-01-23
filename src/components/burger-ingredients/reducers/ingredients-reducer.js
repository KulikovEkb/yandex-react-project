import * as actions from '../actions/ingredients-actions';
import categorizeIngredients from "../../../helpers/ingredients-categorizer";

const initialState = {
  ingredients: null,
  getIngredientsRequest: false,
  getIngredientsFail: false,

  bunId: null,
  countersMap: null,

  detailsModalIsOpen: false,
};

export function ingredientsReducer(state = initialState, action) {
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
      newMap.set(action.id, newMap.get(action.id) + 1);

      return {...state, countersMap: newMap};
    }

    case actions.DECREMENT_INGREDIENT_COUNTER: {
      let newMap = new Map(state.countersMap);
      newMap.set(action.id, newMap.get(action.id) - 1);

      return {...state, countersMap: newMap};
    }

    case actions.DETAILS_MODAL_IS_OPEN: {
      return {...state, detailsModalIsOpen: true};
    }

    case actions.DETAILS_MODAL_IS_CLOSED: {
      return {...state, detailsModalIsOpen: false};
    }

    default: {
      return state;
    }
  }
}