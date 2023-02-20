import {expireCookie, getCookie, setCookie} from "../../helpers/cookie-helper";
import * as normaClient from "../../clients/norma-client";
import setTokenExpirationDate from "../../helpers/local-storage-helper";

export const AUTH_CHECKED = 'AUTH_CHECKED';
export const SET_USER = 'SET_USER';
export const RESET_PASSWORD_STARTED = 'RESET_PASSWORD_EMAIL_SENT';
export const RESET_PASSWORD_FINISHED = 'RESET_PASSWORD_FINISHED';

export function checkUserAuth() {
  return function (dispatch) {
    if (getCookie('token'))
      dispatch(getUser());

    dispatch({type: AUTH_CHECKED});
  };
}

export function getUser() {
  return function (dispatch) {
    normaClient.getUser()
      .then(result => {
        dispatch({type: SET_USER, user: result.user});
      });
  }
}

export function register(payload) {
  return function (dispatch) {
    normaClient.register(payload)
      .then(result => {
        setCookie('token', result.accessToken);
        localStorage.setItem('refreshToken', result.refreshToken);

        setTokenExpirationDate(15);

        dispatch({type: SET_USER, user: result.user});
      });
  }
}

export function logIn(email, password) {
  return function (dispatch) {
    normaClient.login(email, password)
      .then(result => {
        setCookie('token', result.accessToken);
        localStorage.setItem('refreshToken', result.refreshToken);

        setTokenExpirationDate(15);

        dispatch({type: SET_USER, user: result.user});
      });
  }
}

export function logOut() {
  return function (dispatch) {
    normaClient.logout(localStorage.getItem('refreshToken'))
      .finally(() => {
        dispatch({type: SET_USER, user: null});

        expireCookie('token');
        localStorage.clear();
      });
  }
}

export function resetPassword(password, emailCode) {
  return function (dispatch) {
    normaClient.resetPassword(password, emailCode)
      .then(() => dispatch({type: RESET_PASSWORD_FINISHED}));
  }
}

export function sendResetPasswordEmail(email) {
  return function (dispatch) {
    normaClient.sendResetPasswordEmail(email)
      .then(() => dispatch({type: RESET_PASSWORD_STARTED}));
  }
}