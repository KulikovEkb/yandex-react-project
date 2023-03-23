import {TIngredientsActions} from "../components/burger-ingredients/store/ingredients-actions";
import {store} from "../services/store";
import {TConstructorActions} from "../components/burger-constructor/store/constructor-actions";
import {ThunkAction, ThunkDispatch} from "redux-thunk";
import {TIngredientDetailsActions} from "../components/ingredient-details/store/ingredient-details-actions";
import {TOrderDetailsActions} from "../components/order-details/store/order-details-actions";
import {TAuthActions} from "../services/auth/auth-actions";

type TApplicationActions =
  | TIngredientsActions
  | TConstructorActions
  | TIngredientDetailsActions
  | TOrderDetailsActions
  | TAuthActions;

export type TRootState = ReturnType<typeof store.getState>;

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, TRootState, never, TApplicationActions>;

export type AppDispatch = ThunkDispatch<TRootState, never, TApplicationActions>;
