import React, {FC, useState} from "react";
import styles from "./burger-constructor.module.css";
import {Button, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import Modal from "../modal";
import OrderDetails from "../order-details/order-details";
import {useLocation, useNavigate} from "react-router-dom";
import {getAuthStateUser} from "../../services/auth/auth-selectors";
import {useSelector} from "../../types";

type TSummaryProps = {
  totalSum: number;
  canOrder: boolean;
};

const Summary: FC<TSummaryProps> = ({totalSum, canOrder}) => {
  const user = useSelector(getAuthStateUser);
  const location = useLocation();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState<boolean>(false);

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

export default Summary;
