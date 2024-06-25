import styles from './styles.module.scss';
import general from '../generalClasses.module.scss';
export const FriendsReqLoader: React.FC = () => {
  return (
    <div className={`${styles.container} ${general.animation}`}>
      <div className={`${styles.img} ${general.animation}`} />
      <div className={`${styles.text} ${general.animation}`} />
    </div>
  );
};
