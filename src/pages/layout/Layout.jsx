import styles from './layout.module.scss';
import { Header } from '../../modules/header/Header';
import { Outlet } from 'react-router-dom';

export const Layout = () => {
  return (
    <div className={styles.LayoutBackground}>
      <Header />
      <div className={styles.wrapperUnderHeader}>
        <Outlet />
      </div>
    </div>
  );
};
