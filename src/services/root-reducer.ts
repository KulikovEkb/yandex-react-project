import {combineReducers} from "redux";
import {ingredientsReducer} from "../components/burger-ingredients/store/ingredients-reducer";
import {constructorReducer} from "../components/burger-constructor/store/constructor-reducer";
import {ingredientDetailsReducer} from "../components/ingredient-details/store/ingredient-details-reducer";
import {orderDetailsReducer} from "../components/order-details/store/order-details-reducer";
import {authReducer} from "./auth/auth-reducer";
import {ordersFeedReducer} from "../components/orders-feed/store/orders-feed-reducer";
import {userOrdersFeedReducer} from "../components/user-orders-feed/store/user-orders-feed-reducer";
import {feedOrderDetailsReducer} from "../components/feed-order-details/store/feed-order-details-reducer";

export const rootReducer = combineReducers({
  auth: authReducer,
  ingredients: ingredientsReducer,
  ingredientDetails: ingredientDetailsReducer,
  feedOrderDetails: feedOrderDetailsReducer,
  burgerConstructor: constructorReducer,
  orderDetails: orderDetailsReducer,
  ordersFeed: ordersFeedReducer,
  userOrdersFeed: userOrdersFeedReducer,
});