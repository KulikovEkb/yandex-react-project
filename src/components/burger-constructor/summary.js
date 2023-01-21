import React, {useEffect, useReducer, useState} from "react";
import styles from "./burger-constructor.module.css";
import {Button, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import {elementsShape} from "../../shapes/shapes";

function calculateTotalSum(elements) {
  if (!elements || Object.keys(elements).length === 0) return 0;

  return elements.fillers.reduce((x, y) => x + y.price, 0) + elements.top.price + elements.bottom.price;
}

function totalSumReducer(state, action) {
  return calculateTotalSum(action.elements);
}

const Summary = ({elements}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [totalSum, dispatchTotalSum] = useReducer(totalSumReducer, 0, undefined);

  useEffect(() => {
    dispatchTotalSum({elements});
  }, [elements]);

  async function openModal() {
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
          {hasError ? (
            <p className={`${styles.error} text text_type_main-medium`}>
              Ошибка при создании заказа.<br/>Попробуйте ещё раз.
            </p>
          ) : (
            <OrderDetails/>
          )}
        </Modal>
      )}
    </div>);
}

Summary.propTypes = {
  elements: elementsShape.isRequired,
};

export default Summary;
