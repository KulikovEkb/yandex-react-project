import styles from './burger-ingredients.module.css';
import {Tab} from "@ya.praktikum/react-developer-burger-ui-components";
import React, {forwardRef} from "react";
import {TIngredientTabsRef} from "./types/ingredient-tabs-refs";
import {TIngredientCategories} from "./types/ingredient-categories";

type TIngredientsTabsProps = {
  current: TIngredientCategories;
  setCurrent: (current: TIngredientCategories) => void;
};

const IngredientsTabs = forwardRef<TIngredientTabsRef, TIngredientsTabsProps>(({current, setCurrent}, ref) => {
  const onTabClick = (tab: string) => {
    if (ref === null || typeof ref === "function" || ref.current === null)
      throw new Error("forwarded refs for  are invalid");

    const castedTab = tab as TIngredientCategories;
    setCurrent(castedTab);

    ref.current[castedTab].clickRef.current!.scrollIntoView({behavior: 'smooth'});
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
