import styles from './burger-ingredients.module.css';
import React from "react";
import {useSelector} from "react-redux";
import {objectIsEmpty} from "../../helpers/collection-helper";
import IngredientsSection from "./ingredients-section";
import Header from "./header";
import {getIngredientsState} from "./store/ingredients-selectors";

const BurgerIngredients = () => {
  const {ingredients} = useSelector(getIngredientsState);

  if (objectIsEmpty(ingredients)) return null;

  return (
    <div className={`${styles.ingredients} pt-10`}>
      <Header/>
      <IngredientsSection ingredients={ingredients}/>
    </div>
  );
}

export default BurgerIngredients;
