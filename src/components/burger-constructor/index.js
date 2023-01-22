import styles from './burger-constructor.module.css'
import scrollBarStyles from '../../helpers/scroll-bar.module.css'
import {ConstructorElement, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {elementsShape, ingredientShape} from "../../shapes/shapes";
import React from "react";
import Summary from "./summary";
import PropTypes from "prop-types";
import {useDispatch, useSelector} from "react-redux";
import {arrayIsEmpty, objectIsEmpty} from "../../helpers/collection-helper";
import {DECREMENT_INGREDIENT_COUNTER} from "../burger-ingredients/actions/ingredients-actions";
import {REMOVE_INGREDIENT} from "./actions/constructor-actions";

const BurgerConstructor = () => {
  const {bun, ingredients} = useSelector(store => store.constructorReducer);

  if (!bun && arrayIsEmpty(ingredients)) return null;

  return (
    <div className={`${styles.constructor} pt-25 pl-4`}>
      <Items bun={bun} ingredients={ingredients}/>
      <Summary bun={bun} ingredients={ingredients}/>
    </div>);
}

const Items = ({bun, ingredients}) => {
  return (
    <div className={styles.items}>
      {bun && <Bun bun={bun} type='top'/>}
      <FillersList fillers={ingredients}/>
      {bun && <Bun bun={bun} type='bottom'/>}
    </div>);
}

const Bun = ({bun, type}) => {
  const text = type === 'top' ? `${bun.name} (верх)` : `${bun.name} (низ)`;

  return (
    <div className='ml-8'>
      <ConstructorElement
        type={type}
        isLocked={true}
        text={text}
        price={bun.price}
        thumbnail={bun.image}
      />
    </div>
  );
}

const FillersList = ({fillers}) => {
  if (!fillers || fillers.length === 0) {
    return null;
  }

  const className = fillers.length > 5
    ? `${styles.fillersList} ${scrollBarStyles.scrollBar} pr-2`
    : `${styles.fillersList} pr-4`;

  return (
    <div className={className}>
      {fillers.map(fillerData => <Filler key={fillerData.key} filler={fillerData}/>)}
    </div>
  );
}

const Filler = ({filler}) => {
  const dispatch = useDispatch();

  function removeIngredient() {
    dispatch({type: DECREMENT_INGREDIENT_COUNTER, id: filler._id})
    dispatch({type: REMOVE_INGREDIENT, key: filler.key})
  }

  return (
    <div className={styles.filler}>
      <DragIcon type="primary"/>
      <ConstructorElement
        text={filler.name}
        price={filler.price}
        thumbnail={filler.image}
        handleClose={removeIngredient}
      />
    </div>
  );
}

Items.propTypes = {
  items: elementsShape.isRequired,
};

Bun.propTypes = {
  bun: ingredientShape.isRequired,
  type: PropTypes.string.isRequired,
};

FillersList.propTypes = {
  fillers: PropTypes.arrayOf(ingredientShape).isRequired,
};

Filler.propTypes = {
  filler: ingredientShape.isRequired,
};

export default BurgerConstructor;
