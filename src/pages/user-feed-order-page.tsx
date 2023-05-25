import styles from "./feed-order-page.module.css";
import FeedOrder from "../components/feed-order-details/feed-order";
import {useParams} from "react-router-dom";

function UserFeedOrderPage() {
  const orderNumber = useParams().number!;

  return (
    <div className={styles.content}>
      <p className={'text text_type_digits-default'}>{`#${orderNumber}`}</p>
      <FeedOrder orderNumber={orderNumber} />
    </div>
  )
}

export default UserFeedOrderPage;
