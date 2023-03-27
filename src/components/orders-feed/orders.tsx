import React from "react";
import styles from './orders-feed.module.css'
import OrderLiElement from "./orderLiElement";
import {useSelector} from "../../types";
import {getOrdersFeedState} from "./store/orders-feed-selectors";
import scrollBarStyles from "../../helpers/scroll-bar.module.css";

function Orders() {
  const {orders} = useSelector(getOrdersFeedState);

  return (
    <div className={styles.orders}>
      <h1 className="mt-10 mb-5 text text_type_main-large">Лента заказов</h1>
      <ul className={`${styles.ordersList} ${scrollBarStyles.scrollBar}`}>
        {orders.length > 0
          ? orders.map((el) => <OrderLiElement key={el._id} data={el}/>)
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
