// todo(kulikov): split into separate reducers
import {v4 as newGuid} from 'uuid';

import * as actions from '../actions/common-actions';
import categorizeIngredients from "../../helpers/ingredients-categorizer";

const initialState = {
  // todo(kulikov): use classes?
  ingredients: null,
  getIngredientsRequest: false,
  getIngredientsFail: false,

  ingredientCountersMap: null,

  constructorIngredients: {
    bun: null,
    fillers: [],
  },

  ingredientDetails: {
    name: null,
    image: null,
    calories: null,
    proteins: null,
    fat: null,
    carbohydrates: null,
  },

  orderNumber: {},
  createdOrderRequest: false,
  createOrderFail: false,
};

export function commonReducers(state = initialState, action) {
  switch (action.type) {
    case actions.GET_INGREDIENTS_REQUEST: {
      return {...state, getIngredientsRequest: true};
    }

    case actions.GET_INGREDIENTS_SUCCESS: {
      return {
        ...state,
        getIngredientsRequest: false,
        ingredients: categorizeIngredients(action.ingredients),
        ingredientCountersMap: new Map(action.ingredients.map(x => [x._id, 0])),
      };
    }

    case actions.GET_INGREDIENTS_FAIL: {
      return {...state, getIngredientsRequest: false, getIngredientsFail: true};
    }

    case actions.INGREDIENT_MODAL_OPEN: {
      return {
        ...state, ingredientDetails: {
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
      return {...state, modalIngredient: initialState.modalIngredient};
    }

    case actions.CREATE_ORDER_REQUEST: {
      return {...state, createdOrderRequest: true};
    }

    case actions.CREATE_ORDER_SUCCESS: {
      return {...state, createdOrderRequest: false, orderNumber: action.orderNumber};
    }

    case actions.CREATE_ORDER_FAIL: {
      return {...state, createdOrderRequest: false, createOrderFail: true};
    }

    case actions.ADD_BUN: {
      let newMap = new Map(state.ingredientCountersMap);
      if (state.constructorIngredients.bun) {
        newMap.set(state.constructorIngredients.bun._id, 0);
      }
      newMap.set(action.bun._id, 1);

      return {
        ...state,
        constructorIngredients: {
          ...state.constructorIngredients,
          bun: {...action.bun},
        },
        ingredientCountersMap: newMap,
      };
    }

    case actions.ADD_INGREDIENT: {
      let newMap = new Map(state.ingredientCountersMap);
      newMap.set(action.ingredient._id, newMap.get(action.ingredient._id) + 1);

      return {
        ...state,
        constructorIngredients: {
          ...state.constructorIngredients,
          fillers: [...state.constructorIngredients.fillers, {...action.ingredient, key: newGuid()}]
        },
        ingredientCountersMap: newMap,
      };
    }

    case actions.REMOVE_INGREDIENT: {
      let newMap = new Map(state.ingredientCountersMap);
      newMap.set(action.id, newMap.get(action.id) - 1);

      return {
        ...state,
        constructorIngredients: {
          ...state.constructorIngredients,
          fillers: state.constructorIngredients.fillers.filter(x => x.key !== action.key)
        },
        ingredientCountersMap: newMap,
      };
    }

    default: {
      return state;
    }
  }
}