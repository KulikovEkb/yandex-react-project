import styles from './modal.module.css';
import React, {FC, PropsWithChildren, useEffect} from 'react';
import {createPortal} from 'react-dom';
import ModalOverlay from "./modal-overlay";
import Header from "./header";

type TModalProps = {
  headerText: string;
  headerIsNumber?: boolean;
  closeModal: () => void;
}

const Modal: FC<PropsWithChildren<TModalProps>> = ({headerText, headerIsNumber = false, closeModal, children}) => {
  function handleKeyDown(event: KeyboardEvent) {
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
        <Header text={headerText} isNumber={headerIsNumber} closeModal={closeModal}/>

        {children}
      </div>
    </>, document.getElementById('modals')!
  );
};

export default Modal;
