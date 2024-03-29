import styles from './ingredient-details.module.css'
import {FC} from "react";

type TDetailProps = {
  header: string,
  value: string | number,
}

const Detail: FC<TDetailProps> = ({header, value}) => {
  return (
    <div className={`${styles.ingredientDetail} text_color_inactive`}>
      <p className={`${styles.ingredientDetailText} text text_type_main-default`}>{header}</p>
      <p className={`${styles.ingredientDetailText} text text_type_digits-default`}>{value}</p>
    </div>
  );
}

export default Detail;
