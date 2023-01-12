import styles from './burger-constructor.module.css'
import scrollBarStyles from '../../utils/scroll-bar.module.css'
import {ConstructorElement, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {elementsShape} from "../../shapes/shapes";
import React from "react";
import {BurgerElementsContext} from "../../services/burger-constructor-context";
import Summary from "./summary";

const BurgerConstructor = () => {
  return (
    <div className={`${styles.constructor} pt-25 pl-4`}>
      <Elements/>
      <Summary/>
    </div>);
}

const Elements = () => {
  const {elements} = React.useContext(BurgerElementsContext);

  if (!elements || Object.keys(elements).length === 0) return null;

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
      {fillers.map((fillerData, index) => <Filler key={index} filler={fillerData}/>)}
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

BurgerConstructor.contextTypes = {
  elements: elementsShape,
};

export default BurgerConstructor;
