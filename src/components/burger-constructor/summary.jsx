import React, {useState} from "react";
import styles from "./burger-constructor.module.css";
import {Button, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import Modal from "../modal";
import OrderDetails from "../order-details/order-details";
import PropTypes from "prop-types";
import {useLocation, useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {getAuthStateUser} from "../../services/auth/auth-selectors";

const Summary = ({totalSum, canOrder}) => {
  const user = useSelector(getAuthStateUser);
  const location = useLocation();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  async function openModal() {
    if (!user) {
      navigate('/login', {state: location, replace: true});
    }

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
      <Button disabled={!canOrder} htmlType="button" type="primary" size="large" onClick={openModal}>
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
