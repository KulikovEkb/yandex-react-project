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

export async function logIn(email, password) {
  return async function (dispatch) {
    const data = await normaClient.login(email, password);

    setCookie('token', data.accessToken);
    localStorage.setItem('refreshToken', data.refreshToken);

    const fifteenMinutes = 15 * 60 * 1000;
    const date = new Date();
    localStorage.setItem('expiresAt', date.setTime(date.getTime() + fifteenMinutes).toString());

    if (data.success) {
      dispatch({type: SET_USER, user: data.user});
    }
  }
}

export async function logOut(){
  return async function (dispatch) {
    await normaClient.logout();

    dispatch({type: SET_USER, user: null});

    expireCookie('token');
  }
}