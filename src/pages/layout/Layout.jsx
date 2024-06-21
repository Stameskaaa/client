import styles from './layout.module.scss';
import { Header } from '../../modules/header/Header';
import { Outlet } from 'react-router-dom';
import { useAppSelector } from '../../UI/hooks/hook';
import { NotificationList } from '../../components/notification/NotificationList';

export const Layout = () => {
  const auth = useAppSelector((state) => state.auth.authState);
  return (
    <div className={styles.LayoutBackground}>
      {auth ? <NotificationList /> : null}
      <Header />
      <div className={styles.wrapperUnderHeader}>
        <Outlet />
      </div>
    </div>
  );
};
