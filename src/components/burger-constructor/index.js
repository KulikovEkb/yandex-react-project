import styles from './burger-constructor.module.css'
import scrollBarStyles from '../../utils/scroll-bar.module.css'
import {ConstructorElement, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {elementsShape, ingredientShape} from "../../shapes/shapes";
import React from "react";
import Summary from "./summary";
import {v4 as newGuid} from 'uuid';
import PropTypes from "prop-types";
import {useSelector} from "react-redux";

const BurgerConstructor = () => {
  const {ingredients, constructorIngredients} = useSelector(store => store.common);

  // todo(kulikov): create util
  if (!constructorIngredients || Object.keys(constructorIngredients).length === 0) return null;

  return (
    <div className={`${styles.constructor} pt-25 pl-4`}>
      <Elements elements={constructorIngredients}/>
      <Summary elements={constructorIngredients}/>
    </div>);
}

const Elements = ({elements}) => {
  return (
    <div className={styles.elements}>
      <Bun bun={elements.top} type='top'/>
      <FillersList fillers={elements.fillers}/>
      <Bun bun={elements.bottom} type='bottom'/>
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
      {fillers.map(fillerData => <Filler key={newGuid()} filler={fillerData}/>)}
    </div>
  );
}

const Filler = ({filler}) => {
  return (
    <div className={styles.filler}>
      <DragIcon type="primary"/>
      <ConstructorElement
        text={filler.name}
        price={filler.price}
        thumbnail={filler.image}
      />
    </div>
  );
}

Elements.propTypes = {
  elements: elementsShape.isRequired,
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
