import styles from './profilenavigation.module.scss';
export const ProfileNavigation: React.FC = () => {
  return (
    <div className={styles.container}>
      <button className={styles.button}>My Groups</button>
      <button>My Events</button>
      <button>My photos</button>
    </div>
  );
};
