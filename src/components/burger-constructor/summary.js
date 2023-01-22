import React, {useState} from "react";
import styles from "./burger-constructor.module.css";
import {Button, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import PropTypes from "prop-types";
import {useSelector} from "react-redux";

const Summary = ({totalSum}) => {
  const [isOpen, setIsOpen] = useState(false);
  // todo(kulikov): useLoader
  const {createOrderFail} = useSelector(store => store.orderDetails);

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
          {createOrderFail ? (
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
  totalSum: PropTypes.number.isRequired,
};

export default Summary;
