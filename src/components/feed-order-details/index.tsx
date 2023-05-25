import Modal from "../modal";
import React, {useEffect, useState} from "react";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import FeedOrder from "./feed-order";
import {getOrder} from "../../helpers/http-clients/norma-client";
import {TOrder} from "../../types/order";
import {Loader} from "../loader/loader";
import styles from "../order-details/order-details.module.css";

interface IFeedOrderDetailsState {
  isLoading: boolean
  hasError: boolean
  order: TOrder | null
}

const FeedOrderDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const orderNumber = useParams().number!;

  const closeModal = React.useCallback(() => {
    location?.state?.background && navigate(location.state.background);
  }, [location.state, navigate]);

  const [state, setState] = useState<IFeedOrderDetailsState>({
    isLoading: true,
    hasError: false,
    order: null,
  });

  useEffect(() => {
    const fetchOrderData = async () => {
      setState({...state, isLoading: true});
      const getOrderResult = await getOrder(orderNumber);

      if (!!getOrderResult) {
        setState({...state, isLoading: false, order: getOrderResult});
      } else {
        setState({...state, isLoading: false, hasError: true});
      }
    }

    fetchOrderData();
  }, [orderNumber]);

  return (
    <Modal headerText={`#${orderNumber}`} headerIsNumber={true} closeModal={closeModal}>
      {state.isLoading ? (
        <Loader size='huge'/>
      ) : state.hasError ? (
        <p className={`${styles.error} text text_type_main-medium`}>
          Ошибка при получении заказа.<br/>Попробуйте ещё раз.
        </p>
      ) : (
        <FeedOrder order={state.order!}/>
      )}
    </Modal>
  );
}

export default FeedOrderDetails;
