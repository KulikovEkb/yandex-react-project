import {constructorReducer} from './constructor-reducer'
import * as types from './constructor-actions'
import {v4 as newGuid} from 'uuid'

const initialState = {
  bun: null,
  fillers: [],
};

describe('burger constructor reducer', () => {
  it('should return the initial state', () => {
    expect(constructorReducer(undefined, {})).toEqual(initialState);
  });

  it('should handle ADD_BUN', () => {
    const bun = {
      "_id": "60666c42cc7b410027a1a9b2",
      "name": "Флюоресцентная булка R2-D3",
      "type": "bun",
      "proteins": 44,
      "fat": 26,
      "carbohydrates": 85,
      "calories": 643,
      "price": 988,
      "image": "https://code.s3.yandex.net/react/code/bun-01.png",
      "image_large": "https://code.s3.yandex.net/react/code/bun-01-large.png",
    };

    expect(constructorReducer({...initialState}, {
      type: types.ADD_BUN, bun: {...bun},
    })).toEqual({...initialState, bun: {...bun}});
  });

  describe('ingredients', () => {
    const ingredient = {
      "_id": "60666c42cc7b410027a1a9bb",
      "key": newGuid(),
      "name": "Хрустящие минеральные кольца",
      "type": "main",
      "proteins": 808,
      "fat": 689,
      "carbohydrates": 609,
      "calories": 986,
      "price": 300,
      "image": "https://code.s3.yandex.net/react/code/mineral_rings.png",
      "image_large": "https://code.s3.yandex.net/react/code/mineral_rings-large.png",
    };
    const ingredientsState = {...initialState, fillers: [{...ingredient}]};

    it('should add ingredient to initial state', () => {
      expect(constructorReducer({...initialState}, {type: types.ADD_INGREDIENT, ingredient: {...ingredient}}))
        .toEqual({...initialState, fillers: [{...ingredient}]})
    });

    it('should add ingredient to state with existing ingredient', () => {
      const secondIngredient = {
        "_id": "60666c42cc7b410027a1a9b9",
        "key": newGuid(),
        "name": "Соус традиционный галактический",
        "type": "sauce",
        "proteins": 42,
        "fat": 24,
        "carbohydrates": 42,
        "calories": 99,
        "price": 15,
        "image": "https://code.s3.yandex.net/react/code/sauce-03.png",
        "image_large": "https://code.s3.yandex.net/react/code/sauce-03-large.png",
      };

      expect(constructorReducer({...ingredientsState}, {
        type: types.ADD_INGREDIENT,
        ingredient: {...secondIngredient}
      }))
        .toEqual({...ingredientsState, fillers: [{...secondIngredient}, ...ingredientsState.fillers]});
    });

    it('should remove ingredient', () => {
      expect(constructorReducer({...ingredientsState}, {type: types.REMOVE_INGREDIENT, key: ingredient.key}))
        .toEqual({...ingredientsState, fillers: []})
    });

    it('should set ingredients', () => {
      expect(constructorReducer({...initialState}, {type: types.SET_INGREDIENTS, ingredients: [{...ingredient}]}))
        .toEqual({...initialState, fillers: [{...ingredient}]})
    });
  })
})