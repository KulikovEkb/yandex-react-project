import {Action, ActionCreator, Dispatch} from 'redux';
import {TIngredientsActions} from "../components/burger-ingredients/store/ingredients-actions";
import {store} from "../services/store";
import {TConstructorActions} from "../components/burger-constructor/store/constructor-actions";
import {ThunkAction} from "redux-thunk";
import {TIngredientDetailsActions} from "../components/ingredient-details/store/ingredient-details-actions";
import {TOrderDetailsActions} from "../components/order-details/store/order-details-actions";

type TApplicationActions = TIngredientsActions | TConstructorActions | TIngredientDetailsActions | TOrderDetailsActions;

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ActionCreator<ThunkAction<ReturnType, Action, RootState, TApplicationActions>>;
export type AppDispatch = Dispatch<TApplicationActions>;
