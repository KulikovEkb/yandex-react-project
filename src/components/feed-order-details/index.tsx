import Modal from "../modal";
import React from "react";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import FeedOrder from "./feed-order";

const FeedOrderDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const orderNumber = useParams().number!;

  const closeModal = React.useCallback(() => {
    location?.state?.background && navigate(location.state.background);
  }, [location.state, navigate]);

  return (
    <Modal headerText={`#${orderNumber}`} headerIsNumber={true} closeModal={closeModal}>
      <FeedOrder orderNumber={orderNumber}/>
    </Modal>
  );
}

export default FeedOrderDetails;
