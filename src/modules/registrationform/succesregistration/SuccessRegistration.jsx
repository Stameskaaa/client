import { useNavigate } from 'react-router-dom';
import styles from './successregistration.module.scss';

import { useEffect } from 'react';
import { CircularProgress } from '@mui/material';

export const SuccessRegistration = () => {
  const navigate = useNavigate();
  useEffect(() => {
    setTimeout(() => navigate('/'), 3000);
  }, []);

  return (
    <>
      {' '}
      <div className={styles.container}>
        SuccessRegistration
        <CircularProgress
          style={{ color: 'white', width: '2em', height: '2em' }}
          color="secondary"
          className={styles.loading}
        />
      </div>
    </>
  );
};
