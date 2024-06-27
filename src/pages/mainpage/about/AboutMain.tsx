import styles from './aboutmain.module.scss';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getUser } from '../../../api/api';
import { CircularProgress } from '@mui/material';
import { UserData } from '../../../types/interfaces';

export const AboutMain: React.FC = () => {
  const [info, setInfo] = useState<UserData | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(true);
  let { name } = useParams();

  useEffect(() => {
    setLoading(true);
    getUser(name as string)
      .then((resolve) => {
        if (!resolve) {
          setInfo(undefined);
        } else {
          setInfo(resolve);
        }
      })
      .finally(() => setLoading(false));
  }, [name]);

  return loading ? (
    <div style={{ paddingTop: '15px' }}>
      <CircularProgress style={{ color: 'var(--color-primary)' }} size={'50px'} />
    </div>
  ) : !info ? (
    <div>Данных нет </div>
  ) : (
    <div className={styles.container}>
      <h3>Basic Information</h3>
      <hr className={styles.main_hr} />
      <p>
        FullName: {info.name} {info.lastName !== 'unknown' ? info.lastName : null}
      </p>
      <hr className={styles.hr} />
      <p>Gender: {info.gender}</p>
      <hr className={styles.hr} />

      <p>Birth Date: {info.birthDate}</p>
      <hr className={styles.hr} />

      <p>Martial Status: {info.martialStatus}</p>
      <hr className={styles.hr} />

      <p>Location: {info.location}</p>
    </div>
  );
};
