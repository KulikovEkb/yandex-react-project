import styles from './burger-constructor.module.css'
import scrollBarStyles from '../../helpers/scroll-bar.module.css'
import {ConstructorElement, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {elementsShape, ingredientShape} from "../../shapes/shapes";
import React, {useMemo} from "react";
import Summary from "./summary";
import PropTypes from "prop-types";
import {useDispatch, useSelector} from "react-redux";
import {arrayIsEmpty} from "../../helpers/collection-helper";
import {removeIngredient} from "./actions/constructor-actions";

const BurgerConstructor = () => {
  const {bun, fillers} = useSelector(store => store.burgerConstructor);

  const totalSum = useMemo(() => {
    if (!bun && arrayIsEmpty(fillers)) return 0;

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

const FillersList = ({fillers}) => {
  if (arrayIsEmpty(fillers)) {
    return (
      // todo(kulikov): deal with margin and paddings
      <div className={`${styles.emptyFiller} pr-4`}>
        Выберите начинку
      </div>
    );
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

  return (
    <div className={styles.filler}>
      <DragIcon type="primary"/>
      <ConstructorElement
        text={filler.name}
        price={filler.price}
        thumbnail={filler.image}
        handleClose={() => dispatch(removeIngredient(filler._id, filler.key))}
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

FillersList.propTypes = {
  fillers: PropTypes.arrayOf(ingredientShape).isRequired,
};

Filler.propTypes = {
  filler: ingredientShape.isRequired,
};

export default BurgerConstructor;
