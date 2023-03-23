import {Action, ActionCreator, Dispatch} from 'redux';
import {TIngredientsActions} from "../components/burger-ingredients/store/ingredients-actions";
import {store} from "../services/store";
import {TConstructorActions} from "../components/burger-constructor/store/constructor-actions";
import {ThunkAction} from "redux-thunk";

type TApplicationActions = TIngredientsActions | TConstructorActions;

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ActionCreator<ThunkAction<ReturnType, Action, RootState, TApplicationActions>>;
export type AppDispatch = Dispatch<TApplicationActions>;
