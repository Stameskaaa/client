import { useEffect, useState } from 'react';
import styles from './messagebloack.module.scss';
import { ProfileImage } from '../../components/profileimage/ProfileImage';
import { useNavigate } from 'react-router-dom';
import { getUser } from '../../api/api';
import { MessageBlockLoader } from '../../components/loaders/messageBlockLoader/MessageBlockLoader';
import { UserData } from '../../types/interfaces';
interface Props {
  text: string;
  time: string;
  nameSecond: string;
}

export const MessageBlock: React.FC<Props> = ({ text = '', time = '', nameSecond }) => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [innerLoading, setInnerLoading] = useState<boolean>(true);
  const navigate = useNavigate();
  useEffect(() => {
    setInnerLoading(true);
    const getUserReq = async () => {
      try {
        const data = await getUser(nameSecond);
        setUserData(data);
      } catch (error) {
        console.log(error);
      } finally {
        setInnerLoading(false);
      }
    };

    getUserReq();
  }, [nameSecond]);

  const formatTime = (time: string) => {
    const date = new Date(time);
    const now = new Date();

    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    const monthNames = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];

    if (diffDays > 1) {
      const day = date.getDate().toString().padStart(2, '0');
      const month = monthNames[date.getMonth()];
      return `${month} ${day}`;
    } else {
      const hours = date.getUTCHours().toString().padStart(2, '0');
      const minutes = date.getUTCMinutes().toString().padStart(2, '0');
      return `${hours}:${minutes}`;
    }
  };

  return !innerLoading ? (
    userData && (
      <div
        onClick={() => navigate(`/chat/${nameSecond}`, { state: { secondUser: nameSecond } })}
        className={styles.container}>
        <ProfileImage className={styles.img} src={userData.img} />
        <div className={styles.wrapper}>
          <p>{nameSecond}</p>
          <div className={styles.container__message_text}>
            <div className={styles.text}>{text}</div>
            <div className={styles.time}>{time ? formatTime(time) : null}</div>
          </div>
        </div>
      </div>
    )
  ) : (
    <MessageBlockLoader />
  );
};
