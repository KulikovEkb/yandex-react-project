import {Logo} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from '../app-header/app-header.module.css';
import {Link} from "react-router-dom";

const LogoWrapper = ({setActive}) => {
  return (
    <Link to='/' className={styles.logo} onClick={() => setActive('Constructor')}>
      <Logo/>
    </Link>
  );
}

export default LogoWrapper;
