import { useEffect, useState } from 'react';
import styles from './profileblock.module.scss';
import { useAppSelector } from '../../UI/hooks/hook';
import { useParams, useNavigate } from 'react-router-dom';
import { getUser } from '../../api/api';
import { UserData } from '../../types/interfaces';

export const ProfileBlock: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const profileObj = useAppSelector((state) => state.auth.profileData);
  const [currentProfile, setCurrentProfile] = useState<UserData>(profileObj);
  const navigate = useNavigate();
  let { name } = useParams();
  const [privateProfile, setPrivateProfile] = useState(() =>
    name == profileObj.name ? true : false,
  );

  useEffect(() => {
    if (profileObj.name === name) {
      setCurrentProfile(profileObj);
      setPrivateProfile(true);
      setLoading(false);
    } else {
      getUser(name as string)
        .then((res) => {
          if (res) {
            setCurrentProfile(res);
          }
          setPrivateProfile(false);
          setLoading(false);
        })
        .catch((e) => {
          console.log(e);
          navigate('/');
        });
    }
  }, [name]);

  return (
    <>
      {loading ? (
        <div>Загрузка</div>
      ) : (
        <div className={styles.container}>
          <img className={styles.image} src={currentProfile.img} />
          <div className={styles.description}>
            {currentProfile.name}
            {` `}
            {currentProfile.lastName}
            <hr className={styles.coloredHr} />
            <ul className={styles.ul}>
              <li>Age: {currentProfile.age}</li>
              <li>Work: {currentProfile.work}</li>
            </ul>
          </div>
          {privateProfile && <button className={styles.button}>Редактировать</button>}
        </div>
      )}
    </>
  );
};
