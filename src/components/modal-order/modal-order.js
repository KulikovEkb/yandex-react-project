import styles from './modal-order.module.css';
import React, {useState} from 'react';
import {createPortal} from 'react-dom';
import {CloseIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import doneImage from '../../images/done.png';

function ModalOrder() {
  const [isOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  function getRandomInteger(min = 1, max = 999_999) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  return (
    <div>
      {isOpen &&
        createPortal(
          <div className={styles.modal}>
            <div className={`${styles.modalContent} pt-10 pr-10 pl-10 pb-30`}>
              <div className={styles.modalHeader}>
                <CloseIcon type="primary" onClick={closeModal}/>
              </div>

              <div style={{marginTop: '16px'}}>
                <p className="text text_type_digits-large" style={{
                  minHeight: '120px',
                  textShadow: '0px 0px 16px rgba(51, 51, 255, 0.25), 0px 0px 8px rgba(51, 51, 255, 0.25), 0px 4px 32px rgba(51, 51, 255, 0.5)'
                }}>{getRandomInteger().toString().padStart(6, '0')}</p>
              </div>

              <div className='mt-8'>
                <p className="text text_type_main-medium" style={{minHeight: '30px'}}>идентификатор заказа</p>
              </div>

              <div style={{
                height: '120px',
                width: '120px',
                display: "flex",
                alignItems: 'center',
                justifyContent: 'center'
              }} className='mt-15'>
                <img src={doneImage}/>
              </div>

              <div className='mt-15'>
                <p className="text text_type_main-default" style={{minHeight: '24px'}}>Ваш заказ начали готовить</p>
              </div>

              <div className='mt-2'>
                <p className="text text_type_main-default text_color_inactive" style={{minHeight: '24px'}}>
                  Дождитесь готовности на орбитальной станции
                </p>
              </div>
            </div>
          </div>,
          document.body
        )}
      <button onClick={openModal}>Open modal</button>
    </div>
  );
}

export default ModalOrder;
