import React from "react";
import styles from './order.module.css';
import {CurrencyIcon, FormattedDate} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link, useLocation} from 'react-router-dom';
import {TOrder} from "../../types/order";
import {TIngredient} from "../../types/ingredient";
import {useSelector} from "../../types";
import {getIngredientsState} from "../burger-ingredients/store/ingredients-selectors";
import {getStatusText} from "../../helpers/order-helper";

type TOrdersFeedOrder = {
  data: TOrder;
  isProfileOrder: boolean
}

function Order({data, isProfileOrder}: TOrdersFeedOrder) {
  const {ingredientsMap} = useSelector(getIngredientsState);
  let location = useLocation();
  const {name, number, ingredients, status, createdAt} = data;

  const orderIngredientsMap = new Map<string, TIngredient>();
  let totalPrice = 0;

  for (const ingredientId of ingredients) {
    const ingredient = ingredientsMap.get(ingredientId);

    if (!ingredient) continue;

    totalPrice += ingredient.price;

    if (!orderIngredientsMap.has(ingredientId))
      orderIngredientsMap.set(ingredientId, ingredient);
  }

  const orderIngredients = Array.from(orderIngredientsMap.values());

  const statusClassName = `mt-2 text text_type_main-default ${status === 'done' ? styles.doneStatus : ''}`;

  return (
    <Link to={`${isProfileOrder ? '/profile/orders' : '/feed'}/${number}`}
          state={{background: location}}
          className={styles.link}>
      <div className={isProfileOrder ? styles.profileOrder : styles.order}>
        <div className={styles.info}>
          <p className={`text text_type_digits-default ${styles.number}`}>#{number}</p>
          <FormattedDate date={new Date(createdAt)} className={`text text_type_main-small text_color_inactive`}/>
        </div>

        <div>
          <p className={`text text_type_main-medium ${styles.name}`}>{name}</p>
          {isProfileOrder && <p className={statusClassName}>{getStatusText(status)} </p>}
        </div>

        <div className={styles.ingredients}>
          <ul className={styles.images}>{
            orderIngredients.map((ingredient, index) => {
              if (index > 5)
                return null;

              const isExtraIngredients = orderIngredients.length > 6 && index === 5;

              return (
                <li className={styles.orderImage} key={ingredient._id}>
                  <img className={isExtraIngredients ? styles.extraIngredientsImage : styles.image}
                       src={ingredient.image} alt={ingredient.name}/>
                  {isExtraIngredients && (
                    <p
                      className={`text text_type_main-default ${styles.extraIngredientText}`}>{`+ ${orderIngredients.length - 5}`}
                    </p>
                  )}
                </li>
              )
            })
          }</ul>
          <div className={styles.price}>
            <p className={`mr-2 text text_type_digits-default`}>{totalPrice}</p>
            <CurrencyIcon type="primary"/>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default Order;
