import styles from './modal.module.css';
import React, {useEffect} from 'react';
import {createPortal} from 'react-dom';
import ModalOverlay from "./modal-overlay";
import PropTypes from "prop-types";
import Header from "./header";

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
      <ModalOverlay closeModal={closeModal}/>
      <div className={`${styles.modalContent} pt-10 pr-10 pl-10 pb-15`}>
        <Header text={headerText} closeModal={closeModal}/>

        {children}
      </div>
    </>, document.getElementById('modals'));
};

Modal.propTypes = {
  headerText: PropTypes.string.isRequired,
  closeModal: PropTypes.func.isRequired,
}

export default Modal;
