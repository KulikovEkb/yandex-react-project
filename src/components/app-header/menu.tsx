import {BurgerIcon, ListIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from '../app-header/app-header.module.css';
import {getIconType, getLinkTextType} from "./helpers/header-link-helper";
import {NavLink} from "react-router-dom";

const Menu = () => {
  return (
    <nav className={styles.menu}>
      <NavLink to='/' className={`${styles.headerLink} pt-4 pr-5 pb-4 pl-5`}>
        {({isActive}) => (
          <>
            <BurgerIcon type={getIconType({isActive})}/>
            <p className={getLinkTextType({isActive})}>Конструктор</p>
          </>
        )}
      </NavLink>

      <NavLink to='/feed' className={`${styles.headerLink} pt-4 pr-5 pb-4 pl-5`}>
        {({isActive}) => (
          <>
            <ListIcon type={getIconType({isActive})}/>
            <p className={getLinkTextType({isActive})}>Лента&nbsp;заказов</p>
          </>
        )}
      </NavLink>
    </nav>
  );
}

export default Menu;
