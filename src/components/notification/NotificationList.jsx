import { useEffect, useState } from 'react';
import styles from './styles.module.scss';
import { useAppSelector } from '../../UI/hooks/hook';

export const NotificationList = () => {
  const [currentNotifications, setCurrentNotifications] = useState([]);
  const [disabledNotification, setDisabledNotification] = useState([]);
  const notficateFromStore = useAppSelector((state) => state.notificate.currentSlice);

  useEffect(() => {
    if (notficateFromStore?.text) {
      setCurrentNotifications((prev) => [...prev, notficateFromStore]);
      clearCurrentNotification(currentNotifications.length);
    }
  }, [notficateFromStore]);

  const clearCurrentNotification = (indexToRemove) => {
    setTimeout(() => {
      setDisabledNotification((prev) => [...prev, indexToRemove]);
    }, 9000);
  };

  useEffect(() => {
    if (disabledNotification.length === currentNotifications.length) {
      setCurrentNotifications([]);
      setDisabledNotification([]);
    }
  }, [disabledNotification.length]);

  return currentNotifications.length > 0 ? (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        {currentNotifications.map((notif, i) => {
          return (
            <div
              onClick={() => console.log(1)}
              key={i}
              className={`${styles.notification} ${
                disabledNotification.filter((index) => index === i).length > 0
                  ? styles.hidden
                  : null
              }`}>
              {notif.name ? <p>{notif.name}</p> : null}
              <p>{notif.text}</p>
            </div>
          );
        })}
      </div>
    </div>
  ) : null;
};
