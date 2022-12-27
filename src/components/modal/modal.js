import styles from './modal.module.css';
import React, {useState} from 'react';
import {createPortal} from 'react-dom';
import {CloseIcon} from "@ya.praktikum/react-developer-burger-ui-components";

function Modal({ingredient}) {
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
            <div className={`${styles.modalContent} pt-10 pr-10 pl-10 pb-15`}>
              <div className={styles.modalHeader}>
                <p className="text text_type_main-large">Детали ингредиента</p>
                <CloseIcon type="primary" onClick={closeModal}/>
              </div>

              <div style={{height: '240px', marginLeft: '20px', marginRight: '20px'}}>
                <img src={ingredient.image_large} alt={ingredient.name}/>
              </div>

              <div className='mt-4'>
                <p className="text text_type_main-medium" style={{minHeight: '30px'}}>{ingredient.name}</p>
              </div>

              <div className='mt-8' style={{
                display: "grid",
                gridTemplateColumns: 'repeat(4, 1fr)',
                alignItems: 'center',
                gap: '20px',
                width: '100%'
              }}>
                <div style={{display: 'flex', flexDirection: 'column', gap: '8px'}} className='text_color_inactive'>
                  <p className="text text_type_main-default" style={{textAlign: 'center'}}>Калории, ккал</p>
                  <p className="text text_type_digits-default" style={{textAlign: 'center'}}>{ingredient.calories}</p>
                </div>
                <div style={{display: 'flex', flexDirection: 'column', gap: '8px'}} className='text_color_inactive'>
                  <p className="text text_type_main-default" style={{textAlign: 'center'}}>Белки, г</p>
                  <p className="text text_type_digits-default" style={{textAlign: 'center'}}>{ingredient.proteins}</p>
                </div>
                <div style={{display: 'flex', flexDirection: 'column', gap: '8px'}} className='text_color_inactive'>
                  <p className="text text_type_main-default" style={{textAlign: 'center'}}>Жиры, г</p>
                  <p className="text text_type_digits-default" style={{textAlign: 'center'}}>{ingredient.fat}</p>
                </div>
                <div style={{display: 'flex', flexDirection: 'column', gap: '8px'}} className='text_color_inactive'>
                  <p className="text text_type_main-default" style={{textAlign: 'center'}}>Углеводы, г</p>
                  <p className="text text_type_digits-default"
                     style={{textAlign: 'center'}}>{ingredient.carbohydrates}</p>
                </div>
              </div>
            </div>
          </div>,
          document.body
        )}
      <button onClick={openModal}>Open modal</button>
    </div>
  );
}

export default Modal;
