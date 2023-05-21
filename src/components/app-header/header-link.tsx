import styles from "../app-header/app-header.module.css";
import {NavLink} from "react-router-dom";
import {FC, PropsWithChildren} from "react";

type THeaderLinkProps = {
  link: string;
};

const HeaderLink: FC<PropsWithChildren<THeaderLinkProps>> = ({children, link}) => {
  return (
    <NavLink to={link} className={`${styles.headerLink} pt-4 pr-5 pb-4 pl-5`}>
      {children}
    </NavLink>
  );
}

export default HeaderLink;
