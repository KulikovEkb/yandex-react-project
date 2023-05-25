import {useParams} from "react-router-dom";
import FeedOrder from "../components/feed-order-details/feed-order";
import styles from "./feed-order-page.module.css";

function FeedOrderPage() {
  const orderNumber = useParams().number!;

  return (
    <div className={styles.content}>
      <p className={'text text_type_digits-default'}>{`#${orderNumber}`}</p>
      <FeedOrder orderNumber={orderNumber} />
    </div>
  )
}

export default FeedOrderPage;
