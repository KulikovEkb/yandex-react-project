import styles from './modal.module.css';
import React, {FC} from 'react';
import {CloseIcon} from "@ya.praktikum/react-developer-burger-ui-components";

type THeaderProps = {
  text: string;
  isNumber: boolean;
  closeModal: () => void;
}

const Header: FC<THeaderProps> = ({text, isNumber, closeModal}) => {
  return (
    <div className={styles.modalHeader}>
      <p className={`text ${isNumber ? 'text_type_digits-default' : 'text_type_main-large'}`}>{text}</p>

      <div className={styles.closeIconWrapper} onClick={closeModal} data-testid="button-close">
        <CloseIcon type="primary"/>
      </div>
    </div>
  );
}

export default Header;
