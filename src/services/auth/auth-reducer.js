import {AUTH_CHECKED, SET_USER} from "./auth-actions";

const initialState = {
  authChecked: false,
  user: null,
}

export function authReducer(state = initialState, action) {
  switch (action.type) {
    case AUTH_CHECKED: {
      return {...state, authChecked: true};
    }

    case SET_USER: {
      return {...state, user: action.user};
    }

    default:
      return state;
  }
}