import {combineReducers} from "redux";
import {ingredientsReducer} from "../components/burger-ingredients/reducers/ingredients-reducer";
import {constructorReducer} from "../components/burger-constructor/reducers/constructor-reducer";

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  constructorReducer: constructorReducer,
});