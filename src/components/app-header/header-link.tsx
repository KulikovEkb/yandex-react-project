import styles from "../app-header/app-header.module.css";
import {Link} from "react-router-dom";
import {FC, ReactNode} from "react";

type THeaderLinkProps = {
  link: string;
  onClick: () => void;
  children: ReactNode;
};

const HeaderLink: FC<THeaderLinkProps> = ({children, link, onClick}) => {
  return (
    <Link to={link} className={`${styles.headerLink} pt-4 pr-5 pb-4 pl-5`} onClick={onClick}>
      {children}
    </Link>
  );
}

export default HeaderLink;
