import {v4 as newGuid} from 'uuid';

import * as actions from '../actions/constructor-actions';

const initialState = {
  bun: null,
  ingredients: [],

  orderNumber: {},
  createdOrderRequest: false,
  createOrderFail: false,
};

export function constructorReducer(state = initialState, action) {
  switch (action.type) {
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
      return {...state, bun: {...action.bun}};
    }

    case actions.ADD_INGREDIENT: {
      return {
        ...state,
        ingredients: [{...action.ingredient, key: newGuid()}, ...state.ingredients]
      };
    }

    case actions.REMOVE_INGREDIENT: {
      return {
        ...state,
        ingredients: state.ingredients.filter(x => x.key !== action.key)
      };
    }

    default: {
      return state;
    }
  }
}