import {expireCookie, getCookie, setCookie} from "../../helpers/cookie-helper";
import * as normaClient from "../../helpers/http-clients/norma-client";
import setTokenExpirationDate from "../../helpers/local-storage-helper";
import {AppDispatch, AppThunk} from "../../types";
import {TEditUserRequest, TRegisterRequest} from "../../helpers/http-clients/types/requests";
import {TUser} from "../../helpers/http-clients/types/responses";

export const CHECK_AUTH: 'CHECK_AUTH' = 'CHECK_AUTH';
export const SET_USER: 'SET_USER' = 'SET_USER';
export const RESET_PASSWORD_STARTED: 'RESET_PASSWORD_STARTED' = 'RESET_PASSWORD_STARTED';
export const RESET_PASSWORD_FINISHED: 'RESET_PASSWORD_FINISHED' = 'RESET_PASSWORD_FINISHED';

export const GET_USER_FAILED: 'GET_USER_FAILED' = 'GET_USER_FAILED';
export const EDIT_USER_FAILED: 'EDIT_USER_FAILED' = 'EDIT_USER_FAILED';
export const REGISTER_FAILED: 'REGISTER_FAILED' = 'REGISTER_FAILED';
export const LOGIN_FAILED: 'LOGIN_FAILED' = 'LOGIN_FAILED';
export const LOGOUT_FAILED: 'LOGOUT_FAILED' = 'LOGOUT_FAILED';
export const RESET_PASSWORD_FAILED: 'RESET_PASSWORD_FAILED' = 'RESET_PASSWORD_FAILED';
export const SEND_RESET_PASSWORD_EMAIL_FAILED: 'SEND_RESET_PASSWORD_EMAIL_FAILED' = 'SEND_RESET_PASSWORD_EMAIL_FAILED';

export interface ICheckAuthAction {
  readonly type: typeof CHECK_AUTH;
}

export interface ISetUserAction {
  readonly type: typeof SET_USER;
  readonly user: TUser;
}

export interface IResetPasswordStartedAction {
  readonly type: typeof RESET_PASSWORD_STARTED;
}

export interface IResetPasswordFinishedAction {
  readonly type: typeof RESET_PASSWORD_FINISHED;
}

export interface IGetUserFailedAction {
  readonly type: typeof GET_USER_FAILED;
}

export interface IEditUserFailedAction {
  readonly type: typeof EDIT_USER_FAILED;
}

export interface IRegisterFailedAction {
  readonly type: typeof REGISTER_FAILED;
}

export interface ILoginFailedAction {
  readonly type: typeof LOGIN_FAILED;
}

export interface ILogoutFailedAction {
  readonly type: typeof LOGOUT_FAILED;
}

export interface IResetPasswordFailedAction {
  readonly type: typeof RESET_PASSWORD_FAILED;
}

export interface ISendResetPasswordEmailFailedAction {
  readonly type: typeof SEND_RESET_PASSWORD_EMAIL_FAILED;
}

export type TAuthActions =
  | ICheckAuthAction
  | ISetUserAction
  | IResetPasswordStartedAction
  | IResetPasswordFinishedAction
  | IGetUserFailedAction
  | IEditUserFailedAction
  | IRegisterFailedAction
  | ILoginFailedAction
  | ILogoutFailedAction
  | IResetPasswordFailedAction
  | ISendResetPasswordEmailFailedAction;

export const getUser = (): AppThunk => (dispatch: AppDispatch) => {
  try {
    normaClient.getUser()
      .then(result => {
        dispatch({type: SET_USER, user: result.user});
      });
  } catch {
    dispatch({type: GET_USER_FAILED});
  }
};

export const checkUserAuth = (): AppThunk => (dispatch: AppDispatch) => {
  if (getCookie('normaToken'))
    dispatch(getUser());

  dispatch({type: CHECK_AUTH});
};

export const editUser = (user: TEditUserRequest): AppThunk => function (dispatch: AppDispatch) {
  try {
    normaClient.editUser(user)
      .then(result => {
        dispatch({type: SET_USER, user: result.user});
      });
  } catch {
    dispatch({type: EDIT_USER_FAILED});
  }
};

export const register = (payload: TRegisterRequest): AppThunk => (dispatch: AppDispatch) => {
  try {
    normaClient.register(payload)
      .then(result => {
        setCookie('normaToken', result.accessToken);
        localStorage.setItem('refreshToken', result.refreshToken);

        setTokenExpirationDate(15);

        dispatch({type: SET_USER, user: result.user});
      });
  } catch (e) {
    dispatch({type: REGISTER_FAILED});
  }
};

export const logIn = (email: string, password: string): AppThunk => (dispatch: AppDispatch) => {
  try {
    normaClient.login(email, password)
      .then(result => {
        setCookie('normaToken', result.accessToken);
        localStorage.setItem('refreshToken', result.refreshToken);

        setTokenExpirationDate(15);

        dispatch({type: SET_USER, user: result.user});
      });
  } catch {
    dispatch({type: LOGIN_FAILED});
  }
};

export const logOut = (): AppThunk => (dispatch: AppDispatch) => {
  try {
    normaClient.logout(localStorage.getItem('refreshToken')!)
      .finally(() => {
        dispatch({type: SET_USER, user: null as unknown as TUser});

        expireCookie('normaToken');
        localStorage.clear();
      });
  } catch {
    dispatch({type: LOGOUT_FAILED});
  }
};

export const resetPassword = (password: string, emailCode: string) => (dispatch: AppDispatch) => {
  try {
    normaClient.resetPassword(password, emailCode)
      .then(() => dispatch({type: RESET_PASSWORD_FINISHED}));
  } catch {
    dispatch({type: RESET_PASSWORD_FAILED});
  }
};

export const sendResetPasswordEmail = (email: string): AppThunk => (dispatch: AppDispatch) => {
  try {
    normaClient.sendResetPasswordEmail(email)
      .then(() => dispatch({type: RESET_PASSWORD_STARTED}));
  } catch {
    dispatch({type: SEND_RESET_PASSWORD_EMAIL_FAILED});
  }
};
