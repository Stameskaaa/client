import { MdOutlineUnsubscribe } from 'react-icons/md';
import styles from './mainpage.module.scss';
import { CircularProgress } from '@mui/material';

export const UnSub = ({ text, onClick, buttonLoading }) => {
  return (
    <button onClick={buttonLoading ? null : onClick}>
      {buttonLoading ? (
        <CircularProgress size={13} />
      ) : (
        <MdOutlineUnsubscribe className={styles.subscribe} />
      )}{' '}
      {text}
    </button>
  );
};
