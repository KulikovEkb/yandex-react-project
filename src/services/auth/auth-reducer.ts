import {AUTH_CHECKED, RESET_PASSWORD_STARTED, RESET_PASSWORD_FINISHED, SET_USER, TAuthActions} from "./auth-actions";
import {TUser} from "../../clients/types/responses";

type TAuthState = {
  authChecked: boolean,
  user: TUser | null,
  resetPasswordStarted: boolean,
  resetPasswordFinished: boolean,
}

const initialState: TAuthState = {
  authChecked: false,
  user: null,
  resetPasswordStarted: false,
  resetPasswordFinished: false,
}

export function authReducer(state = initialState, action: TAuthActions) {
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
