import {Logo} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from '../app-header/app-header.module.css';
import {Link} from "react-router-dom";
import {FC} from "react";
import * as consts from "./consts/consts";

type TLogoWrapperProps = {
  setActive: (active: string) => void;
}

const LogoWrapper: FC<TLogoWrapperProps> = ({setActive}) => {
  return (
    <Link to='/' className={styles.logo} onClick={() => setActive(consts.Tabs.Constructor)}>
      <Logo/>
    </Link>
  );
}

export default LogoWrapper;
