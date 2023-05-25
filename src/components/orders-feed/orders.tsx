import React from "react";
import styles from './orders-feed.module.css'
import Order from "./order";
import scrollBarStyles from "../../helpers/scroll-bar.module.css";
import {TOrder} from "../../types/order";

type TOrdersFeedOrders = {
  orders: TOrder[];
  profileOrders?: boolean
}

function Orders({orders, profileOrders = false}: TOrdersFeedOrders) {
  const ordersListClassName = profileOrders
    ? `${styles.profileOrdersList} ${scrollBarStyles.scrollBar}`
    : `${styles.ordersList} ${scrollBarStyles.scrollBar}`;

  return (
    <div className={profileOrders ? styles.profileOrders : styles.orders}>
      {!profileOrders && <h1 className="mt-10 mb-5 text text_type_main-large">Лента заказов</h1>}
      <ul className={ordersListClassName}>
        {orders.length > 0
          ? orders.map((el) => <Order key={el._id} data={el} profileOrder={profileOrders}/>)
          : (
            <li className={`text text_type_main-default`}>
              Пока нет ни одного заказа
            </li>
          )}
      </ul>
    </div>
  )
}

export default Orders;
