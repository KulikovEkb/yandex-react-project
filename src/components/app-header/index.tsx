import styles from '../app-header/app-header.module.css';
import Menu from "./menu";
import LogoWrapper from "./logo-wrapper";
import Profile from "./profile";
import {useState} from "react";
import * as consts from "./consts/consts";

const AppHeader = () => {
  const [active, setActive] = useState<string>(consts.Tabs.Constructor);

  return (
    <header className={`${styles.appHeader} pt-4 pb-4`}>
      <Menu active={active} setActive={setActive}/>
      <LogoWrapper setActive={setActive}/>
      <Profile active={active} setActive={setActive}/>
    </header>
  );
}

export default AppHeader;
