import styles from "./modal-overlay.module.css";

const ModalOverlay = ({children, closeModal}) => {
  return (
    <div className={styles.overlay} onClick={closeModal}>
      {children}
    </div>
  );
}

export default ModalOverlay;