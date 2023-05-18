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
  profileOrder?: boolean
}

function Order({data, profileOrder = false}: TOrdersFeedOrder) {
  const {ingredientsMap} = useSelector(getIngredientsState);
  let location = useLocation();
  const {name, number, ingredients, status, createdAt} = data;

  const width = profileOrder ? '796px' : '536px'

  const orderIngredientsMap = new Map<string, TIngredient>;
  let totalPrice = 0;

  for (const ingredientId of ingredients) {
    const ingredient = ingredientsMap.get(ingredientId)!;

    totalPrice += ingredient.price;

    if (!orderIngredientsMap.has(ingredientId))
      orderIngredientsMap.set(ingredientId, ingredient);
  }

  const orderIngredients = Array.from(orderIngredientsMap.values());

  const statusClassName = status === 'done'
    ? `mt-2 text text_type_main-default ${styles.doneStatus}`
    : 'mt-2 text text_type_main-default';

  return (
    <Link to={`${profileOrder ? '/profile/orders' : '/feed'}/${number}`} state={{background: location}}
          className={styles.link}>
      <li className={styles.order} style={{width: width}}>
        <div className={styles.info}>
          <p className={`text text_type_digits-default ${styles.number}`}>#{number}</p>
          <FormattedDate date={new Date(createdAt)} className={`text text_type_main-small text_color_inactive`}/>
        </div>
        <div>
          <p className={`text text_type_main-medium ${styles.name}`}>{name}</p>
          {profileOrder && <p className={statusClassName}>{getStatusText(status)} </p>}
        </div>
        <div className={styles.ingredients}>
          <ul className={styles.images}>{
            orderIngredients.map((ingredient, index) => {
              if (index > 5)
                return null;

              const isExtraIngredients = orderIngredients.length > 6 && index === 5;

              return (
                <li className={styles.borderImage} key={ingredient._id}>
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
      </li>
    </Link>
  )
}

export default Order;
