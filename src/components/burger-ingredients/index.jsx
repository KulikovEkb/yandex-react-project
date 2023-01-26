import styles from './burger-ingredients.module.css';
import React from "react";
import {useSelector} from "react-redux";
import {objectIsEmpty} from "../../helpers/collection-helper";
import IngredientsSection from "./ingredients-section";
import Header from "./header";

const BurgerIngredients = () => {
  const {ingredients} = useSelector(store => store.ingredients);

  if (objectIsEmpty(ingredients)) return null;

  return (
    <div className={`${styles.ingredients} pt-10`}>
      <Header/>
      <IngredientsSection ingredients={ingredients}/>
    </div>
  );
}

export default BurgerIngredients;
