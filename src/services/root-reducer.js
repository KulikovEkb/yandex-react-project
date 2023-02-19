import {combineReducers} from "redux";
import {ingredientsReducer} from "../components/burger-ingredients/reducers/ingredients-reducer";
import {constructorReducer} from "../components/burger-constructor/reducers/constructor-reducer";
import {ingredientDetailsReducer} from "../components/ingredient-details/reducers/ingredient-details-reducer";
import {orderDetailsReducer} from "../components/order-details/reducers/order-details-reducer";
import {authReducer} from "./auth/auth-reducer";

export const rootReducer = combineReducers({
  auth: authReducer,
  ingredients: ingredientsReducer,
  ingredientDetails: ingredientDetailsReducer,
  burgerConstructor: constructorReducer,
  orderDetails: orderDetailsReducer,
});