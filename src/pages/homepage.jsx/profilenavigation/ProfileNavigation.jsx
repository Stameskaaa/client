import styles from './profilenavigation.module.scss';
export const ProfileNavigation = () => {
  return (
    <div className={styles.container}>
      <button className={styles.button}>My Groups</button>
      <button>My Events</button>
      <button>My photos</button>
    </div>
  );
};
