import * as normaClient from "../../../helpers/http-clients/norma-client";
import {AppDispatch, AppThunk} from "../../../types";

export const CREATE_ORDER_REQUEST: 'CREATE_ORDER_REQUEST' = 'CREATE_ORDER_REQUEST';
export const CREATE_ORDER_SUCCESS: 'CREATE_ORDER_SUCCESS' = 'CREATE_ORDER_SUCCESS';
export const CREATE_ORDER_FAIL: 'CREATE_ORDER_FAIL' = 'CREATE_ORDER_FAIL';

export interface ICreateOrderRequestAction {
  readonly type: typeof CREATE_ORDER_REQUEST;
}

export interface ICreateOrderRequestSuccessAction {
  readonly type: typeof CREATE_ORDER_SUCCESS;
  readonly orderNumber: number;
}

export interface ICreateOrderRequestFailedAction {
  readonly type: typeof CREATE_ORDER_FAIL;
}

export type TOrderDetailsActions =
  | ICreateOrderRequestAction
  | ICreateOrderRequestSuccessAction
  | ICreateOrderRequestFailedAction;

export const createOrder = (elementsIds: string[]): AppThunk => async function (dispatch: AppDispatch) {
  dispatch({type: CREATE_ORDER_REQUEST});

  try {
    const orderNumber = await normaClient.createOrder(elementsIds);

    dispatch({type: CREATE_ORDER_SUCCESS, orderNumber});
  } catch {
    dispatch({type: CREATE_ORDER_FAIL});
  }
};
