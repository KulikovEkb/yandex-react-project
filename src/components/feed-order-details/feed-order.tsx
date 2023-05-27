import React, {useEffect, useMemo} from "react";
import {getIngredientsState} from "../burger-ingredients/store/ingredients-selectors";
import {TIngredient} from "../../types/ingredient";
import {useDispatch, useSelector} from "../../types";
import styles from "./feed-order-details.module.css";
import {Loader} from "../loader/loader";
import FeedOrderContent from "./feed-order-content";
import {getFeedOrderDetailsState} from "./store/feed-order-details-selectors";
import {getOrder} from "./store/feed-order-details-actions";

const FeedOrder = ({orderNumber}: { orderNumber: string }) => {
  const dispatch = useDispatch();
  const {ingredientsMap} = useSelector(getIngredientsState);
  const {isLoading, hasError, order} = useSelector(getFeedOrderDetailsState);

  useEffect(() => {
    dispatch(getOrder(orderNumber));
  }, [orderNumber]);

  const orderData = useMemo(() => {
    if (!order) return null;

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
  }, [order, ingredientsMap]);

  return (
    isLoading ? (
      <Loader size='huge'/>
    ) : hasError ? (
      <p className={`${styles.error} text text_type_main-medium`}>
        Ошибка при получении заказа.<br/>Попробуйте ещё раз.
      </p>
    ) : (
      <FeedOrderContent orderData={orderData}/>
    )
  );
}

export default FeedOrder;
