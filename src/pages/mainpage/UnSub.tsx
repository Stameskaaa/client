import { MdOutlineUnsubscribe } from 'react-icons/md';
import styles from './mainpage.module.scss';
import { CircularProgress } from '@mui/material';

interface Props {
  text: string;
  onClick: React.MouseEventHandler<HTMLButtonElement> | undefined;
  buttonLoading: boolean;
}

export const UnSub: React.FC<Props> = ({ text, onClick, buttonLoading }) => {
  return (
    <button onClick={buttonLoading ? undefined : onClick}>
      {buttonLoading ? (
        <CircularProgress size={13} />
      ) : (
        <MdOutlineUnsubscribe className={styles.subscribe} />
      )}{' '}
      {text}
    </button>
  );
};
