import { Button, CircularProgress, Input } from '@mui/material';
import { useEffect, useState } from 'react';
import { authStateCheck } from '../slices/authSlice';
import { useAppDispatch, useAppSelector } from '../hooks/hook';
import styles from './hocauth.module.scss';
import { loginUser } from '../../api/api';
export const LoginPage = ({ children }) => {
  const dispatch = useAppDispatch();
  const auth = useAppSelector((state) => state.auth);
  const [loginValue, setLoginValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    if (localStorage.getItem('profileData')) {
      const userData = JSON.parse(localStorage.getItem('profileData'));
      dispatch(authStateCheck({ flag: true, infoPerson: userData }));
    } else if (auth.profileData.name !== 'loading') {
      localStorage.setItem('profileData', JSON.stringify(auth.profileData));
    }
    setLoading(false);
  }, [auth.authState]);

  const authCheck = async (log, pass) => {
    if (log && pass)
      try {
        await loginUser(log, pass).then((response) => {
          if (response.data) {
            dispatch(authStateCheck({ flag: true, infoPerson: response.data[0] }));
          }
        });
      } catch (error) {
        console.log(error);
      } finally {
        setLoginValue('');
        setPasswordValue('');
      }
  };

  if (loading) {
    return (
      <div style={{ margin: '30px' }}>
        <CircularProgress size={50} />;
      </div>
    );
  }

  if (!auth.authState) {
    return (
      <div className={styles.containerforcontainer}>
        <label style={{ color: '#c5c6c7' }}>Авторизация</label>
        <hr style={{ width: '80%' }} />
        <div className={styles.container}>
          <Input
            placeholder="Login"
            type="text"
            value={loginValue}
            onChange={(e) => setLoginValue(e.target.value)}
            style={{ color: '#c5c6c7' }}
          />
          <Input
            placeholder="Password"
            type="password"
            value={passwordValue}
            onChange={(e) => setPasswordValue(e.target.value)}
            style={{ color: '#c5c6c7' }}
          />
          <Button onClick={() => authCheck(loginValue, passwordValue)}>send</Button>
        </div>
      </div>
    );
  }
  return children;
};
