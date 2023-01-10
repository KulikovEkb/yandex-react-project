import categorizeIngredients from "./helpers/ingredients-categorizer";

class NormaClient {
  static baseUri = 'https://norma.nomoreparties.space/api';

  getIngredients = () => {
    return fetch(`${NormaClient.baseUri}/ingredients`, {
      method: 'GET',
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }

        return Promise.reject(`Ошибка ${res.status}`);
      })
      .then(response => categorizeIngredients(response.data));
  }
}

export default new NormaClient();