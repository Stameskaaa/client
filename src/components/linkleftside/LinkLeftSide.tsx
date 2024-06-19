import styles from './linkleftside.module.scss';
import { NavLink } from 'react-router-dom';
export const LinkLeftSide = ({ children, path }: any) => {
  return (
    <NavLink style={{ textDecoration: 'none' }} to={path}>
      <div className={styles.wraper}>{children}</div>
    </NavLink>
  );
};
