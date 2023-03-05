import styles from './order-details.module.css'
import doneImage from "../../images/done.png";
import {useDispatch, useSelector} from "react-redux";
import React, {useEffect} from "react";
import {createOrder} from "./store/order-details-actions";
import {Loader} from "../loader/loader";
import {getConstructorState} from "../burger-constructor/store/constructor-selectors";
import {getOrderDetailsState} from "./store/order-details-selectors";

const OrderDetails = () => {
  const {orderNumber, createOrderRequest, createOrderFail} = useSelector(getOrderDetailsState);
  const {bun, fillers} = useSelector(getConstructorState);
  const dispatch = useDispatch();

  useEffect(() => {
    const elementsIds = [bun._id];

    for (const filler of fillers) {
      elementsIds.push(filler._id);
    }

    elementsIds.push(bun._id);

    dispatch(createOrder(elementsIds) as any)
  }, [dispatch, bun, fillers]);

  return (
    createOrderRequest ? (
      <Loader size='huge'/>
    ) : createOrderFail ? (
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
