import { memo, useEffect, useState } from 'react';
import styles from './chat.module.scss';
import { useAppSelector } from '../../UI/hooks/hook';
import { ProfileImage } from '../../components/profileimage/ProfileImage';
const monthNames = [
  'января',
  'февраля',
  'марта',
  'апреля',
  'мая',
  'июня',
  'июля',
  'августа',
  'сентября',
  'октября',
  'ноября',
  'декабря',
];
export const ChatMessagesBlock = memo(({ userData, latestMessage, messages }) => {
  const [flag, setFlag] = useState(false);
  const firstUserData = useAppSelector((state) => state.auth.profileData);
  const [selectedMess, setSelectedMess] = useState([]);
  const [resultMessages, setResultMessages] = useState([]);

  useEffect(() => {
    if (latestMessage.length === 0 && messages.length === 0) {
      setFlag(true);
    } else {
      setFlag(false);
      setResultMessages([...latestMessage, ...messages]);
    }
  }, [messages, latestMessage]);

  const selectMessage = (index) => {
    if (selectedMess.includes(index)) {
      setSelectedMess((prev) => prev.filter((v) => v !== index));
    } else {
      setSelectedMess((prev) => [...prev, index]);
    }
  };

  const formatDate = (date) => {
    const now = new Date();
    const diff = now - date;

    const ONE_DAY = 24 * 60 * 60 * 1000;

    if (diff < ONE_DAY) {
      const hours = date.getHours().toString().padStart(2, '0');
      const minutes = date.getMinutes().toString().padStart(2, '0');
      return `${hours}:${minutes}`;
    } else {
      const day = date.getDate();

      const month = monthNames[date.getMonth()];
      return `${day} ${month}`;
    }
  };

  return (
    <div className={styles.container__messageblock}>
      {resultMessages.length > 0
        ? resultMessages.map((v, i) => {
            const dateObject = new Date(v.time);

            return (
              <div
                key={i}
                onClick={() => selectMessage(i)}
                className={`${styles.container__messagefield} ${
                  selectedMess.includes(i) ? styles.active : null
                }`}>
                <div className={styles.messagefield__author}>
                  <ProfileImage
                    src={firstUserData.name === v.user ? firstUserData.img : userData.img}
                    className={styles.author_img}
                  />

                  <p>{v.user}</p>
                  <p style={{ marginLeft: 'auto' }}>{formatDate(dateObject)}</p>
                </div>
                <div className={styles.messagefield__content} key={i}>
                  {v.message}
                </div>
              </div>
            );
          })
        : null}
      {flag ? <div>Начните общение</div> : null}
    </div>
  );
});
