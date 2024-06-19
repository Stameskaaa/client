import { MdOutlineUnsubscribe } from 'react-icons/md';
import styles from './mainpage.module.scss';

export const UnSub = ({ text, onClick }) => {
  return (
    <button onClick={onClick}>
      <MdOutlineUnsubscribe className={styles.subscribe} /> {text}
    </button>
  );
};
