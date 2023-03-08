import styles from "./modal.module.css";
import {FC} from "react";

const ModalOverlay: FC<{ closeModal: () => void; }> = ({closeModal}) => {
  return (
    <div className={styles.overlay} onClick={closeModal}></div>
  );
}

export default ModalOverlay;
