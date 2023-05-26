import {expireCookie, getCookie, setCookie} from "../../helpers/cookie-helper";
import * as normaClient from "../../helpers/http-clients/norma-client";
import setTokenExpirationDate from "../../helpers/local-storage-helper";
import {AppDispatch, AppThunk} from "../../types";
import {TEditUserRequest, TRegisterRequest} from "../../helpers/http-clients/types/requests";
import {TUser} from "../../helpers/http-clients/types/responses";

export const AUTH_CHECKED: 'AUTH_CHECKED' = 'AUTH_CHECKED';
export const SET_USER: 'SET_USER' = 'SET_USER';
export const RESET_PASSWORD_STARTED: 'RESET_PASSWORD_STARTED' = 'RESET_PASSWORD_STARTED';
export const RESET_PASSWORD_FINISHED: 'RESET_PASSWORD_FINISHED' = 'RESET_PASSWORD_FINISHED';

export interface IAuthCheckedAction {
  readonly type: typeof AUTH_CHECKED;
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

export type TAuthActions =
| IAuthCheckedAction
| ISetUserAction
| IResetPasswordStartedAction
| IResetPasswordFinishedAction;

export const getUser = (): AppThunk => (dispatch: AppDispatch) => {
  normaClient.getUser()
    .then(result => {
      dispatch({type: SET_USER, user: result.user});
    });
};

export const checkUserAuth = (): AppThunk => (dispatch: AppDispatch) => {
  if (getCookie('normaToken'))
    dispatch(getUser());

  dispatch({type: AUTH_CHECKED});
};

export const editUser = (user: TEditUserRequest): AppThunk => function (dispatch: AppDispatch) {
  normaClient.editUser(user)
    .then(result => {
      dispatch({type: SET_USER, user: result.user});
    });
};

export const register = (payload: TRegisterRequest): AppThunk => (dispatch: AppDispatch) => {
  normaClient.register(payload)
    .then(result => {
      setCookie('normaToken', result.accessToken);
      localStorage.setItem('refreshToken', result.refreshToken);

      setTokenExpirationDate(15);

      dispatch({type: SET_USER, user: result.user});
    });
};

export const logIn = (email: string, password: string): AppThunk => (dispatch: AppDispatch) => {
  normaClient.login(email, password)
    .then(result => {
      setCookie('normaToken', result.accessToken);
      localStorage.setItem('refreshToken', result.refreshToken);

      setTokenExpirationDate(15);

      dispatch({type: SET_USER, user: result.user});
    });
};

export const logOut = (): AppThunk => (dispatch: AppDispatch) => {
  normaClient.logout(localStorage.getItem('refreshToken')!)
    .finally(() => {
      dispatch({type: SET_USER, user: null as unknown as TUser});

      expireCookie('normaToken');
      localStorage.clear();
    });
};

export const resetPassword = (password: string, emailCode: string) => (dispatch: AppDispatch) => {
  normaClient.resetPassword(password, emailCode)
    .then(() => dispatch({type: RESET_PASSWORD_FINISHED}));
};

export const sendResetPasswordEmail = (email: string): AppThunk => (dispatch: AppDispatch) => {
  normaClient.sendResetPasswordEmail(email)
    .then(() => dispatch({type: RESET_PASSWORD_STARTED}));
};
