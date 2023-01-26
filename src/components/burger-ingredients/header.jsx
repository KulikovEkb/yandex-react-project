import styles from './burger-ingredients.module.css';
import React from "react";

const Header = () => {
  return (
    <div className={styles.header}>
      <p className='text text_type_main-large'>Соберите бургер</p>
    </div>
  );
}

export default Header;
