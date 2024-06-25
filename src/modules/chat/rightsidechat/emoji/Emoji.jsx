import styles from './styles.module.scss';
export const Emoji = ({ emoji, onClick }) => {
  if (!emoji) {
    return null;
  }

  return (
    <span className={styles.container} onClick={onClick}>
      {emoji}
    </span>
  );
};
