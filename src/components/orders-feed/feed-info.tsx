import React from "react";
import styles from './feed-info.module.css';
import {useSelector} from "../../types";
import {getOrdersFeedState} from "./store/orders-feed-selectors";

function FeedInfo() {
  const {orders, total, totalToday} = useSelector(getOrdersFeedState);

  return (
    <div className={styles.content}>
      <div className={styles.number_order}>
        <div className={styles.order_done}>
          <h3 className={`mb-6 text text_type_main-medium ${styles.text}`}>Готовы:</h3>
          <ul className={`text text_type_digits-default ${styles.list_order} ${styles.list_order_done}`}>
            {orders.map((el, index) => {
              if (el.status === 'done' && index < 30) {
                return (
                  <li className={styles.list_element} key={el._id}>
                    {el.number}
                  </li>
                )
              } else {
                return null
              }
            })}
          </ul>
        </div>
        <div className={styles.order_inwork}>
          <h3 className={`mb-6 text text_type_main-medium ${styles.text}`}>В работе:</h3>
          <ul className={`text text_type_digits-default ${styles.list_order}`}>
            {orders.map((el, index) => {
              if (el.status !== 'done' && index < 30) {
                return (
                  <li className={styles.list_element} key={el._id}>
                    {el.number}
                  </li>
                )
              } else {
                return null
              }
            })}
          </ul>
        </div>
      </div>
      <div className={styles.all_orderdone}>
        <h3 className={`text text_type_main-medium ${styles.text}`}>Выполнено за все время:</h3>
        <p className={`text text_type_digits-large ${styles.number_info}`}>{total}</p>
      </div>
      <div className={styles.all_orderdone_today}>
        <h3 className={`text text_type_main-medium ${styles.text}`}>Выполнено за сегодня:</h3>
        <p className={`text text_type_digits-large ${styles.number_info}`}>{totalToday}</p>
      </div>
    </div>
  )
}

export default FeedInfo;
