import styles from './burger-ingredients.module.css';
import scrollBarStyles from '../../helpers/scroll-bar.module.css'
import {Counter, CurrencyIcon, Tab} from "@ya.praktikum/react-developer-burger-ui-components";
import React, {forwardRef, useRef, useState} from "react";
import PropTypes from "prop-types";
import {ingredientShape} from "../../shapes/shapes";
import IngredientDetails from "../ingredient-details/ingredient-details";
import Modal from "../modal/modal";
import {useDispatch, useSelector} from "react-redux";
import {objectIsEmpty} from "../../helpers/collection-helper";
import {addIngredient} from "./actions/ingredients-actions";
import {INGREDIENT_MODAL_CLOSED, INGREDIENT_MODAL_OPEN} from "../ingredient-details/actions/ingredient-details-actions";

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

const Header = () => {
  return (
    <div className={styles.header}>
      <p className='text text_type_main-large'>Соберите бургер</p>
    </div>
  );
}

const IngredientsSection = ({ingredients}) => {
  const tabsRef = useRef({});

  return (
    <>
      <IngredientsTabs ref={tabsRef}/>

      <div className={`${styles.ingredientsSection} ${scrollBarStyles.scrollBar} mt-10`}>
        <IngredientsCards ref={tabsRef} ingredients={ingredients.buns} header='Булки'/>
        <IngredientsCards ref={tabsRef} ingredients={ingredients.sauces} header='Соусы'/>
        <IngredientsCards ref={tabsRef} ingredients={ingredients.fillers} header='Начинки'/>
      </div>
    </>
  );
}

const IngredientsTabs = forwardRef((props, ref) => {
  const [current, setCurrent] = React.useState('Булки');

  const onTabClick = (tab) => {
    setCurrent(tab);

    ref.current[tab].scrollIntoView({behavior: 'smooth'});
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

const IngredientsCards = forwardRef(({ingredients, header}, ref) => {
  return (
    <div className={styles.cards} ref={x => ref.current[header] = x}>
      <p className='text text_type_main-medium'>{header}</p>
      <div className={`${styles.cardsList} pl-4 pr-2`}>
        {ingredients.map(ingredient => <IngredientCard key={ingredient._id} ingredient={ingredient}/>)}
      </div>
    </div>
  );
});

const IngredientCard = ({ingredient}) => {
  const {bunId, countersMap} = useSelector(store => store.ingredients);
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();

  function openModal() {
    setIsOpen(true);
    dispatch({type: INGREDIENT_MODAL_OPEN, ingredient: ingredient})
  }

  function closeModal() {
    setIsOpen(false);
    dispatch({type: INGREDIENT_MODAL_CLOSED})
  }

  let count;
  if (ingredient.type === 'bun') {
    count = bunId === ingredient._id ? 1 : null;
  } else {
    count = countersMap.get(ingredient._id);
  }

  return (
    <>
      {/*todo(kulikov): uncomment*/}
      {/*<div className={styles.card} onClick={openModal}>*/}
      <div className={styles.card}>
        {count > 0 && <Counter count={count} size='default'/>}
        <img className={styles.image} src={ingredient.image} alt={ingredient.name} onClick={openModal}/>
        <div className={styles.price}>
          <p className={`text text_type_digits-default`}>{ingredient.price}</p>
          <CurrencyIcon type="primary"/>
        </div>
        <p className={`text text_type_main-default ${styles.name}`}>{ingredient.name}</p>
        {/*todo(kulikov): remove*/}
        <button style={{display: 'flex', alignItems: 'center'}}
                onClick={() => dispatch(addIngredient(ingredient))}>Add
        </button>
      </div>
      {isOpen && (
        <Modal headerText='Детали ингредиента' closeModal={closeModal}>
          <IngredientDetails/>
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

IngredientsSection.propTypes = {
  ingredients: ingredientsShape.isRequired,
};

IngredientsCards.propTypes = {
  ingredients: PropTypes.arrayOf(ingredientShape).isRequired,
  header: PropTypes.string.isRequired,
};

IngredientCard.propTypes = {
  ingredient: ingredientShape.isRequired,
};

export default BurgerIngredients;
