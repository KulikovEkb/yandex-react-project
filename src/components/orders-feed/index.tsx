import styles from './orders-feed.module.css';
import React from 'react';
import Orders from "./orders";
import OrdersSummary from "./orders-summary";
import {useSelector} from "../../types";
import {getOrdersFeedState} from "./store/orders-feed-selectors";

function OrdersFeed() {
  const {orders} = useSelector(getOrdersFeedState);

  return (
    <div className={styles.feed}>
      <Orders orders={orders}/>
      <OrdersSummary/>
    </div>
  )
}

export default OrdersFeed;
