import styles from './orders-feed.module.css';
import React from 'react';
import Orders from "./orders";
import OrdersSummary from "./orders-summary";

function OrdersFeed() {
  return (
    <div className={styles.feed}>
      <Orders/>
      <OrdersSummary/>
    </div>
  )
}

export default OrdersFeed;
