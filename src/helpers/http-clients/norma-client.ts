import {
  sendGetRequest,
  sendGetRequestWithAuth,
  sendPatchRequestWithAuth,
  sendPostRequest,
  sendPostRequestWithAuth
} from "./helpers/http-client-helper";
import {setCookie} from "../cookie-helper";
import setTokenExpirationDate from "../local-storage-helper";
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
  TSendResetPasswordEmailResponse, TServerResponse
} from "./types/responses";

const baseUri = 'https://norma.nomoreparties.space/api';

export function getIngredients() {
  return sendGetRequest<TGetIngredientsResponse>(`${baseUri}/ingredients`)
    .then(result => result.data);
}

export function createOrder(elementsIds: Array<string>): Promise<number> {
  return executeWithAuth(
    async () => await sendPostRequestWithAuth<TCreateOrderRequest, TCreateOrderResponse>(
      `${baseUri}/orders`, {ingredients: elementsIds}
    )
  )
    .then(checkSuccess)
    .then(result => {
      return result.order.number;
    });
}

export function sendResetPasswordEmail(email: string): Promise<TSendResetPasswordEmailResponse> {
  return sendPostRequest<TSendResetPasswordEmailRequest, TSendResetPasswordEmailResponse>(
    `${baseUri}/password-reset`,
    {email}
  )
    .then(checkSuccess);
}

export function resetPassword(newPassword: string, emailCode: string): Promise<TResetPasswordResponse> {
  return sendPostRequest<TResetPasswordRequest, TResetPasswordResponse>(
    `${baseUri}/password-reset/reset`,
    {password: newPassword, token: emailCode}
  )
    .then(checkSuccess);
}

export function register(payload: TRegisterRequest): Promise<TRegisterResponse> {
  return sendPostRequest<TRegisterRequest, TRegisterResponse>(`${baseUri}/auth/register`, payload)
    .then(checkSuccess);
}

export function login(email: string, password: string): Promise<TLoginResponse> {
  return sendPostRequest<TLoginRequest, TLoginResponse>(`${baseUri}/auth/login`, {email, password})
    .then(checkSuccess);
}

export function logout(token: string): Promise<TLogoutResponse> {
  return sendPostRequest<TLogoutRequest, TLogoutResponse>(`${baseUri}/auth/logout`, {token})
    .then(checkSuccess);
}

export function getUser(): Promise<TGetUserResponse> {
  return executeWithAuth(async () => await sendGetRequestWithAuth<TGetUserResponse>(`${baseUri}/auth/user`))
    .then(checkSuccess);
}

export function editUser(user: TEditUserRequest): Promise<TEditUserResponse> {
  return executeWithAuth(async () => await sendPatchRequestWithAuth<TEditUserRequest, TEditUserResponse>(
    `${baseUri}/auth/user`,
    user)
  )
    .then(checkSuccess);
}

async function executeWithAuth<T>(request: Function) {
  const expiresAtTicks = localStorage.getItem('expiresAt');
  const currentTicks = new Date().getTime().toString();

  if (!expiresAtTicks || currentTicks >= expiresAtTicks)
    await refreshToken();

  try {
    return await request();
  } catch (exc) {
    if (!(exc as Error).message.includes('jwt expired'))
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

export function checkSuccess<T>(response: TServerResponse<T>): Promise<TServerResponse<T>> {
  if (response && response.success) {
    return Promise.resolve(response);
  }

  return Promise.reject(`Ответ не success: ${response}`);
}
