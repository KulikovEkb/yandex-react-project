import {TIngredientsActions} from "../components/burger-ingredients/store/ingredients-actions";
import {TConstructorActions} from "../components/burger-constructor/store/constructor-actions";
import {ThunkAction, ThunkDispatch} from "redux-thunk";
import {TIngredientDetailsActions} from "../components/ingredient-details/store/ingredient-details-actions";
import {TOrderDetailsActions} from "../components/order-details/store/order-details-actions";
import {TAuthActions} from "../services/auth/auth-actions";
import {TypedUseSelectorHook, useSelector as selectorHook, useDispatch as dispatchHook} from "react-redux";
import {rootReducer} from "../services/root-reducer";
import {TOrdersFeedActions} from "../components/orders-feed/store/orders-feed-actions";
import {TUserOrdersFeedActions} from "../components/user-orders-feed/store/user-orders-feed-actions";
import {TFeedOrderDetailsActions} from "../components/feed-order-details/store/feed-order-details-actions";

export type TApplicationActions =
  | TIngredientsActions
  | TConstructorActions
  | TIngredientDetailsActions
  | TFeedOrderDetailsActions
  | TOrderDetailsActions
  | TAuthActions
  | TOrdersFeedActions
  | TUserOrdersFeedActions;

export type TRootState = ReturnType<typeof rootReducer>;

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, TRootState, never, TApplicationActions>;

export type AppDispatch = ThunkDispatch<TRootState, never, TApplicationActions>;

export const useDispatch = () => dispatchHook<AppDispatch>()
export const useSelector: TypedUseSelectorHook<TRootState> = selectorHook
