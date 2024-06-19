import styles from './styles.module.scss';
import general from '../generalClasses.module.scss';
export const UserListLoading = () => {
  return Array.from({ length: 3 }).map((_, i) => (
    <div key={i}>
      <div className={styles.container}>
        <div className={`${styles.img} ${general.animation}`} />
        <div className={`${styles.info} ${general.animation}`} />
        <div className={`${styles.button} ${general.animation}`} />
      </div>
      <hr className={styles.hr} />
    </div>
  ));
};
