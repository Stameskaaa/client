import styles from './editprofile.module.scss';
import { NavLink, Outlet, useLocation, useParams } from 'react-router-dom';

import { useEffect, useState } from 'react';
const arr = ['Profile', 'Security', 'Notifications'];
export const EditProfile = () => {
  const location = useLocation();
  const [currentPage, setCurrentPage] = useState(0);
  const { name } = useParams();
  useEffect(() => {
    for (let i = 0; i < arr.length; i++) {
      if (location.pathname.includes(arr[i].toLowerCase())) setCurrentPage(i);
    }
  }, [location.pathname]);

  return (
    <>
      <div className={`${styles.containerXl} ${styles.px4} ${styles.mt4}`}>
        <nav className={`${styles.nav} ${styles.navBorders}`}>
          {arr.map((v, i) => {
            return (
              <NavLink
                key={i}
                to={`/editprofile/${name}/${v.toLowerCase()}`}
                className={`${styles.navLink} ${currentPage === i && styles.active} ${
                  i === 0 && styles.ms0
                }`}>
                {v}
              </NavLink>
            );
          })}
        </nav>
        <div className={`${styles.container}`}>
          <Outlet />
        </div>
      </div>
    </>
  );
};
