import categorizeIngredients from "./helpers/ingredients-categorizer";

class NormaClient {
  static baseUri = 'https://norma.nomoreparties.space/api';

  getIngredients = () => {
    return fetch(`${NormaClient.baseUri}/ingredients`, {
      method: 'GET',
    })
      .then(response => response.ok ? response.json() : Promise.reject(`Ошибка ${response.status}`))
      .then(response => categorizeIngredients(response.data));
  }

  createOrder = (elementsIds) => {
    return fetch(`${NormaClient.baseUri}/orders`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ingredients: elementsIds})
    })
      .then(response => response.ok ? response.json() : Promise.reject(`Ошибка ${response.status}`))
      .then(result => {
        if (result.success) return result.order.number;

        return Promise.reject(`Ошибка ${result}`);
      });
  }
}

export default new NormaClient();
