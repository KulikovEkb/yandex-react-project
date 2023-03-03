import {combineReducers} from "redux";
import {ingredientsReducer} from "../components/burger-ingredients/store/ingredients-reducer";
import {constructorReducer} from "../components/burger-constructor/store/constructor-reducer";
import {ingredientDetailsReducer} from "../components/ingredient-details/store/ingredient-details-reducer";
import {orderDetailsReducer} from "../components/order-details/store/order-details-reducer";
import {authReducer} from "./auth/auth-reducer";

export const rootReducer = combineReducers({
  auth: authReducer,
  ingredients: ingredientsReducer,
  ingredientDetails: ingredientDetailsReducer,
  burgerConstructor: constructorReducer,
  orderDetails: orderDetailsReducer,
});