import React, {useEffect} from 'react';
import {useDispatch} from "../types";
import {
  startOrdersFeedConnectionAction,
  stopOrdersFeedConnectionAction
} from "../components/orders-feed/store/orders-feed-actions";
import OrdersFeed from "../components/orders-feed";

function OrdersFeedPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(startOrdersFeedConnectionAction());

    return () => {
      dispatch(stopOrdersFeedConnectionAction());
    }
  }, [dispatch])

  return (
    <OrdersFeed/>
  )
}

export default OrdersFeedPage;
