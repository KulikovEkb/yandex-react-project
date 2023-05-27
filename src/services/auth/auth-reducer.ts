import {
  CHECK_AUTH,
  EDIT_USER_FAILED,
  GET_USER_FAILED,
  LOGIN_FAILED,
  LOGOUT_FAILED,
  REGISTER_FAILED,
  RESET_PASSWORD_FAILED,
  RESET_PASSWORD_FINISHED,
  RESET_PASSWORD_STARTED,
  SEND_RESET_PASSWORD_EMAIL_FAILED,
  SET_USER,
  TAuthActions
} from "./auth-actions";
import {TUser} from "../../helpers/http-clients/types/responses";

type TAuthState = {
  authChecked: boolean,
  user: TUser | null,
  resetPasswordStarted: boolean,
  resetPasswordFinished: boolean,
  getUserFailed: boolean,
  editUserFailed: boolean,
  registerFailed: boolean,
  loginFailed: boolean,
  logoutFailed: boolean,
  resetPasswordFailed: boolean,
  sendResetPasswordEmailFailed: boolean,
}

const initialState: TAuthState = {
  authChecked: false,
  user: null,
  resetPasswordStarted: false,
  resetPasswordFinished: false,
  getUserFailed: false,
  editUserFailed: false,
  registerFailed: false,
  loginFailed: false,
  logoutFailed: false,
  resetPasswordFailed: false,
  sendResetPasswordEmailFailed: false,
}

export function authReducer(state = initialState, action: TAuthActions): TAuthState {
  switch (action.type) {
    case CHECK_AUTH: {
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

    case GET_USER_FAILED: {
      return {...state, getUserFailed: true};
    }

    case EDIT_USER_FAILED: {
      return {...state, editUserFailed: true};
    }

    case REGISTER_FAILED: {
      return {...state, registerFailed: true};
    }

    case LOGIN_FAILED: {
      return {...state, loginFailed: true};
    }

    case LOGOUT_FAILED: {
      return {...state, logoutFailed: true};
    }

    case RESET_PASSWORD_FAILED: {
      return {...state, resetPasswordFailed: true};
    }

    case SEND_RESET_PASSWORD_EMAIL_FAILED: {
      return {...state, sendResetPasswordEmailFailed: true};
    }

    default:
      return state;
  }
}
