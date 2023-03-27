import styles from './orders-feed.module.css';
import React from 'react';
import FeedList from "./feed-list";
import FeedInfo from "./feed-info";

function OrdersFeed() {
  return (
    <div className={styles.content}>
      <FeedList/>
      <FeedInfo/>
    </div>
  )
}

export default OrdersFeed;
