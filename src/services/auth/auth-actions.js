import {expireCookie, getCookie, setCookie} from "../../helpers/cookie-helper";
import normaClient from "../../clients/norma-client";

export const AUTH_CHECKED = 'AUTH_CHECKED';
export const SET_USER = 'SET_USER';

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
    // todo(kulikov): rewrite
    try {
      normaClient.register(payload)
        .then(result => {

          console.log(result);

          setCookie('token', result.accessToken);
          localStorage.setItem('refreshToken', result.refreshToken);
          dispatch({type: SET_USER, user: result.user});
        });
    } catch (exc) {
      console.log(exc);
    }
  }
}

export function logIn(email, password) {
  return function (dispatch) {
    normaClient.login(email, password)
      .then(result => {
        setCookie('token', result.accessToken);
        localStorage.setItem('refreshToken', result.refreshToken);

        const fifteenMinutes = 15 * 60 * 1000;
        const date = new Date();
        localStorage.setItem('expiresAt', date.setTime(date.getTime() + fifteenMinutes).toString());

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