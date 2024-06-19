import styles from './aboutmain.module.scss';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getUser } from '../../../UI/api/api';
import { CircularProgress } from '@mui/material';
export const AboutMain = () => {
  const [info, setInfo] = useState({});
  const [loading, setLoading] = useState(true);
  const [outOfData, setOutOfData] = useState(false);
  let { name } = useParams();

  useEffect(() => {
    setLoading(true);
    getUser(name)
      .then((resolve) => {
        if (!resolve) {
          setOutOfData(true);
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
  ) : outOfData ? (
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
