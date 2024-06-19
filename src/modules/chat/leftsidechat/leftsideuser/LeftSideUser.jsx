import styles from './leftsideuser.module.scss';
import { useNavigate } from 'react-router-dom';
import { ProfileImage } from '../../../../components/profileimage/ProfileImage';
export const LeftSideUser = ({ userData, currentUser }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/chat/${userData.name}`)}
      className={`${styles.container} ${userData.name === currentUser ? styles.active : null}`}>
      <ProfileImage className={styles.img} src={userData.img} />
      <div className={styles.user_info}>
        <span>
          {userData.name}
          {` `}
          {userData.lastName}
        </span>
        <div className={styles.user_info__status}>
          <div className={styles.circle__online} />
          <span>Online</span>
        </div>
      </div>
    </div>
  );
};