import { useNavigate } from 'react-router-dom';
import styles from './myprofile.module.scss';
import { ProfileImage } from '../../../components/profileimage/ProfileImage';
export const MyProfile = ({ profileObj }) => {
  const navigate = useNavigate();
  return (
    <div className={styles.container}>
      <h4> MyProfile</h4>
      <ProfileImage
        onClick={() => navigate(`/mainpage/${profileObj.name}/`)}
        className={styles.profileImage}
        src={profileObj.img}
      />

      <hr className={styles.hr} />
      <p>
        {profileObj.name} {profileObj.lastName !== 'unknown' ? profileObj.lastName : null}
      </p>

      <p>MartialStatus: {profileObj.martialStatus}</p>
      <p>Age: {profileObj.age}</p>
    </div>
  );
};
