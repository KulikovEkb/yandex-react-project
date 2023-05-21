import {ProfileIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from '../app-header/app-header.module.css';
import {getIconType, getLinkTextType} from "./helpers/header-link-helper";
import {NavLink} from "react-router-dom";

const Profile = () => {
  return (
    <div className={styles.profile}>
      <NavLink to='/profile' className={`${styles.headerLink} pt-4 pr-5 pb-4 pl-5`}>
        {({isActive}) => (
          <>
            <ProfileIcon type={getIconType({isActive})}/>
            <p className={getLinkTextType({isActive})}>Личный&nbsp;кабинет</p>
          </>
        )}
      </NavLink>
    </div>
  );
}

export default Profile;
