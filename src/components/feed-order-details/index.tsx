import Modal from "../modal";
import React, {useMemo} from "react";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import {useSelector} from "../../types";
import {getOrdersFeedState} from "../orders-feed/store/orders-feed-selectors";
import {getUserOrdersFeedState} from "../user-orders-feed/store/user-orders-feed-selectors";
import FeedOrder from "./feed-order";

const FeedOrderDetails = () => {
  // todo(kulikov): fix
  const {orders} = useSelector(getOrdersFeedState);
  const userOrders = useSelector(getUserOrdersFeedState).orders;
  const location = useLocation();
  const navigate = useNavigate();
  const numberString = useParams().number!;

  const closeModal = React.useCallback(() => {
    location?.state?.background && navigate(location.state.background);
  }, [location.state, navigate]);

  const order = useMemo(() => {
    const number = parseInt(numberString);

    // todo(kulikov): fetch order if it is missing
    let order = orders.find(x => x.number === number);
    if (!order) order = userOrders.find(x => x.number === number)!;

    return order;
  }, [numberString, orders, userOrders]);

  return (
    <Modal headerText={`#${order.number}`} headerIsNumber={true} closeModal={closeModal}>
      <FeedOrder order={order}/>
    </Modal>);
}

export default FeedOrderDetails;
