import {ingredientDetailsReducer} from './ingredient-details-reducer';
import {RESET_DETAILS, SET_DETAILS} from "./ingredient-details-actions";

const initialState = {
  name: '',
  image: '',
  calories: 0,
  proteins: 0,
  fat: 0,
  carbohydrates: 0,
};

describe('ingredient details reducer', function () {
  it('should return the initial state', function () {
    expect(ingredientDetailsReducer(undefined, {})).toEqual(initialState);
  });

  it('should set ingredient details', function () {
    const ingredient = {
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
    };

    expect(ingredientDetailsReducer({...initialState}, {type: SET_DETAILS, ingredient: {...ingredient}}))
      .toEqual({
        ...initialState,
        name: "Говяжий метеорит (отбивная)",
        image: "https://code.s3.yandex.net/react/code/meat-04-large.png",
        calories: 2674,
        proteins: 800,
        fat: 800,
        carbohydrates: 300,
      })
  });

  it('should reset ingredient details', function () {
    const ingredient = {
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
    };

    expect(ingredientDetailsReducer({
      ...initialState,
      name: "Говяжий метеорит (отбивная)",
      image: "https://code.s3.yandex.net/react/code/meat-04-large.png",
      calories: 2674,
      proteins: 800,
      fat: 800,
      carbohydrates: 300,
    }, {type: RESET_DETAILS, ingredient: {...ingredient}}))
      .toEqual({...initialState})
  });
});