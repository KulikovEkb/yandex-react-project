import {sendGetRequest, sendPostRequest} from "./helpers/http-client-helper";

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
}

export default NormaClient;
