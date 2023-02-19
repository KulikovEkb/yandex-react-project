import {sendGetRequest, sendGetRequestWithAuth, sendPostRequest} from "./helpers/http-client-helper";
import {setCookie} from "../helpers/cookie-helper";
import setTokenExpirationDate from "../helpers/local-storage-helper";

const baseUri = 'https://norma.nomoreparties.space/api';

export function getIngredients() {
  return sendGetRequest(`${baseUri}/ingredients`)
    .then(result => result.data);
}

export function createOrder(elementsIds) {
  return sendPostRequest(`${baseUri}/orders`, {ingredients: elementsIds})
    .then(result => {
      if (result.success) return result.order.number;

      return Promise.reject(`Ошибка ${result}`);
    });
}

export function sendResetPasswordEmail(email) {
  return sendPostRequest(`${baseUri}/password-reset`, {email})
    .then(result => {
      if (result.success) return;

      return Promise.reject(`Ошибка ${result}`);
    });
}

export function resetPassword(newPassword, emailCode) {
  return sendPostRequest(`${baseUri}/password-reset/reset`, {password: newPassword, token: emailCode})
    .then(result => {
      if (result.success) return;

      return Promise.reject(`Ошибка ${result}`);
    });
}

export function register(payload) {
  return sendPostRequest(`${baseUri}/auth/register`, payload)
    .then(result => {
      if (result.success) return result;

      return Promise.reject(`Ошибка ${result}`);
    });
}

export function login(email, password) {
  return sendPostRequest(`${baseUri}/auth/login`, {email, password})
    .then(result => {
      if (result.success) return result;

      return Promise.reject(`Ошибка ${result}`);
    });
}

export function logout(token) {
  return sendPostRequest(`${baseUri}/auth/logout`, {token})
    .then(result => {
      if (result.success) return result;

      return Promise.reject(`Ошибка ${result}`);
    });
}

export function getUser() {
  return executeWithAuth(async () => await sendGetRequestWithAuth(`${baseUri}/auth/user`))
    .then(result => {
      if (result.success)
        return result;

      return Promise.reject(result);
    });
}

async function executeWithAuth(request) {
  const currentTicks = new Date().getTime();
  if (currentTicks >= localStorage.getItem('expiresAt'))
    await refreshToken();

  try {
    return await request();
  } catch (exc) {
    if (!exc.message.includes('jwt expired'))
      return Promise.reject(exc);

    await refreshToken();

    return await request();
  }
}

function refreshToken() {
  const refreshTokenValue = localStorage.getItem('refreshToken');
  if (!refreshTokenValue)
    return Promise.reject('Refresh token is missing in local storage');

  return sendPostRequest(`${baseUri}/auth/token`, {token: refreshTokenValue})
    .then(result => {
      if (!result.success)
        return Promise.reject(`Ошибка ${result}`);

      setCookie('token', result.accessToken);
      localStorage.setItem('refreshToken', result.refreshToken);

      setTokenExpirationDate(15);
    });
}
