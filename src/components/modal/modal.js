import styles from './modal.module.css';
import React, {useEffect} from 'react';
import {createPortal} from 'react-dom';
import {CloseIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import ModalOverlay from "../modal-overlay/modal-overlay";
import PropTypes from "prop-types";

const Modal = ({headerText, children, closeModal}) => {
  function handleKeyDown(event) {
    if (event.code === 'Escape') {
      closeModal();
    }
  }

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return createPortal(
    <>
      <ModalOverlay closeModal={closeModal}></ModalOverlay>
      <div className={`${styles.modalContent} pt-10 pr-10 pl-10 pb-15`}>
        <ModalHeader text={headerText} closeModal={closeModal}/>

        {children}
      </div>
    </>, document.getElementById('modals'));
}

const ModalHeader = ({text, closeModal}) => {
  return (
    <div className={styles.modalHeader}>
      <p className="text text_type_main-large">{text}</p>

      <div className={styles.closeIconWrapper} onClick={closeModal}>
        <CloseIcon type="primary"/>
      </div>
    </div>
  );
}

Modal.propTypes = {
  headerText: PropTypes.string.isRequired,
  closeModal: PropTypes.func.isRequired,
}

export default Modal;
