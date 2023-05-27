import * as actions from './feed-order-details-actions';
import {TOrder} from "../../../types/order";
import {TFeedOrderDetailsActions} from "./feed-order-details-actions";

interface TFeedOrderDetailsState {
  isLoading: boolean
  hasError: boolean
  order: TOrder | null
}

const initialState: TFeedOrderDetailsState = {
  isLoading: false,
  hasError: false,
  order: null,
};

export function feedOrderDetailsReducer(state = initialState, action: TFeedOrderDetailsActions): TFeedOrderDetailsState {
  switch (action.type) {
    case actions.GET_ORDER_REQUEST: {
      return {...state, isLoading: true};
    }

    case actions.GET_ORDER_SUCCESS: {
      return { ...state, isLoading: false, order: action.order };
    }

    case actions.GET_ORDER_FAIL: {
      return { ...state, isLoading: false, hasError: true };
    }

    default: {
      return state;
    }
  }
}
