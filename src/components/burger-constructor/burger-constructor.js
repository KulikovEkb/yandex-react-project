import styles from './burger-constructor.module.css'
import scrollBarStyles from '../../utils/scroll-bar.module.css'
import {Button, ConstructorElement, DragIcon, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import {ingredientShape} from "../../shapes/shapes";
import React, {useEffect, useReducer, useState} from "react";
import OrderDetails from "../order-details/order-details";
import Modal from "../modal/modal";
import {BurgerElementsContext} from "../../services/burger-constructor-context";
import normaClient from "../../clients/norma-client";

const calculateTotalSum = (elements) => {
  if (!elements || Object.keys(elements).length === 0) return 0;

  return elements.fillers.reduce((x, y) => x + y.price, 0) + elements.top.price + elements.bottom.price;
};

function totalSumReducer(state, action) {
  return calculateTotalSum(action.elements);
}

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

const Summary = () => {
  const {elements} = React.useContext(BurgerElementsContext);
  const [isOpen, setIsOpen] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [orderNumber, setOrderNumber] = useState(null);
  const [totalSum, dispatchTotalSum] = useReducer(totalSumReducer, 0, undefined);

  useEffect(() => {
    dispatchTotalSum({elements});
  }, [elements])

  async function createOrder() {
    const elementsIds = elements.fillers.map(x => x._id);
    elementsIds.push(elements.top._id);
    elementsIds.push(elements.bottom._id);

    try {
      return await normaClient.createOrder(elementsIds);
    } catch {
      setHasError(true);
    }
  }

  async function openModal() {
    const orderNumber = await createOrder();
    setOrderNumber(orderNumber);

    setIsOpen(true);
  }

  function closeModal() {
    setOrderNumber(null);
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
          {hasError ? (
            <p className={`${styles.error} text text_type_main-medium`}>
              Ошибка при создании заказа.<br/>Попробуйте ещё раз.
            </p>
          ) : (
            <OrderDetails orderNumber={orderNumber}/>
          )}
        </Modal>
      )}
    </div>);
}

const elementsShape = PropTypes.shape({
  top: ingredientShape,
  bottom: ingredientShape,
  fillers: PropTypes.arrayOf(ingredientShape),
});

BurgerConstructor.contextTypes = {
  elements: elementsShape,
};

export default BurgerConstructor;
