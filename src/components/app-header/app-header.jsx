import {Logo, BurgerIcon, ListIcon, ProfileIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from '../app-header/app-header.module.css';

const AppHeader = () => {
  return (
    <header className={`${styles.appHeader} pt-4 pb-4`}>
      <Menu/>
      <LogoWrapper/>
      <Profile isActive={false}/>
    </header>
  );
}

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

const LogoWrapper = () => {
  return (
    <div className={styles.logo}>
      <Logo/>
    </div>
  );
}

const Profile = ({isActive}) => {
  return (
    <div className={styles.profile}>
      <HeaderLink
        icon={<ProfileIcon type={getIconType({isActive: isActive})}/>}
        text={<p className={getLinkTextType({isActive: isActive})}>Личный&nbsp;кабинет</p>}/>
    </div>
  );
}

const HeaderLink = ({icon, text}) => {
  return (
    <div className={`${styles.headerLink} pt-4 pr-5 pb-4 pl-5`}>
      {icon}
      {text}
    </div>
  );
}

function getIconType({isActive}) {
  return isActive ? 'primary' : 'secondary';
}

function getLinkTextType({isActive}) {
  return `text text_type_main-default ${isActive ? 'text_color_primary' : 'text_color_inactive'}`;
}

export default AppHeader;
