import {combineReducers} from "redux";
import {commonReducers} from "./reducers/common-reducers";

export const rootReducer = combineReducers({
  common: commonReducers,
});