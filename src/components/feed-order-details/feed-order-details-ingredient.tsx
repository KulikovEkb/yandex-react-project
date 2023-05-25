import styles from "./feed-order-details.module.css";
import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import React from "react";
import {TIngredient} from "../../types/ingredient";

const FeedOrderIngredient = ({feedOrderIngredient}: {
  feedOrderIngredient: { ingredient: TIngredient, quantity: number }
}) => {
  return (
    <>
      <div className={styles.ingredientInfo}>
        <img src={feedOrderIngredient.ingredient.image}
             alt={feedOrderIngredient.ingredient.name}
             className={styles.ingredientImage}/>
        <p className='text text_type_main-default'>{feedOrderIngredient.ingredient.name}</p>
      </div>

      <div className={styles.ingredientPrice}>
        <p className='text text_type_digits-default'>{feedOrderIngredient.quantity} x {feedOrderIngredient.ingredient.price}</p>
        <CurrencyIcon type="primary"/>
      </div>
    </>
  );
}

export default FeedOrderIngredient;