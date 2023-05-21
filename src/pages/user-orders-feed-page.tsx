import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "../types";
import {
  startUserOrdersFeedConnectionAction,
  stopUserOrdersFeedConnectionAction
} from "../components/user-orders-feed/store/user-orders-feed-actions";
import Orders from "../components/orders-feed/orders";
import {getCookie} from "../helpers/cookie-helper";
import {getUserOrdersFeedState} from "../components/user-orders-feed/store/user-orders-feed-selectors";

function UserOrdersFeedPage() {
  const dispatch = useDispatch();
  const token = getCookie('normaToken')?.replace('Bearer ', '');

  useEffect(() => {
    dispatch(startUserOrdersFeedConnectionAction(`wss://norma.nomoreparties.space/orders?token=${token}`));

    return () => {
      dispatch(stopUserOrdersFeedConnectionAction());
    }
  }, [dispatch, token]);


  const {orders} = useSelector(getUserOrdersFeedState);

  return (
    <Orders orders={orders} profileOrders={true}/>
  )
}

export default UserOrdersFeedPage;
