import * as actions from '../actions/ingredients-actions';
import categorizeIngredients from "../../../helpers/ingredients-categorizer";

const initialState = {
  ingredients: null,
  getIngredientsRequest: false,
  getIngredientsFail: false,

  bunId: null,
  countersMap: null,

  ingredientDetails: {
    name: null,
    image: null,
    calories: null,
    proteins: null,
    fat: null,
    carbohydrates: null,
  },
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

    case actions.INGREDIENT_MODAL_OPEN: {
      return {
        ...state,
        ingredientDetails: {
          name: action.ingredient.name,
          image: action.ingredient.image_large,
          calories: action.ingredient.calories,
          proteins: action.ingredient.proteins,
          fat: action.ingredient.fat,
          carbohydrates: action.ingredient.carbohydrates,
        }
      };
    }

    case actions.INGREDIENT_MODAL_CLOSED: {
      return {...state, ingredientDetails: initialState.ingredientDetails};
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

    default: {
      return state;
    }
  }
}