import * as normaClient from "../../../clients/norma-client";
import {AppDispatch, AppThunk} from "../../../types";

export const CREATE_ORDER_REQUEST: 'CREATE_ORDER_REQUEST' = 'CREATE_ORDER_REQUEST';
export const CREATE_ORDER_SUCCESS: 'CREATE_ORDER_SUCCESS' = 'CREATE_ORDER_SUCCESS';
export const CREATE_ORDER_FAIL: 'CREATE_ORDER_FAIL' = 'CREATE_ORDER_FAIL';

export interface ICreateOrderRequestAction {
  readonly type: 'CREATE_ORDER_REQUEST';
}

export interface ICreateOrderRequestSuccessAction {
  readonly type: 'CREATE_ORDER_SUCCESS';
  readonly orderNumber: number;
}

export interface ICreateOrderRequestFailedAction {
  readonly type: 'CREATE_ORDER_FAIL';
}

export type TOrderDetailsActions =
  | ICreateOrderRequestAction
  | ICreateOrderRequestSuccessAction
  | ICreateOrderRequestFailedAction;

export const createOrder: AppThunk = elementsIds => async function (dispatch: AppDispatch) {
  dispatch({type: CREATE_ORDER_REQUEST});

  try {
    const orderNumber = await normaClient.createOrder(elementsIds);

    dispatch({type: CREATE_ORDER_SUCCESS, orderNumber});
  } catch {
    dispatch({type: CREATE_ORDER_FAIL});
  }
};
