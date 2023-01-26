import styles from './burger-ingredients.module.css';
import scrollBarStyles from '../../helpers/scroll-bar.module.css'
import React, {useEffect, useRef} from "react";
import PropTypes from "prop-types";
import {ingredientShape} from "../../shapes/shapes";
import {useInView} from "react-intersection-observer";
import {IngredientCategory} from "../../consts/ingredient-type";
import IngredientsTabs from "./ingredients-tabs";
import IngredientsCards from "./ingredients-cards";

const IngredientsSection = ({ingredients}) => {
  const [current, setCurrent] = React.useState(IngredientCategory.Buns);

  const [bunsRef, inView, entry] = useInView({
    threshold: 0.5
  });
  const [saucesRef, inView2, entry2] = useInView({
    threshold: 0.5
  });
  const [fillersRef, inView3, entry3] = useInView({
    threshold: 0.5
  });

  const tabsRef = useRef({});
  tabsRef.current[IngredientCategory.Buns] = {scrollRef: bunsRef, clickRef: useRef(null)};
  tabsRef.current[IngredientCategory.Sauces] = {scrollRef: saucesRef, clickRef: useRef(null)};
  tabsRef.current[IngredientCategory.Fillers] = {scrollRef: fillersRef, clickRef: useRef(null)};

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

const ingredientsShape = PropTypes.shape({
  buns: PropTypes.arrayOf(ingredientShape),
  sauces: PropTypes.arrayOf(ingredientShape),
  fillers: PropTypes.arrayOf(ingredientShape),
})

IngredientsSection.propTypes = {
  ingredients: ingredientsShape.isRequired,
};

export default IngredientsSection;
