import React from "react";
import styles from './feed-list.module.css'
import OrderLiElement from "./orderLiElement";
import {useSelector} from "../../types";
import {getOrdersFeedState} from "./store/orders-feed-selectors";

function FeedList() {
  const {orders} = useSelector(getOrdersFeedState);

  return (
    <div className={styles.content}>
      <h1 className="mt-10 mb-5 text text_type_main-large">Лента заказов</h1>
      <ul className={styles.list}>
        {orders.length !== 0
          ? orders.map((el) => (<OrderLiElement key={el._id} data={el}/>))
          : (
            <li className={`text text_type_main-default ${styles.drop_container_main}`}>
              Пока нет ни одного заказа
            </li>
          )}
      </ul>
    </div>
  )
}

export default FeedList;
