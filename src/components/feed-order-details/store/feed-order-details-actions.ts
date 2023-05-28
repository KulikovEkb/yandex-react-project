import {AppDispatch, AppThunk} from "../../../types";
import * as normaClient from "../../../helpers/http-clients/norma-client";
import {TOrder} from "../../../types/order";

export const GET_ORDER_REQUEST: 'GET_ORDER_REQUEST' = 'GET_ORDER_REQUEST';
export const GET_ORDER_SUCCESS: 'GET_ORDER_SUCCESS' = 'GET_ORDER_SUCCESS';
export const GET_ORDER_FAIL: 'GET_ORDER_FAIL' = 'GET_ORDER_FAIL';

export interface IGetOrderAction {
  readonly type: typeof GET_ORDER_REQUEST;
}

export interface IGetOrderSuccessAction {
  readonly type: typeof GET_ORDER_SUCCESS;
  readonly order: TOrder;
}

export interface IGetOrderFailedAction {
  readonly type: typeof GET_ORDER_FAIL;
}

export type TFeedOrderDetailsActions =
  | IGetOrderAction
  | IGetOrderSuccessAction
  | IGetOrderFailedAction;

export const getOrder = (orderNumber: string): AppThunk => async function (dispatch: AppDispatch) {
  dispatch({type: GET_ORDER_REQUEST});

  try {
    const getOrderResult = await normaClient.getOrder(orderNumber);

    if (!getOrderResult) {
      dispatch({type: GET_ORDER_FAIL});
    } else {
      dispatch({type: GET_ORDER_SUCCESS, order: getOrderResult});
    }
  } catch {
    dispatch({type: GET_ORDER_FAIL});
  }
};
