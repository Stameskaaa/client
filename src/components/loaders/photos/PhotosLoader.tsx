import styles from './styles.module.scss';
import general from '../generalClasses.module.scss';
export const PhotosLoader: React.FC = () => {
  return (
    <div className={styles.container}>
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className={`${styles.photo} ${general.animation}`}></div>
      ))}
    </div>
  );
};
