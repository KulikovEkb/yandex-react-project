import styles from '../app-header/app-header.module.css';

const HeaderLink = ({icon, text}) => {
  return (
    <div className={`${styles.headerLink} pt-4 pr-5 pb-4 pl-5`}>
      {icon}
      {text}
    </div>
  );
}

export default HeaderLink;
