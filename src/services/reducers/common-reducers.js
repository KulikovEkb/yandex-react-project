// todo(kulikov): split into separate reducers

import {
  CREATE_ORDER_FAIL,
  CREATE_ORDER_REQUEST, CREATE_ORDER_SUCCESS,
  GET_INGREDIENTS_FAIL,
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
  INGREDIENT_MODAL_CLOSED,
  INGREDIENT_MODAL_OPEN
} from "../actions/common-actions";

const initialState = {
  // todo(kulikov): use classes?
  ingredients: {},
  getIngredientsRequest: false,
  getIngredientsFail: false,

  constructorIngredients: {},

  modalIngredient: null,

  orderNumber: {},
  createdOrderRequest: false,
  createOrderFail: false,
};

export const commonReducers = (state = initialState, action) => {
  switch (action.type) {
    case GET_INGREDIENTS_REQUEST: {
      return {...state, getIngredientsRequest: true};
    }

    case GET_INGREDIENTS_SUCCESS: {
      return {
        ...state,
        getIngredientsRequest: false,
        ingredients: action.ingredients,
        constructorIngredients: {
          top: action.ingredients.buns[0],
          bottom: action.ingredients.buns[0],
          fillers: [
            action.ingredients.fillers[0],
            action.ingredients.sauces[0],
            action.ingredients.fillers[1],
            action.ingredients.sauces[1],
            action.ingredients.fillers[2],
            action.ingredients.fillers[3],
            action.ingredients.fillers[4],
          ],
        }
      };
    }

    case GET_INGREDIENTS_FAIL: {
      return {...state, getIngredientsRequest: false, getIngredientsFail: true};
    }

    case INGREDIENT_MODAL_OPEN: {
      return {...state, modalIngredient: action.ingredient};
    }

    case INGREDIENT_MODAL_CLOSED: {
      return {...state, modalIngredient: initialState.modalIngredient};
    }

    case CREATE_ORDER_REQUEST: {
      return {...state, createdOrderRequest: true};
    }

    case CREATE_ORDER_SUCCESS: {
      return {
        ...state,
        createdOrderRequest: false,
        orderNumber: action.orderNumber,
      };
    }

    case CREATE_ORDER_FAIL: {
      return {...state, createdOrderRequest: false, createOrderFail: true};
    }

    default: {
      return state;
    }
  }
}