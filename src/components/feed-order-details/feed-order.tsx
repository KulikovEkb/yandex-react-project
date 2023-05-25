import React, {useEffect, useMemo, useState} from "react";
import {getIngredientsState} from "../burger-ingredients/store/ingredients-selectors";
import {TIngredient} from "../../types/ingredient";
import {useSelector} from "../../types";
import styles from "./feed-order-details.module.css";
import {TOrder} from "../../types/order";
import {getOrder} from "../../helpers/http-clients/norma-client";
import {Loader} from "../loader/loader";
import FeedOrderContent from "./feed-order-content";

interface IFeedOrderDetailsState {
  isLoading: boolean
  hasError: boolean
  order: TOrder | null
}

const FeedOrder = ({orderNumber}: { orderNumber: string }) => {
  const {ingredientsMap} = useSelector(getIngredientsState);

  const [state, setState] = useState<IFeedOrderDetailsState>({
    isLoading: true,
    hasError: false,
    order: null,
  });

  useEffect(() => {
    const fetchOrderData = async () => {
      setState({...state, isLoading: true});
      const getOrderResult = await getOrder(orderNumber);

      if (!!getOrderResult) {
        setState({...state, isLoading: false, order: getOrderResult});
      } else {
        setState({...state, isLoading: false, hasError: true});
      }
    }

    fetchOrderData();
  }, [orderNumber]);

  const orderData = useMemo(() => {
    if (!state.order) return null;

    const orderIngredientsMap = new Map<string, { ingredient: TIngredient, quantity: number }>();
    let sum = 0;

    for (const ingredientId of state.order.ingredients) {
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
      number: state.order.number,
      name: state.order.name,
      status: state.order.status,
      createdAt: new Date(state.order.createdAt),
      sum: sum,
      ingredients: Array.from(orderIngredientsMap.values()),
    }
  }, [state.order, ingredientsMap]);

  return (
    state.isLoading ? (
      <Loader size='huge'/>
    ) : state.hasError ? (
      <p className={`${styles.error} text text_type_main-medium`}>
        Ошибка при получении заказа.<br/>Попробуйте ещё раз.
      </p>
    ) : (
      <FeedOrderContent orderData={orderData}/>
    )
  );
}

export default FeedOrder;
