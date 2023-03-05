import styles from './burger-ingredients.module.css';
import React, {forwardRef} from "react";
import IngredientCard from "./ingredient-card";

const IngredientsCards = forwardRef(({ingredients, header}, ref) => {
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
