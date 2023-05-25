import React from "react";
import styles from './orders-feed.module.css'
import Order from "./order";
import scrollBarStyles from "../../helpers/scroll-bar.module.css";
import {TOrder} from "../../types/order";

type TOrdersFeedOrders = {
  orders: TOrder[];
  areProfileOrders?: boolean
}

function Orders({orders, areProfileOrders = false}: TOrdersFeedOrders) {
  const ordersListClassName =
    `${areProfileOrders ? styles.profileOrdersList : styles.ordersList} ${scrollBarStyles.scrollBar}`;

  return (
    <div className={areProfileOrders ? styles.profileOrders : styles.orders}>
      {!areProfileOrders && <h1 className="mt-10 mb-5 text text_type_main-large">Лента заказов</h1>}

      <ul className={ordersListClassName}>
        {
          orders.length > 0
            ? orders.map((order) => <li key={order._id}><Order data={order} isProfileOrder={areProfileOrders}/></li>)
            : <li className={`text text_type_main-default`}> Пока нет ни одного заказа</li>
        }
      </ul>
    </div>
  )
}

export default Orders;
