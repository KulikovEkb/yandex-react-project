import React, {useEffect, useReducer, useState} from "react";
import {BurgerElementsContext} from "../../services/burger-constructor-context";
import normaClient from "../../clients/norma-client";
import styles from "./burger-constructor.module.css";
import {Button, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import {elementsShape} from "../../shapes/shapes";

const calculateTotalSum = (elements) => {
  if (!elements || Object.keys(elements).length === 0) return 0;

  return elements.fillers.reduce((x, y) => x + y.price, 0) + elements.top.price + elements.bottom.price;
};

function totalSumReducer(state, action) {
  return calculateTotalSum(action.elements);
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

Summary.contextTypes = {
  elements: elementsShape,
};

export default Summary;
