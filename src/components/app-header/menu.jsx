import {BurgerIcon, ListIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from '../app-header/app-header.module.css';
import HeaderLink from "./header-link";
import {getIconType, getLinkTextType} from "./helpers/header-link-helper";

const Menu = () => {
  return (
    <nav className={styles.menu}>
      <HeaderLink
        icon={<BurgerIcon type={getIconType({isActive: true})}/>}
        text={<p className={getLinkTextType({isActive: true})}>Конструктор</p>}/>
      <HeaderLink
        icon={<ListIcon type={getIconType({isActive: false})}/>}
        text={<p className={getLinkTextType({isActive: false})}>Лента&nbsp;заказов</p>}/>
    </nav>
  );
}

export default Menu;
