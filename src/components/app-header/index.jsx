import styles from '../app-header/app-header.module.css';
import Menu from "./menu";
import LogoWrapper from "./logo-wrapper";
import Profile from "./profile";

const AppHeader = () => {
  return (
    <header className={`${styles.appHeader} pt-4 pb-4`}>
      <Menu/>
      <LogoWrapper/>
      <Profile isActive={false}/>
    </header>
  );
}

export default AppHeader;
