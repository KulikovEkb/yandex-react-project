import {combineReducers} from "redux";
import {ingredientsReducer} from "../components/burger-ingredients/reducers/ingredients-reducer";
import {constructorReducer} from "../components/burger-constructor/reducers/constructor-reducer";
import {ingredientDetailsReducer} from "../components/ingredient-details/reducers/ingredient-details-reducer";
import {orderDetailsReducer} from "../components/order-details/reducers/order-details-reducer";

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  ingredientDetails: ingredientDetailsReducer,
  constructorReducer: constructorReducer,
  orderDetails: orderDetailsReducer,
});