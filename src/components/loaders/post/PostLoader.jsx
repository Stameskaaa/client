import styles from './styles.module.scss';
import general from '../generalClasses.module.scss';
export const PostLoader = () => {
  return (
    <>
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className={styles.wrapper}>
          <div className={styles.container}>
            <div className={`${styles.img} ${general.animation}`} />
            <div className={`${styles.data} ${general.animation}`} />
            <div className={`${styles.data} ${styles.data2} ${general.animation}`} />
          </div>
          <div className={`${styles.text} ${general.animation}`} />
          <hr />
        </div>
      ))}
    </>
  );
};
