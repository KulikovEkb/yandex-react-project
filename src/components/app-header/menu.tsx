import {BurgerIcon, ListIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from '../app-header/app-header.module.css';
import HeaderLink from "./header-link";
import {getIconType, getLinkTextType} from "./helpers/header-link-helper";
import {FC} from "react";
import * as consts from "./consts/consts";

type TMenuProps = {
  active: string;
  setActive: (active: string) => void;
}

const Menu: FC<TMenuProps> = ({active, setActive}) => {
  return (
    <nav className={styles.menu}>
      <HeaderLink link='/' onClick={() => setActive(consts.Tabs.Constructor)}>
        <BurgerIcon type={getIconType({isActive: active === consts.Tabs.Constructor})}/>
        <p className={getLinkTextType({isActive: active === consts.Tabs.Constructor})}>Конструктор</p>
      </HeaderLink>

      <HeaderLink link='/feed' onClick={() => setActive(consts.Tabs.OrdersFeed)}>
        <ListIcon type={getIconType({isActive: active === consts.Tabs.OrdersFeed})}/>
        <p className={getLinkTextType({isActive: active === consts.Tabs.OrdersFeed})}>Лента&nbsp;заказов</p>
      </HeaderLink>
    </nav>
  );
}

export default Menu;
