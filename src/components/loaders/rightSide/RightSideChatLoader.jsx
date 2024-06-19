import styles from './styles.module.scss';
import general from '../generalClasses.module.scss';
export const RightSideChatLoader = () => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={`${styles.header_img} ${general.animation}`} />
        <div className={styles.header_info}>
          <div className={`${styles.rectangle} ${general.animation}`} />
          <div className={`${styles.rectangle2} ${general.animation}`} />
        </div>
        <div className={styles.header_buttons}>
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className={`${styles.square} ${general.animation}`} />
          ))}
        </div>
      </div>

      <div className={`${styles.text_area} ${general.animation}`}>
        <div className={`${styles.square} ${general.animation}`} />
      </div>
    </div>
  );
};
