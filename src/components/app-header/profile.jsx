import {ProfileIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from '../app-header/app-header.module.css';
import HeaderLink from "./header-link";
import {getIconType, getLinkTextType} from "./helpers/header-link-helper";
import PropTypes from "prop-types";

const Profile = ({active, setActive}) => {
  const isActive = active === 'Profile';

  return (
    <div className={styles.profile}>
      <HeaderLink link='/profile' onClick={() => setActive('Profile')}>
        <ProfileIcon type={getIconType({isActive: isActive})}/>
        <p className={getLinkTextType({isActive: isActive})}>Личный&nbsp;кабинет</p>
      </HeaderLink>
    </div>
  );
}

Profile.propTypes = {
  active: PropTypes.string.isRequired,
  setActive: PropTypes.func.isRequired,
}

export default Profile;
