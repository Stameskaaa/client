import styles from './styles.module.scss';

export const FullScreen = ({
  src = process.env.REACT_APP_SRC,
  onClick = null,
  onClickInner = null,
  arrPhoto,
  currentIndex,
  setCurrentIndex = null,
}) => {
  return (
    <div onClick={onClick} className={styles.container}>
      <div onClick={(e) => e.stopPropagation()} className={styles['inner-container']}>
        {arrPhoto.length > 1 && (
          <button
            disabled={currentIndex === 0}
            className={`${styles.button} ${styles.left} ${
              currentIndex === 0 ? styles.inactive : styles.active
            }`}
            onClick={() => {
              setCurrentIndex && setCurrentIndex(currentIndex - 1);
            }}>
            &larr;
          </button>
        )}

        <img
          onClick={() => {
            onClickInner && onClickInner();
          }}
          src={arrPhoto[currentIndex] || src}
          className={styles.photo}
        />

        {arrPhoto.length > 1 && (
          <button
            disabled={currentIndex === arrPhoto.length - 1}
            className={`${styles.button} ${styles.right} ${
              currentIndex === arrPhoto.length - 1 ? styles.inactive : styles.active
            }`}
            onClick={() => {
              setCurrentIndex && setCurrentIndex(currentIndex + 1);
            }}>
            &rarr;
          </button>
        )}
      </div>
      {arrPhoto.length > 1 ? (
        <div className={styles.photo_count}>
          {currentIndex + 1} из {arrPhoto.length}
        </div>
      ) : null}
    </div>
  );
};
