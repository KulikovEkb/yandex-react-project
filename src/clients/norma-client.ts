import {
  sendGetRequest,
  sendGetRequestWithAuth,
  sendPatchRequestWithAuth,
  sendPostRequest
} from "./helpers/http-client-helper";
import {setCookie} from "../helpers/cookie-helper";
import setTokenExpirationDate from "../helpers/local-storage-helper";
import {
  TCreateOrderRequest, TEditUserRequest, TLoginRequest, TLogoutRequest, TRefreshTokenRequest,
  TRegisterRequest,
  TResetPasswordRequest,
  TSendResetPasswordEmailRequest
} from "./types/requests";
import {
  TCreateOrderResponse, TEditUserResponse,
  TGetIngredientsResponse, TGetUserResponse, TLoginResponse, TLogoutResponse, TRefreshTokenResponse, TRegisterResponse,
  TResetPasswordResponse,
  TSendResetPasswordEmailResponse
} from "./types/responses";

const baseUri = 'https://norma.nomoreparties.space/api';

export function getIngredients() {
  return sendGetRequest<TGetIngredientsResponse>(`${baseUri}/ingredients`)
    .then(result => result.data);
}

export function createOrder(elementsIds: Array<string>) {
  return sendPostRequest<TCreateOrderRequest, TCreateOrderResponse>(`${baseUri}/orders`, {ingredients: elementsIds})
    .then(result => {
      if (result.success) return result.order.number;

      return Promise.reject(`Ошибка ${result}`);
    });
}

export function sendResetPasswordEmail(email: string) {
  return sendPostRequest<TSendResetPasswordEmailRequest, TSendResetPasswordEmailResponse>(
    `${baseUri}/password-reset`,
    {email}
  )
    .then(result => {
      if (result.success) return;

      return Promise.reject(`Ошибка ${result}`);
    });
}

export function resetPassword(newPassword: string, emailCode: string) {
  return sendPostRequest<TResetPasswordRequest, TResetPasswordResponse>(
    `${baseUri}/password-reset/reset`,
    {password: newPassword, token: emailCode}
  )
    .then(result => {
      if (result.success) return;

      return Promise.reject(`Ошибка ${result}`);
    });
}

export function register(payload: TRegisterRequest) {
  return sendPostRequest<TRegisterRequest, TRegisterResponse>(`${baseUri}/auth/register`, payload)
    .then(result => {
      if (result.success) return result;

      return Promise.reject(`Ошибка ${result}`);
    });
}

export function login(email: string, password: string) {
  return sendPostRequest<TLoginRequest, TLoginResponse>(`${baseUri}/auth/login`, {email, password})
    .then(result => {
      if (result.success) return result;

      return Promise.reject(`Ошибка ${result}`);
    });
}

export function logout(token: string) {
  return sendPostRequest<TLogoutRequest, TLogoutResponse>(`${baseUri}/auth/logout`, {token})
    .then(result => {
      if (result.success) return result;

      return Promise.reject(`Ошибка ${result}`);
    });
}

export function getUser(): Promise<TGetUserResponse> {
  return executeWithAuth(async () => await sendGetRequestWithAuth<TGetUserResponse>(`${baseUri}/auth/user`))
    .then(result => {
      if (result.success)
        return result;

      return Promise.reject(result);
    });
}

export function editUser(user: TEditUserRequest): Promise<TEditUserResponse> {
  return executeWithAuth(async () => await sendPatchRequestWithAuth<TEditUserRequest, TEditUserResponse>(
    `${baseUri}/auth/user`,
    user)
  )
    .then(result => {
      if (result.success)
        return result;

      return Promise.reject(result);
    });
}

async function executeWithAuth<T>(request: Function) {
  const expiresAtTicks = localStorage.getItem('expiresAt');
  const currentTicks = new Date().getTime().toString();

  if (!expiresAtTicks || currentTicks >= expiresAtTicks)
    await refreshToken();

  try {
    return await request();
  } catch (exc) {
    if ((exc as Error).message.includes('jwt expired'))
      return Promise.reject(exc);

    await refreshToken();

    return await request();
  }
}

function refreshToken() {
  const refreshTokenValue = localStorage.getItem('refreshToken');
  if (!refreshTokenValue)
    return Promise.reject('Refresh token is missing in local storage');

  return sendPostRequest<TRefreshTokenRequest, TRefreshTokenResponse>(
    `${baseUri}/auth/token`,
    {token: refreshTokenValue}
  )
    .then(result => {
      if (!result.success)
        return Promise.reject(`Ошибка ${result}`);

      setCookie('token', result.accessToken);
      localStorage.setItem('refreshToken', result.refreshToken);

      setTokenExpirationDate(15);
    });
}
