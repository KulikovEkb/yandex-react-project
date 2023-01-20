import styles from './burger-ingredients.module.css';
import scrollBarStyles from '../../utils/scroll-bar.module.css'
import {Counter, CurrencyIcon, Tab} from "@ya.praktikum/react-developer-burger-ui-components";
import React, {forwardRef, useRef, useState} from "react";
import PropTypes from "prop-types";
import {ingredientShape} from "../../shapes/shapes";
import IngredientDetails from "../ingredient-details/ingredient-details";
import Modal from "../modal/modal";
import {useDispatch, useSelector} from "react-redux";
import {INGREDIENT_MODAL_CLOSED, INGREDIENT_MODAL_OPEN} from "../../services/actions/common-actions";

const BurgerIngredients = () => {
  const {ingredients} = useSelector(store => store.common);

  // todo(kulikov): create util
  if (!ingredients || Object.keys(ingredients).length === 0) return null;

  return (
    <div className={`${styles.ingredients} pt-10`}>
      <Header/>
      <IngredientsSection ingredientsData={ingredients}/>
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

const IngredientsSection = ({ingredientsData}) => {
  const tabsRef = useRef({});

  return (
    <>
      <IngredientsTabs ref={tabsRef}/>

      <div className={`${styles.ingredientsSection} ${scrollBarStyles.scrollBar} mt-10`}>
        <IngredientsCards ref={tabsRef} ingredients={ingredientsData.buns} header='Булки'/>
        <IngredientsCards ref={tabsRef} ingredients={ingredientsData.sauces} header='Соусы'/>
        <IngredientsCards ref={tabsRef} ingredients={ingredientsData.fillers} header='Начинки'/>
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
        {ingredients.map(ingredient => <IngredientCard key={ingredient._id} data={ingredient}/>)}
      </div>
    </div>
  );
});

const IngredientCard = ({data}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();

  function openModal() {
    setIsOpen(true);
    dispatch({type: INGREDIENT_MODAL_OPEN, ingredient: data})
  }

  function closeModal() {
    setIsOpen(false);
    dispatch({type: INGREDIENT_MODAL_CLOSED})
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
  ingredientsData: ingredientsShape.isRequired,
};

IngredientsCards.propTypes = {
  ingredients: PropTypes.arrayOf(ingredientShape).isRequired,
  header: PropTypes.string.isRequired,
};

IngredientCard.propTypes = {
  data: ingredientShape.isRequired,
};

export default BurgerIngredients;
