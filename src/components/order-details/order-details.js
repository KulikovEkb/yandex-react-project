import styles from './order-details.module.css'
import doneImage from "../../images/done.png";
import PropTypes from "prop-types";
import {createOrder} from "../../services/actions/common-actions";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";

const OrderDetails = () => {
  const {constructorIngredients, orderNumber} = useSelector(store => store.common);
  const dispatch = useDispatch();

  useEffect(() => {
    const elementsIds = constructorIngredients.fillers.map(x => x._id);
    elementsIds.push(constructorIngredients.bun._id);
    elementsIds.push(constructorIngredients.bun._id);

    dispatch(createOrder(elementsIds))
  }, [dispatch, constructorIngredients]);

  return (
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
    </>);
}

OrderDetails.propTypes = {
  //orderNumber: PropTypes.number.isRequired,
}

export default OrderDetails;
