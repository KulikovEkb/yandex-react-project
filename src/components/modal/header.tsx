import styles from './modal.module.css';
import React, {FC} from 'react';
import {CloseIcon} from "@ya.praktikum/react-developer-burger-ui-components";

type THeaderProps = {
  text: string;
  closeModal: () => void;
}

const Header: FC<THeaderProps> = ({text, closeModal}) => {
  return (
    <div className={styles.modalHeader}>
      <p className="text text_type_main-large">{text}</p>

      <div className={styles.closeIconWrapper} onClick={closeModal}>
        <CloseIcon type="primary"/>
      </div>
    </div>
  );
}

export default Header;
