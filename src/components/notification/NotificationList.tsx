import { useEffect, useState } from 'react';
import styles from './styles.module.scss';
import { useAppSelector } from '../../UI/hooks/hook';

interface Notification {
  text: string;
  name?: string;
}

type ArrayIndexes = number[];

export const NotificationList: React.FC = () => {
  const [currentNotifications, setCurrentNotifications] = useState<Notification[]>([]);
  const [disabledNotification, setDisabledNotification] = useState<ArrayIndexes>([]);
  const notficateFromStore = useAppSelector((state) => state.notificate.currentSlice);

  useEffect(() => {
    if (notficateFromStore && notficateFromStore?.text) {
      setCurrentNotifications((prev) => [...prev, notficateFromStore]);
      clearCurrentNotification(currentNotifications.length);
    }
  }, [notficateFromStore]);

  const clearCurrentNotification = (indexToRemove: number) => {
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
