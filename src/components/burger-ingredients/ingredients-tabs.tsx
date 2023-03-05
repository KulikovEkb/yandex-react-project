import styles from './burger-ingredients.module.css';
import {Tab} from "@ya.praktikum/react-developer-burger-ui-components";
import React, {forwardRef, RefObject} from "react";
import {TIngredientCategories} from "./types/ingredient-categories";
import {TIngredientTabsRef} from "./consts/ingredient-tabs-refs";

type TIngredientsTabsProps = {
  current: string;
  setCurrent: (current: string) => void;
};

const IngredientsTabs = forwardRef<TIngredientTabsRef, TIngredientsTabsProps>(({current, setCurrent}, ref) => {
  const onTabClick = (tab: string) => {
    setCurrent(tab);

    // todo(kulikov): uncomment if possible
    // @ts-ignore
    ref.current[tab].clickRef.current.scrollIntoView({behavior: 'smooth'});
  }

  return (
    <div className={`${styles.ingredientsTab} mt-5`}>
      <Tab value='Булки' active={current === 'Булки'} onClick={onTabClick}>
        Булки
      </Tab>
      <Tab value='Соусы' active={current === 'Соусы'} onClick={onTabClick}>
        Соусы
      </Tab>
      <Tab value='Начинки' active={current === 'Начинки'} onClick={onTabClick}>
        Начинки
      </Tab>
    </div>
  );
});

export default IngredientsTabs;
