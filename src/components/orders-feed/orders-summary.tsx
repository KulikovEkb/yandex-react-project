import React, {useMemo} from "react";
import styles from './orders-feed.module.css';
import {useSelector} from "../../types";
import {getOrdersFeedState} from "./store/orders-feed-selectors";
import {TOrder} from "../../types/order";
import OrdersSummaryOrdersNumbers from "./orders-summary-orders-numbers";
import OrdersSummaryOrdersCount from "./orders-summary-orders-count";

function OrdersSummary() {
  const {orders, total, totalToday} = useSelector(getOrdersFeedState);

  const {completedOrders, ordersInProcess} = useMemo(() => {
    const completedOrders: TOrder[] = [];
    const ordersInProcess: TOrder[] = [];

    for (const order of orders) {
      if (completedOrders.length < 30 && order.status === 'done')
        completedOrders.push(order);
      else if (ordersInProcess.length < 30 && order.status !== 'done')
        ordersInProcess.push(order);
    }

    return {completedOrders, ordersInProcess};
  }, [orders]);

  return (
    <div className={styles.ordersSummary}>
      <div className={styles.ordersNumbersSection}>
        <OrdersSummaryOrdersNumbers orders={completedOrders} isForCompletedOrders={true}/>
        <OrdersSummaryOrdersNumbers orders={ordersInProcess} isForCompletedOrders={false}/>
      </div>
      <OrdersSummaryOrdersCount header='Выполнено за все время:' count={total}/>
      <OrdersSummaryOrdersCount header='Выполнено за сегодня:' count={totalToday}/>
    </div>
  )
}

export default OrdersSummary;
