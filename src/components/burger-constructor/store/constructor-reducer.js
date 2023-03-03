import {v4 as newGuid} from 'uuid';

import * as actions from './constructor-actions';

const initialState = {
  bun: null,
  fillers: [],
};

export function constructorReducer(state = initialState, action) {
  switch (action.type) {
    case actions.ADD_BUN: {
      return {...state, bun: {...action.bun}};
    }

    case actions.ADD_INGREDIENT: {
      return {
        ...state,
        fillers: [{...action.ingredient, key: newGuid()}, ...state.fillers],
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
