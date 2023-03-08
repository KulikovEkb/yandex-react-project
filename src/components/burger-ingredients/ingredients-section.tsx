import styles from './burger-ingredients.module.css';
import scrollBarStyles from '../../helpers/scroll-bar.module.css'
import React, {FC, RefObject, useEffect, useRef} from "react";
import {useInView} from "react-intersection-observer";
import {IngredientCategory} from "./consts/ingredient-type";
import IngredientsTabs from "./ingredients-tabs";
import IngredientsCards from "./ingredients-cards";
import {TIngredientCategories} from "./types/ingredient-categories";
import {TIngredients} from "../../types/ingredients";

const IngredientsSection: FC<{ ingredients: TIngredients }> = ({ingredients}) => {
  const [current, setCurrent] = React.useState<string>(IngredientCategory.Buns);

  const [bunsRef, inView] = useInView({
    threshold: 0.5
  });
  const [saucesRef, inView2] = useInView({
    threshold: 0.5
  });
  const [fillersRef, inView3] = useInView({
    threshold: 0.5
  });

  const tabsRef = useRef<{
    [size in TIngredientCategories]: {
      scrollRef: (node?: Element | null) => void;
      clickRef: RefObject<HTMLDivElement>
    }
  }>({
    'Булки': {scrollRef: bunsRef, clickRef: useRef<HTMLDivElement>(null)},
    'Соусы': {scrollRef: saucesRef, clickRef: useRef<HTMLDivElement>(null)},
    'Начинки': {scrollRef: fillersRef, clickRef: useRef<HTMLDivElement>(null)},
  });

  useEffect(() => {
    if (inView) {
      setCurrent('Булки');
    } else if (inView2) {
      setCurrent('Соусы');
    } else if (inView3) {
      setCurrent('Начинки');
    }
  }, [inView, inView2, inView3]);

  return (
    <>
      <IngredientsTabs ref={tabsRef} current={current} setCurrent={setCurrent}/>

      <div className={`${styles.ingredientsSection} ${scrollBarStyles.scrollBar} mt-10`}>
        <IngredientsCards ref={tabsRef} ingredients={ingredients.buns} header='Булки'/>
        <IngredientsCards ref={tabsRef} ingredients={ingredients.sauces} header='Соусы'/>
        <IngredientsCards ref={tabsRef} ingredients={ingredients.fillers} header='Начинки'/>
      </div>
    </>
  );
}

export default IngredientsSection;
