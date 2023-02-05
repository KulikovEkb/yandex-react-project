import styles from '../app-header/app-header.module.css';
import {Link} from "react-router-dom";
import PropTypes from "prop-types";

const HeaderLink = ({children, link, onClick}) => {
  return (
    <Link to={link} className={`${styles.headerLink} pt-4 pr-5 pb-4 pl-5`} onClick={onClick}>
      {children}
    </Link>
  );
}

HeaderLink.propTypes = {
  link: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
}

export default HeaderLink;
