import React, {useState} from "react";
import styles from "./burger-constructor.module.css";
import {Button, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import PropTypes from "prop-types";

const Summary = ({totalSum}) => {
  const [isOpen, setIsOpen] = useState(false);

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
      {/*todo(kulikov): disable for incomplete order*/}
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

Summary.propTypes = {
  totalSum: PropTypes.number.isRequired,
};

export default Summary;
