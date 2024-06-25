import styles from './chatuserheader.module.scss';
import { IoMdSettings } from 'react-icons/io';
import { MdInsertPhoto } from 'react-icons/md';
import { MdPhotoCamera } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { ProfileImage } from '../../../../components/profileimage/ProfileImage';
export const ChatUserHeader = ({ userData }) => {
  const navigate = useNavigate();

  return (
    userData && (
      <>
        <div className={styles.container}>
          <ProfileImage
            src={userData?.img}
            className={styles.img}
            onClick={() => navigate(`/mainpage/${userData.name}/posts`)}
          />

          <div className={styles.user_info}>
            <p>{userData.name}</p>
            <p>{userData.status === 'online' ? 'Online' : 'last seen 15 min'}</p>
          </div>
          <div className={styles.container_buttons}>
            <IoMdSettings className={styles.button} />
            <MdInsertPhoto className={styles.button} />
            <MdPhotoCamera className={styles.button} />
          </div>
        </div>
        <hr className={styles.hr} />
      </>
    )
  );
};
