import {TIngredient} from "../types/ingredient";
import {TIngredients} from "../types/ingredients";

const categorizeIngredients = (data: Array<TIngredient>): TIngredients => {
  const ingredients: TIngredients = {
    buns: [],
    sauces: [],
    fillers: [],
  };

  for (const i of data) {
    switch (i.type) {
      case 'main':
        ingredients.fillers.push(i);
        break;

      case 'sauce':
        ingredients.sauces.push(i);
        break;

      case 'bun':
        ingredients.buns.push(i);
        break;

      default:
        break;
    }
  }

  return ingredients;
}

export default categorizeIngredients;