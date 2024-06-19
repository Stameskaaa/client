import styles from './styles.module.scss';
import general from '../generalClasses.module.scss';
export const LeftSideChatLoading = ({ userData, currentUser }) => {
  return (
    <>
      <div className={`${styles.rectangle} ${general.animation}`} />
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className={styles.container}>
          <div className={`${styles.circle} ${general.animation}`} />
          <div className={styles.info_container}>
            <div className={`${styles.user_info} ${general.animation}`} />
            <div className={`${styles.user_status} ${general.animation}`} />
          </div>
        </div>
      ))}
    </>
  );
};
