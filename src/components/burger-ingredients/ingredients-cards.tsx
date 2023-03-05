import styles from './burger-ingredients.module.css';
import React, {forwardRef} from "react";
import IngredientCard from "./ingredient-card";
import {TIngredient} from "../../types/ingredient";
import {TIngredientTabsRef} from "./consts/ingredient-tabs-refs";

type TIngredientsCardsProps = {
  header: string;
  ingredients: Array<TIngredient>;
}

const IngredientsCards = forwardRef<TIngredientTabsRef, TIngredientsCardsProps>(({ingredients, header}, ref) => {
  return (
    // todo(kulikov): uncomment if possible
    // @ts-ignore
    <div ref={ref.current[header].clickRef} className={styles.cards}>
      {/* todo(kulikov): uncomment if possible
      @ts-ignore */}
      <p ref={ref.current[header].scrollRef} className='text text_type_main-medium'>{header}</p>
      <div className={`${styles.cardsList} pl-4 pr-2`}>
        {ingredients.map(ingredient => <IngredientCard key={ingredient._id} ingredient={ingredient}/>)}
      </div>
    </div>
  );
});

export default IngredientsCards;
