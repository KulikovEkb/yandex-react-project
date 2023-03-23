import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import { compose } from 'redux';
import {rootReducer} from "./root-reducer";

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

export const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const enhancer = composeEnhancers(applyMiddleware(thunk));
// todo(kulikov): replace with configureStore
export const store = createStore(rootReducer, enhancer);
