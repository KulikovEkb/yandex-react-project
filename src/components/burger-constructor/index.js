import styles from './burger-constructor.module.css'
import {ConstructorElement} from "@ya.praktikum/react-developer-burger-ui-components";
import {elementsShape, ingredientShape} from "../../shapes/shapes";
import React, {useMemo} from "react";
import Summary from "./summary";
import PropTypes from "prop-types";
import {useSelector} from "react-redux";
import FillersList from "./fillers-list";

const BurgerConstructor = () => {
  const {bun, fillers} = useSelector(store => store.burgerConstructor);

  const totalSum = useMemo(() => {
    return fillers.reduce((x, y) => x + y.price, 0) + ((bun?.price ?? 0) * 2);
  }, [bun, fillers]);

  return (
    <div className={`${styles.constructor} pt-25 pl-4`}>
      <Ingredients bun={bun} fillers={fillers}/>
      <Summary totalSum={totalSum}/>
    </div>);
}

const Ingredients = ({bun, fillers}) => {
  return (
    <div className={styles.ingredients}>
      <Bun bun={bun} type='top'/>
      <FillersList fillers={fillers}/>
      <Bun bun={bun} type='bottom'/>
    </div>);
}

const Bun = ({bun, type}) => {
  const isTopBun = type === 'top';

  if (!bun) {
    return (
      // todo(kulikov): deal with margin and paddings
      <div className={`${isTopBun ? styles.emptyTopBun : styles.emptyBottomBun} ml-8`}>
        Выберите булки
      </div>
    );
  }

  const text = isTopBun ? `${bun.name} (верх)` : `${bun.name} (низ)`;

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

Ingredients.propTypes = {
  bun: elementsShape,
  fillers: PropTypes.arrayOf(ingredientShape),
};

Bun.propTypes = {
  bun: ingredientShape,
  type: PropTypes.string.isRequired,
};

export default BurgerConstructor;
