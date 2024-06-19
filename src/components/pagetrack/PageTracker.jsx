import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { updateCurrentPage } from '../../UI/slices/authSlice';
export const PageTracker = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const arr = ['friends', 'message', 'mainpage', 'editprofile'];
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
