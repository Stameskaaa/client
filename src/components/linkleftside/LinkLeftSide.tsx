import styles from './linkleftside.module.scss';
import { NavLink } from 'react-router-dom';
import { ReactElement } from 'react';

interface Props {
  path: string;
  children: string | ReactElement;
}

export const LinkLeftSide: React.FC<Props> = ({ children, path }: any) => {
  return (
    <NavLink style={{ textDecoration: 'none' }} to={path}>
      <div className={styles.wraper}>{children}</div>
    </NavLink>
  );
};
