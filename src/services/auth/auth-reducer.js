import {AUTH_CHECKED, RESET_PASSWORD_STARTED, RESET_PASSWORD_FINISHED, SET_USER} from "./auth-actions";

const initialState = {
  authChecked: false,
  user: null,
  resetPasswordStarted: false,
  resetPasswordFinished: false,
}

export function authReducer(state = initialState, action) {
  switch (action.type) {
    case AUTH_CHECKED: {
      return {...state, authChecked: true};
    }

    case SET_USER: {
      return {...state, user: action.user};
    }

    case RESET_PASSWORD_STARTED: {
      return {...state, resetPasswordStarted: true};
    }

    case RESET_PASSWORD_FINISHED: {
      return {...state, resetPasswordStarted: false, resetPasswordFinished: true};
    }

    default:
      return state;
  }
}