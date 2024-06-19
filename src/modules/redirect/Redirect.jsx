import React, { useEffect } from 'react';
import styles from './redirect.module.scss';
import { useNavigate } from 'react-router-dom';
import { CircularProgress } from '@mui/material';
export const CustomRedirect = ({ path = '/' }) => {
  const navigate = useNavigate();
  useEffect(() => {
    setTimeout(() => {
      navigate('/');
    }, 1000);
  }, []);

  return (
    <div className={styles.container}>
      Redirect
      <CircularProgress
        style={{
          marginLeft: 'auto',
          marginRight: 'auto',
          color: '#45a29e',
          width: '3em',
          height: '3em',
        }}
        color="secondary"
      />
    </div>
  );
};
