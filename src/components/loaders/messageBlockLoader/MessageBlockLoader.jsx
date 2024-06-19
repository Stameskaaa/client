import styles from './styles.module.scss';
import general from '../generalClasses.module.scss';
export const MessageBlockLoader = () => {
  return (
    <div className={`${styles.container} ${general.animation}`}>
      <div className={`${styles.img} ${general.animation}`} />
      <div className={styles.info}>
        <div className={`${styles.rectangle} ${general.animation}`} />
        <div className={`${styles.rectangle2} ${general.animation}`} />
      </div>
    </div>
  );
};
