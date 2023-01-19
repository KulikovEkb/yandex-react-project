import styles from './burger-constructor.module.css'
import scrollBarStyles from '../../utils/scroll-bar.module.css'
import {ConstructorElement, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {elementsShape, ingredientShape} from "../../shapes/shapes";
import React, {useMemo} from "react";
import {BurgerContext} from "../../services/burger-context";
import Summary from "./summary";
import {v4 as newGuid} from 'uuid';
import PropTypes from "prop-types";

function getElements(ingredients) {
  if (!ingredients || Object.keys(ingredients).length === 0) return null;

  return {
    top: ingredients.buns[0],
    bottom: ingredients.buns[0],
    fillers: [
      ingredients.fillers[0],
      ingredients.sauces[0],
      ingredients.fillers[1],
      ingredients.sauces[1],
      ingredients.fillers[2],
      ingredients.fillers[3],
      ingredients.fillers[4],
    ],
  };
}

const BurgerConstructor = () => {
  const {ingredients} = React.useContext(BurgerContext);
  const elements = useMemo(() => getElements(ingredients), [ingredients]);

  if (!elements) return null;

  return (
    <div className={`${styles.constructor} pt-25 pl-4`}>
      <Elements elements={elements}/>
      <Summary elements={elements}/>
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
