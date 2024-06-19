import styles from './styles.module.scss';
export const Emoji = ({ emoji, onClick = null }) => {
  if (!emoji) {
    return null;
  }

  return (
    <span className={styles.container} onClick={onClick}>
      {emoji}
    </span>
  );
};
