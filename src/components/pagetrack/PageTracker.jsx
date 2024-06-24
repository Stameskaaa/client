import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { updateCurrentPage } from '../../UI/slices/authSlice';
import { useAppDispatch, useAppSelector } from '../../UI/hooks/hook';
import { changeCurrentNotifcation } from '../../UI/slices/notificationSlice';
import { sendStatus } from '../../UI/api/api';

export const PageTracker = () => {
  const location = useLocation();

  const dispatch = useAppDispatch();
  const name = useAppSelector((state) => state.auth.profileData.name);
  const arr = ['friends', 'message', 'mainpage', 'editprofile', 'registration'];

  useEffect(() => {
    console.log('API URL:', process.env.REACT_APP_SRC);
    console.log('API KEY:', process.env?.SRC);
    if (name !== 'loading') {
      sendStatus('online', name).then((response) =>
        dispatch(changeCurrentNotifcation({ text: response.data.text })),
      );

      return () => {
        sendStatus('offline', name);
      };
    }
  }, [name]);
  useEffect(() => {
    for (let i = 0; i < arr.length; i++) {
      if (location.pathname.includes(arr[i])) {
        if (arr[i] === 'editprofile') {
          dispatch(updateCurrentPage('mainpage'));
          break;
        }

        dispatch(updateCurrentPage(arr[i]));
        break;
      }
      if (location.pathname === '/') {
        dispatch(updateCurrentPage('/'));
        break;
      }
    }
  }, [location.pathname]);
  return null;
};
