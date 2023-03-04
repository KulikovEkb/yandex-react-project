import {ProfileIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from '../app-header/app-header.module.css';
import HeaderLink from "./header-link";
import {getIconType, getLinkTextType} from "./helpers/header-link-helper";
import {FC} from "react";
import * as consts from "./consts/consts";

type TProfileProps = {
  active: string;
  setActive: (active: string) => void;
}

const Profile: FC<TProfileProps> = ({active, setActive}) => {
  const isActive = active === consts.Tabs.Profile;

  return (
    <div className={styles.profile}>
      <HeaderLink link='/profile' onClick={() => setActive(consts.Tabs.Profile)}>
        <ProfileIcon type={getIconType({isActive: isActive})}/>
        <p className={getLinkTextType({isActive: isActive})}>Личный&nbsp;кабинет</p>
      </HeaderLink>
    </div>
  );
}

export default Profile;
