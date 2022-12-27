import styles from './burger-ingredients.module.css';
import scrollBarStyles from '../../utils/scroll-bar.module.css'
import {Counter, CurrencyIcon, Tab} from "@ya.praktikum/react-developer-burger-ui-components";
import React from "react";
import PropTypes from "prop-types";
import {ingredientShape} from "../../shapes/shapes";
import Modal from "../modal/modal";
import ModalOrder from "../modal-order/modal-order";

const BurgerIngredients = ({ingredients}) => {
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
      <IngredientsTab/>
    </div>
  );
}

const IngredientsTab = () => {
  const [current, setCurrent] = React.useState('Булки')

  return (
    <div className={`${styles.ingredientsTab}`}>
      <Tab value="Булки" active={current === 'Булки'} onClick={setCurrent}>
        Булки
      </Tab>
      <Tab value="Соусы" active={current === 'Соусы'} onClick={setCurrent}>
        Соусы
      </Tab>
      <Tab value="Начинки" active={current === 'Начинки'} onClick={setCurrent}>
        Начинки
      </Tab>
    </div>
  );
}

const IngredientsSection = ({ingredientsData}) => {
  return (
    <div className={`${styles.ingredientsSection} ${scrollBarStyles.scrollBar}`}>
      <IngredientsCards ingredients={ingredientsData.buns} header='Булки'/>
      <IngredientsCards ingredients={ingredientsData.sauces} header='Соусы'/>
      <IngredientsCards ingredients={ingredientsData.fillers} header='Начинки'/>
    </div>
  );
}

const IngredientsCards = ({ingredients, header}) => {
  return (
    <div className={styles.cards}>
      <p className='text text_type_main-medium'>{header}</p>
      <div className={`${styles.cardsList} pl-4 pr-2`}>
        {ingredients.map(ingredient => <IngredientCard key={ingredient._id} data={ingredient}/>)}
      </div>
    </div>
  );
}

const IngredientCard = ({data}) => {
  return (
    <div className={styles.card}>
      {/*todo(kulikov): positioning doesn't work and I don't understand why*/}
      {/*<Counter count={1} size='default' extraClass='m-5'/>*/}
      <img className={styles.image} src={data.image} alt={data.name}/>
      <div className={styles.price}>
        <p className={`text text_type_digits-default`}>{data.price}</p>
        <CurrencyIcon type="primary"/>
      </div>
      <p className={`text text_type_main-default ${styles.name}`}>{data.name}</p>
      <Modal ingredient={data}> </Modal>
      <ModalOrder> </ModalOrder>
    </div>
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
