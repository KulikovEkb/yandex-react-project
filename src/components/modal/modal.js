import styles from './modal.module.css';
import React, { useState } from 'react';
import { createPortal } from 'react-dom';

function Modal() {
  const [isOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <div>
      {isOpen &&
        createPortal(
          <div className={styles.modal}>
            <div className={styles.modalContent}>
              <p>Modal content</p>
              <button onClick={closeModal}>Close</button>
            </div>
          </div>,
          document.body
        )}
      <button onClick={openModal}>Open modal</button>
    </div>
  );
}

export default Modal;