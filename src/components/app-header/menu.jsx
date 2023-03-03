import {BurgerIcon, ListIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from '../app-header/app-header.module.css';
import HeaderLink from "./header-link";
import {getIconType, getLinkTextType} from "./helpers/header-link-helper";
import PropTypes from "prop-types";

const Menu = ({active, setActive}) => {
  return (
    <nav className={styles.menu}>
      <HeaderLink link='/' onClick={() => setActive('Constructor')}>
        <BurgerIcon type={getIconType({isActive: active === 'Constructor'})}/>
        <p className={getLinkTextType({isActive: active === 'Constructor'})}>Конструктор</p>
      </HeaderLink>

      <HeaderLink link='/orders-flow' onClick={() => setActive('Orders flow')}>
        <ListIcon type={getIconType({isActive: active === 'Orders flow'})}/>
        <p className={getLinkTextType({isActive: active === 'Orders flow'})}>Лента&nbsp;заказов</p>
      </HeaderLink>
    </nav>
  );
}

Menu.propTypes = {
  active: PropTypes.string.isRequired,
  setActive: PropTypes.func.isRequired,
}

export default Menu;
