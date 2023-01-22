import {sendGetRequest, sendPostRequest} from "./helpers/http-client-helper";

class NormaClient {
  static baseUri = 'https://norma.nomoreparties.space/api';

  getIngredients = () => {
    return sendGetRequest(`${NormaClient.baseUri}/ingredients`)
      .then(result => result.data);
  }

  createOrder = (elementsIds) => {
    return sendPostRequest(`${NormaClient.baseUri}/orders`, {ingredients: elementsIds})
      .then(result => {
        if (result.success) return result.order.number;

        return Promise.reject(`Ошибка ${result}`);
      });
  }
}

export default new NormaClient();
