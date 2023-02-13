import {sendGetRequest, sendGetRequestWithAuth, sendPostRequest} from "./helpers/http-client-helper";

// todo(kulikov): use Result instead of try-catch blocks
class NormaClient {
  static baseUri = 'https://norma.nomoreparties.space/api';

  static getIngredients() {
    return sendGetRequest(`${this.baseUri}/ingredients`)
      .then(result => result.data);
  }

  static createOrder(elementsIds) {
    return sendPostRequest(`${this.baseUri}/orders`, {ingredients: elementsIds})
      .then(result => {
        if (result.success) return result.order.number;

        return Promise.reject(`Ошибка ${result}`);
      });
  }

  static sendResetPasswordEmail(email) {
    return sendPostRequest(`${this.baseUri}/password-reset`, {email})
      .then(result => {
        if (result.success) return;

        return Promise.reject(`Ошибка ${result}`);
      });
  }

  static resetPassword(newPassword, emailCode) {
    return sendPostRequest(`${this.baseUri}/password-reset/reset`, {password: newPassword, token: emailCode})
      .then(result => {
        if (result.success) return;

        return Promise.reject(`Ошибка ${result}`);
      });
  }

  static register(payload) {
    return sendPostRequest(`${this.baseUri}/auth/register`, payload)
      .then(result => {
        if (result.success) return result;

        return Promise.reject(`Ошибка ${result}`);
      });
  }

  static login(email, password) {
    return sendPostRequest(`${this.baseUri}/auth/login`, {email, password})
      .then(result => {
        if (result.success) return result;

        return Promise.reject(`Ошибка ${result}`);
      });
  }

  static refreshToken(token) {
    return sendPostRequest(`${this.baseUri}/auth/token`, {token})
      .then(result => {
        if (result.success) return result;

        return Promise.reject(`Ошибка ${result}`);
      });
  }

  static logout(token) {
    return sendPostRequest(`${this.baseUri}/auth/logout`, {token})
      .then(result => {
        if (result.success) return result;

        return Promise.reject(`Ошибка ${result}`);
      });
  }

  static getUser() {
    return sendGetRequestWithAuth(`${this.baseUri}/auth/user`)
      .then(result => {
        if (result.success) return result;

        return Promise.reject(`Ошибка ${result}`);
      });
  }
}

export default NormaClient;
