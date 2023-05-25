import React from "react";
import styles from "./feed-order-details.module.css";
import scrollBarStyles from "../../helpers/scroll-bar.module.css";
import {CurrencyIcon, FormattedDate} from "@ya.praktikum/react-developer-burger-ui-components";
import {getStatusText} from "../../helpers/order-helper";
import FeedOrderIngredient from "./feed-order-details-ingredient";
import {TOrderData} from "./types/order-data";

const FeedOrderContent = ({orderData}: { orderData: TOrderData }) => {
  if (!orderData) return null;

  return (
    <div className={styles.modalContent}>
      <p className='text text_type_main-medium mt-5'>{orderData!.name}</p>
      <p className={`text text_type_main-default ${styles.orderStatus}`}>{getStatusText(orderData!.status)}</p>

      <p className='text text_type_main-medium mt-15'>Состав:</p>
      <ul className={`${scrollBarStyles.scrollBar} ${styles.ingredientsList}`}>
        {orderData!.ingredients.map(x =>
          <li key={x.ingredient._id} className={styles.ingredient}>
            <FeedOrderIngredient ingredient={x.ingredient} quantity={x.quantity}/>
          </li>
        )}
      </ul>

      <div className={styles.footer}>
        <FormattedDate date={orderData!.createdAt} className={`text text_type_main-default text_color_inactive`}/>
        <div className={styles.orderSum}>
          <p className={`mr-2 text text_type_digits-default`}>{orderData!.sum}</p>
          <CurrencyIcon type="primary"/>
        </div>
      </div>
    </div>
  );
}

export default FeedOrderContent;
