import {Logo} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from '../app-header/app-header.module.css';
import {Link} from "react-router-dom";
import {FC} from "react";
import * as consts from "./consts/consts";

const LogoWrapper = () => {
  return (
    <Link to='/' className={styles.logo}>
      <Logo/>
    </Link>
  );
}

export default LogoWrapper;
