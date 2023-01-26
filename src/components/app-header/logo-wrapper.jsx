import {Logo} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from '../app-header/app-header.module.css';

const LogoWrapper = () => {
  return (
    <div className={styles.logo}>
      <Logo/>
    </div>
  );
}

export default LogoWrapper;
