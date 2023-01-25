import styles from './order-details.module.css'
import doneImage from "../../images/done.png";
import {useDispatch, useSelector} from "react-redux";
import React, {useEffect} from "react";
import {createOrder} from "./actions/order-details-actions";
import {Loader} from "../loader/loader";

const OrderDetails = () => {
  const {orderNumber, createOrderRequest, createOrderFail} = useSelector(store => store.orderDetails);
  const {bun, fillers} = useSelector(store => store.burgerConstructor);
  const dispatch = useDispatch();

  useEffect(() => {
    const elementsIds = fillers.map(x => x._id);
    elementsIds.push(bun._id);
    elementsIds.push(bun._id);

    dispatch(createOrder(elementsIds))
  }, [dispatch, bun, fillers]);

  return (
    createOrderRequest ? (
      <Loader size='huge'/>
      ) :
    createOrderFail ? (
      <p className={`${styles.error} text text_type_main-medium`}>
        Ошибка при создании заказа.<br/>Попробуйте ещё раз.
      </p>
    ) : (
      <>
        <div className='mt-4'>
          <p className={`${styles.orderId} text text_type_digits-large`}>
            {orderNumber.toString().padStart(6, '0')}
          </p>
        </div>

        <div className='mt-8'>
          <p className={`${styles.orderIdText} text text_type_main-medium`}>идентификатор заказа</p>
        </div>

        <div className={`${styles.checkMark} mt-15`}>
          <img src={doneImage} alt='check mark'/>
        </div>

        <div className='mt-15'>
          <p className={`${styles.orderText} text text_type_main-default`}>Ваш заказ начали готовить</p>
        </div>

        <div className='mt-2 mb-15'>
          <p className={`${styles.orderText} text text_type_main-default text_color_inactive`}>
            Дождитесь готовности на орбитальной станции
          </p>
        </div>
      </>
    )
  );
}

export default OrderDetails;
