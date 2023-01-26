import {ProfileIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from '../app-header/app-header.module.css';
import HeaderLink from "./header-link";
import {getIconType, getLinkTextType} from "./helpers/header-link-helper";

const Profile = ({isActive}) => {
  return (
    <div className={styles.profile}>
      <HeaderLink
        icon={<ProfileIcon type={getIconType({isActive: isActive})}/>}
        text={<p className={getLinkTextType({isActive: isActive})}>Личный&nbsp;кабинет</p>}/>
    </div>
  );
}

export default Profile;
