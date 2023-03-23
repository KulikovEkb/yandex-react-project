import styles from './burger-ingredients.module.css';
import React, {forwardRef} from "react";
import IngredientCard from "./ingredient-card";
import {TIngredient} from "../../types/ingredient";
import {TIngredientTabsRef} from "./consts/ingredient-tabs-refs";
import {TIngredientCategories} from "./types/ingredient-categories";

type TIngredientsCardsProps = {
  header: TIngredientCategories;
  ingredients: Array<TIngredient>;
}

const IngredientsCards = forwardRef<TIngredientTabsRef, TIngredientsCardsProps>(({ingredients, header}, ref) => {
  if (ref === null || typeof ref === "function" || ref.current === null)
    throw new Error("forwarded refs for  are invalid");

  return (
    <div ref={ref.current[header].clickRef} className={styles.cards}>
      <p ref={ref.current[header].scrollRef} className='text text_type_main-medium'>{header}</p>
      <div className={`${styles.cardsList} pl-4 pr-2`}>
        {ingredients.map(ingredient => <IngredientCard key={ingredient._id} ingredient={ingredient}/>)}
      </div>
    </div>
  );
});

export default IngredientsCards;
