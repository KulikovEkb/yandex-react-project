import Modal from "../modal";
import React, {useMemo} from "react";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import {getIngredientsState} from "../burger-ingredients/store/ingredients-selectors";
import {TIngredient} from "../../types/ingredient";
import {useSelector} from "../../types";
import {getOrdersFeedState} from "../orders-feed/store/orders-feed-selectors";
import styles from "./feed-order-details.module.css";
import scrollBarStyles from "../../helpers/scroll-bar.module.css";
import {CurrencyIcon, FormattedDate} from "@ya.praktikum/react-developer-burger-ui-components";
import {getStatusText} from "../../helpers/order-helper";
import {getUserOrdersFeedState} from "../user-orders-feed/store/user-orders-feed-selectors";
import FeedOrderIngredient from "./feed-order-details-ingredient";

const FeedOrderDetails = () => {
  const {ingredientsMap} = useSelector(getIngredientsState);
  // todo(kulikov): fix
  const {orders} = useSelector(getOrdersFeedState);
  const userOrders = useSelector(getUserOrdersFeedState).orders;
  const location = useLocation();
  const navigate = useNavigate();
  const numberString = useParams().number!;

  const closeModal = React.useCallback(() => {
    location?.state?.background && navigate(location.state.background);
  }, [location.state, navigate]);

  const orderData = useMemo(() => {
    const number = parseInt(numberString);

    // todo(kulikov): fetch order if it is missing
    let order = orders.find(x => x.number === number);
    if (!order) order = userOrders.find(x => x.number === number)!;

    const orderIngredientsMap = new Map<string, { ingredient: TIngredient, quantity: number }>();
    let sum = 0;

    for (const ingredientId of order.ingredients) {
      if (!ingredientId) continue;

      let orderIngredient = orderIngredientsMap.get(ingredientId);

      if (orderIngredient) {
        orderIngredient.quantity++;
      } else {
        orderIngredient = {ingredient: ingredientsMap.get(ingredientId)!, quantity: 1};
      }

      orderIngredientsMap.set(ingredientId, orderIngredient);

      sum += orderIngredient.ingredient.price;
    }

    return {
      number: order.number,
      name: order.name,
      status: order.status,
      createdAt: new Date(order.createdAt),
      sum: sum,
      ingredients: Array.from(orderIngredientsMap.values()),
    }
  }, [numberString, orders, userOrders, ingredientsMap]);

  return (
    <Modal headerText={`#${orderData.number}`} headerIsNumber={true} closeModal={closeModal}>
      <div className={styles.modalContent}>
        <p className='text text_type_main-medium mt-5'>{orderData.name}</p>
        <p className={`text text_type_main-default ${styles.orderStatus}`}>{getStatusText(orderData.status)}</p>

        <p className='text text_type_main-medium mt-15'>Состав:</p>
        <ul className={`${scrollBarStyles.scrollBar} ${styles.ingredientsList}`}>
          {orderData.ingredients.map(x =>
            <li key={x.ingredient._id} className={styles.ingredient}>
              <FeedOrderIngredient feedOrderIngredient={x}/>
            </li>
          )}
        </ul>

        <div className={styles.footer}>
          <FormattedDate date={orderData.createdAt} className={`text text_type_main-default text_color_inactive`}/>
          <div className={styles.orderSum}>
            <p className={`mr-2 text text_type_digits-default`}>{orderData.sum}</p>
            <CurrencyIcon type="primary"/>
          </div>
        </div>
      </div>
    </Modal>);
}

export default FeedOrderDetails;
