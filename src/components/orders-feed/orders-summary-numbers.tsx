import styles from "./orders-feed.module.css";
import React, {FC} from "react";
import {TOrder} from "../../types/order";

const OrdersSummaryNumbers: FC<{ orders: TOrder[], isForCompletedOrders: boolean }> =
  ({orders, isForCompletedOrders}) => {
    return (
      <div className={styles.orderNumbers}>
        <h3 className={`mb-6 text text_type_main-medium`}>В работе:</h3>
        <ul className={
          `text
        text_type_digits-default
        ${isForCompletedOrders ? styles.completedOrdersNumbersList : styles.ordersNumbersList}`
        }>
          {orders.map((order) =>
            <li className={styles.orderNumber} key={order._id}>
              {order.number}
            </li>)}
        </ul>
      </div>
    )
  }

export default OrdersSummaryNumbers;
