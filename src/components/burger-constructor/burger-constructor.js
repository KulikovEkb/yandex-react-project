import styles from './burger-constructor.module.css'
import scrollBarStyles from '../../utils/scroll-bar.module.css'
import {Button, ConstructorElement, DragIcon, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import {ingredientShape} from "../../shapes/shapes";
import React, {useState} from "react";
import OrderDetails from "../order-details/order-details";
import Modal from "../modal/modal";
import {BurgerElementsContext} from "../../services/burger-constructor-context";

const BurgerConstructor = () => {
  const {elements} = React.useContext(BurgerElementsContext);

  if (!elements || Object.keys(elements).length === 0) return null;

  const totalSum = elements.fillers.reduce((x, y) => x + y.price, 0) + elements.top.price + elements.bottom.price;

  return (
    <div className={`${styles.constructor} pt-25 pl-4`}>
      <Elements/>
      <Summary totalSum={totalSum}/>
    </div>);
}

const Elements = () => {
  const {elements} = React.useContext(BurgerElementsContext);

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

const Summary = ({totalSum}) => {
  const [isOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <div className={`${styles.summary} mt-10 mr-4`}>
      <div className={styles.totalSum}>
        <p className="text text_type_digits-medium">
          {totalSum}
        </p>
        <div className={styles.currencyIconWrapper}>
          <CurrencyIcon type="primary"/>
        </div>
      </div>
      <Button htmlType="button" type="primary" size="large" onClick={openModal}>
        Оформить заказ
      </Button>
      {isOpen && (
        <Modal headerText='' closeModal={closeModal}>
          <OrderDetails/>
        </Modal>
      )}
    </div>);
}

const elementsShape = PropTypes.shape({
  top: ingredientShape,
  bottom: ingredientShape,
  fillers: PropTypes.arrayOf(ingredientShape),
})

BurgerConstructor.contextTypes = {
  elements: elementsShape,
};

export default BurgerConstructor;
