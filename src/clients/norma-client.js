import categorizeIngredients from "./helpers/ingredients-categorizer";
import {request} from "./helpers/http-client-helper";

class NormaClient {
  static baseUri = 'https://norma.nomoreparties.space/api';

  getIngredients = () => {
    return request(`${NormaClient.baseUri}/ingredients`, {
      method: 'GET',
    })
      .then(response => categorizeIngredients(response.data));
  }

  createOrder = (elementsIds) => {
    return request(`${NormaClient.baseUri}/orders`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ingredients: elementsIds})
    })
      .then(result => {
        if (result.success) return result.order.number;

        return Promise.reject(`Ошибка ${result}`);
      });
  }
}

export default new NormaClient();
