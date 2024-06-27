import styles from './styles.module.scss';

interface Props {
  emoji: string;
  onClick?: () => void;
}

export const Emoji: React.FC<Props> = ({ emoji, onClick }) => {
  if (!emoji) {
    return null;
  }

  return (
    <span className={styles.container} onClick={onClick}>
      {emoji}
    </span>
  );
};
