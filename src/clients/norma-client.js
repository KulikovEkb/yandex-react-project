import categorizeIngredients from "./helpers/ingredients-categorizer";

class normaClient {
  static baseUri = 'https://norma.nomoreparties.space/api';

  getIngredients = async () => {
    return fetch(`${normaClient.baseUri}/ingredients`, {
      method: 'GET',
    })
      .then(r => r.json())
      .then(response => categorizeIngredients(response.data));
  }
}

export default new normaClient();