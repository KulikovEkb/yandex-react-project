import {ingredientsReducer} from "./ingredients-reducer";
import {
  DECREMENT_INGREDIENT_COUNTER,
  GET_INGREDIENTS_FAIL,
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS, INCREMENT_INGREDIENT_COUNTER,
  SET_BUN_ID
} from "./ingredients-actions";

const initialState = {
  ingredients: null, ingredientsMap: new Map(), getIngredientsRequest: false, getIngredientsFail: false,

  bunId: null, countersMap: new Map(),
};

describe('burger ingredients reducer', function () {
  it('should return the initial state', function () {
    expect(ingredientsReducer(undefined, {})).toEqual(initialState);
  });

  it('should set `get-ingredients` request started', function () {
    expect(ingredientsReducer({...initialState}, {type: GET_INGREDIENTS_REQUEST}))
      .toEqual({...initialState, getIngredientsRequest: true})
  });

  it('should set `get-ingredients` request failed', function () {
    expect(ingredientsReducer({...initialState}, {type: GET_INGREDIENTS_FAIL}))
      .toEqual({...initialState, getIngredientsRequest: false, getIngredientsFail: true})
  });

  it('should set `get-ingredients` request succeeded', function () {
    const bun = {
      "_id": "60666c42cc7b410027a1a9b1",
      "name": "Краторная булка N-200i",
      "type": "bun",
      "proteins": 80,
      "fat": 24,
      "carbohydrates": 53,
      "calories": 420,
      "price": 1255,
      "image": "https://code.s3.yandex.net/react/code/bun-02.png",
      "image_large": "https://code.s3.yandex.net/react/code/bun-02-large.png",
    };
    const filler = {
      "_id": "60666c42cc7b410027a1a9b5",
      "name": "Говяжий метеорит (отбивная)",
      "type": "main",
      "proteins": 800,
      "fat": 800,
      "carbohydrates": 300,
      "calories": 2674,
      "price": 3000,
      "image": "https://code.s3.yandex.net/react/code/meat-04.png",
      "image_large": "https://code.s3.yandex.net/react/code/meat-04-large.png",
    }
    const sauce = {
      "_id": "60666c42cc7b410027a1a9b7",
      "name": "Соус Spicy-X",
      "type": "sauce",
      "proteins": 30,
      "fat": 20,
      "carbohydrates": 40,
      "calories": 30,
      "price": 90,
      "image": "https://code.s3.yandex.net/react/code/sauce-02.png",
      "image_large": "https://code.s3.yandex.net/react/code/sauce-02-large.png",
    };

    expect(ingredientsReducer(
      {...initialState}, {
        type: GET_INGREDIENTS_SUCCESS,
        ingredients: [{...bun}, {...sauce}, {...filler}]
      }))
      .toEqual({
        ...initialState,
        ingredients: {buns: [{...bun}], sauces: [{...sauce}], fillers: [{...filler}]},
        ingredientsMap: new Map([[bun._id, {...bun}], [sauce._id, {...sauce}], [filler._id, {...filler}]]),
        countersMap: new Map([[bun._id, 0], [sauce._id, 0], [filler._id, 0]]),
      })
  });

  it('should set bun ID', function () {
    expect(ingredientsReducer({...initialState}, {type: SET_BUN_ID, id: 'bun_id'}))
      .toEqual({...initialState, bunId: 'bun_id'})
  });

  describe('counters', function () {
    const countersState = {...initialState, countersMap: new Map([['ingredient_id', 2]])};

    it('should be incremented', function () {
      expect(ingredientsReducer({...countersState}, {type: INCREMENT_INGREDIENT_COUNTER, id: 'ingredient_id'}))
        .toEqual({...initialState, countersMap: new Map([['ingredient_id', 3]])})
    });

    it('should be decremented', function () {
      expect(ingredientsReducer({...countersState}, {type: DECREMENT_INGREDIENT_COUNTER, id: 'ingredient_id'}))
        .toEqual({...initialState, countersMap: new Map([['ingredient_id', 1]])})
    });
  })
})