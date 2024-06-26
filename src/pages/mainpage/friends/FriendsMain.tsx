import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styles from './friendsmain.module.scss';
import { useAppSelector } from '../../../UI/hooks/hook';
import { ProfileImage } from '../../../components/profileimage/ProfileImage';
import { getUserList } from '../../../api/api';
import { CircularProgress } from '@mui/material';
import { UserData } from '../../../types/interfaces';

export const FriendsMain: React.FC = () => {
  const navigate = useNavigate();
  const profileData = useAppSelector((state) => state.auth.profileData);
  const { name } = useParams();
  const [friendList, setFriendList] = useState<UserData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  async function getfriends() {
    try {
      const data = await getUserList(name as string, 'friends');
      if (typeof data === 'string') {
        console.log('user not found');
      } else {
        setFriendList(data);
      }
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getfriends();
  }, []);

  return loading ? (
    <div style={{ paddingTop: '15px' }}>
      <CircularProgress style={{ color: 'var(--color-primary)' }} size={'50px'} />
    </div>
  ) : friendList.length > 0 ? (
    <div className={styles.container}>
      {friendList.map((v, i) => {
        if (v) {
          let flag = false;
          if (v.name === profileData.name) {
            flag = true;
          }
          if (typeof v !== 'string') {
            return (
              <div
                onClick={() => navigate(`/mainpage/${v.name}/posts`, { state: 'posts' })}
                className={styles.friendblock_container}
                key={i}>
                {' '}
                <ProfileImage src={v.img} className={styles.img_container} />
                {v.name} {v.lastName !== 'unknown' && v.lastName} {flag && '(Вы)'}
                <br /> <br />
                {v.gender !== 'unknown' && `Gender: ${v.gender}`}
                <br />
                {v.age !== 'unknown' && `Age: ${v.age}`}
              </div>
            );
          }
        }
      })}
    </div>
  ) : (
    <div>Друзей нет</div>
  );
};
