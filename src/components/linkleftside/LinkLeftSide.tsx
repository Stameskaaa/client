import styles from './linkleftside.module.scss';
import { NavLink } from 'react-router-dom';
import { ReactNode } from 'react';
interface Props {
  path: string;
  children: string | ReactNode;
}

export const LinkLeftSide: React.FC<Props> = ({ children, path }) => {
  return (
    <NavLink style={{ textDecoration: 'none' }} to={path}>
      <div className={styles.wraper}>{children}</div>
    </NavLink>
  );
};
