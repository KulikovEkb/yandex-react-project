import {expireCookie, getCookie, setCookie} from "../../helpers/cookie-helper";
import normaClient from "../../clients/norma-client";

export const AUTH_CHECKED = 'AUTH_CHECKED';
export const SET_USER = 'SET_USER';

export function checkUserAuth() {
  return async function (dispatch) {
    if (getCookie("accessToken")) {
      dispatch(getUser())
        .finally(() => {
          dispatch({type: AUTH_CHECKED});
        });
    } else {
      dispatch({type: AUTH_CHECKED});
    }
  };
}

export async function getUser() {
  return async function (dispatch) {
    const data = await normaClient.getUser();

    if (data.success) {
      dispatch({type: SET_USER, user: data.user});
    }
  }
}

export async function register(payload) {
  return async function (dispatch) {
    // todo(kulikov): rewrite
    try {
      const result = await normaClient.register(payload);

      console.log(result);

      if (result.success) {
        setCookie('token', result.accessToken);
        localStorage.setItem('refreshToken', result.refreshToken);
        dispatch({type: SET_USER, user: result.user});
      }
    } catch (exc) {
      console.log(exc);
    }
  }
}

export async function logIn(email, password) {
  return async function (dispatch) {
    const result = await normaClient.login(email, password);

    setCookie('token', result.accessToken);
    localStorage.setItem('refreshToken', result.refreshToken);

    const fifteenMinutes = 15 * 60 * 1000;
    const date = new Date();
    localStorage.setItem('expiresAt', date.setTime(date.getTime() + fifteenMinutes).toString());

    if (result.success) {
      dispatch({type: SET_USER, user: result.user});
    }
  }
}

export async function logOut(){
  return async function (dispatch) {
    await normaClient.logout(localStorage.getItem('refreshToken'));

    dispatch({type: SET_USER, user: null});

    expireCookie('token');
    localStorage.clear();
  }
}