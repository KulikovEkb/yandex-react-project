import styles from './burger-constructor.module.css'
import {ConstructorElement} from "@ya.praktikum/react-developer-burger-ui-components";
import {elementsShape, ingredientShape} from "../../shapes/shapes";
import React, {useMemo} from "react";
import Summary from "./summary";
import PropTypes from "prop-types";
import {useDispatch, useSelector} from "react-redux";
import FillersList from "./fillers-list";
import {objectIsEmpty} from "../../helpers/collection-helper";
import {useDrop} from "react-dnd";
import {addIngredient} from "../burger-ingredients/actions/ingredients-actions";

const BurgerConstructor = () => {
  const {bun, fillers} = useSelector(store => store.burgerConstructor);

  const totalSum = useMemo(() => {
    return fillers.reduce((x, y) => x + y.price, 0) + ((bun?.price ?? 0) * 2);
  }, [bun, fillers]);

  return (
    <div className={`${styles.constructor} pt-25 pl-4`}>
      <Ingredients bun={bun} fillers={fillers}/>
      <Summary totalSum={totalSum} canOrder={!objectIsEmpty(bun)}/>
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
  const dispatch = useDispatch();

  const [{isHover}, dropRef] = useDrop({
    accept: 'bun',
    drop(ingredient){
      dispatch(addIngredient(ingredient));
    },
    collect: monitor => ({
      isHover: monitor.isOver(),
    })
  });

  const isTopBun = type === 'top';

  if (!bun) {
    return (
      // todo(kulikov): deal with margin and paddings
      // todo(kulikov): deal with style
      <div ref={dropRef} className={`${isTopBun ? styles.emptyTopBun : styles.emptyBottomBun} ml-8`}
           style={{backgroundColor: isHover ? 'pink' : '#37363F'}}>
        Выберите булки
      </div>
    );
  }

  const text = isTopBun ? `${bun.name} (верх)` : `${bun.name} (низ)`;

  return (
    // todo(kulikov): deal with style
    <div ref={dropRef} className='ml-8' style={{backgroundColor: isHover ? 'pink' : '#37363F'}}>
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
