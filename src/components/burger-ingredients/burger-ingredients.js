import styles from './burger-ingredients.module.css';
import scrollBarStyles from '../../utils/scroll-bar.module.css'
import {Counter, CurrencyIcon, Tab} from "@ya.praktikum/react-developer-burger-ui-components";
import React, {forwardRef, useRef, useState} from "react";
import PropTypes from "prop-types";
import {ingredientShape} from "../../shapes/shapes";
import IngredientDetails from "../ingredient-details/ingredient-details";
import Modal from "../modal/modal";

const BurgerIngredients = ({ingredients}) => {
  const tabsRef = useRef({});

  if (!ingredients || Object.keys(ingredients).length === 0) return null;

  return (
    <div className={`${styles.ingredients} pt-10`}>
      <Header ref={tabsRef}/>
      <IngredientsSection ref={tabsRef} ingredientsData={ingredients}/>
    </div>
  );
}

const Header = forwardRef((props, ref) => {
  return (
    <div className={styles.header}>
      <p className='text text_type_main-large'>Соберите бургер</p>
      <IngredientsTab ref={ref}/>
    </div>
  );
});

const IngredientsTab = forwardRef((props, ref) => {
  const [current, setCurrent] = React.useState('Булки');

  const onTabClick = (tab) => {
    setCurrent(tab);

    ref.current[tab].scrollIntoView({behavior: 'smooth'});
  }

  return (
    <div className={`${styles.ingredientsTab}`}>
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

const IngredientsSection = forwardRef(({ingredientsData}, ref) => {
  return (
    <div className={`${styles.ingredientsSection} ${scrollBarStyles.scrollBar}`}>
      <IngredientsCards ref={ref} ingredients={ingredientsData.buns} header='Булки'/>
      <IngredientsCards ref={ref} ingredients={ingredientsData.sauces} header='Соусы'/>
      <IngredientsCards ref={ref} ingredients={ingredientsData.fillers} header='Начинки'/>
    </div>
  );
});

const IngredientsCards = forwardRef(({ingredients, header}, ref) => {
  return (
    <div className={styles.cards} ref={x => ref.current[header] = x}>
      <p className='text text_type_main-medium'>{header}</p>
      <div className={`${styles.cardsList} pl-4 pr-2`}>
        {ingredients.map(ingredient => <IngredientCard key={ingredient._id} data={ingredient}/>)}
      </div>
    </div>
  );
});

const IngredientCard = ({data}) => {
  const [isOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <>
      <div className={styles.card} onClick={openModal}>
        <Counter count={1} size='default'/>
        <img className={styles.image} src={data.image} alt={data.name}/>
        <div className={styles.price}>
          <p className={`text text_type_digits-default`}>{data.price}</p>
          <CurrencyIcon type="primary"/>
        </div>
        <p className={`text text_type_main-default ${styles.name}`}>{data.name}</p>
      </div>
      {isOpen && (
        <Modal headerText='Детали ингредиента' closeModal={closeModal}>
          <IngredientDetails ingredient={data}/>
        </Modal>
      )}
    </>
  );
}

const ingredientsShape = PropTypes.shape({
  buns: PropTypes.arrayOf(ingredientShape),
  sauces: PropTypes.arrayOf(ingredientShape),
  fillers: PropTypes.arrayOf(ingredientShape),
})

BurgerIngredients.propTypes = {
  ingredients: ingredientsShape.isRequired,
};

export default BurgerIngredients;
