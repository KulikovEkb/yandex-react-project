const categorizeIngredients = (data) => {
  const ingredients = {
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