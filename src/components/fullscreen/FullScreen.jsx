import { useEffect, useState } from 'react';
import styles from './styles.module.scss';

export const FullScreen = ({
  src = process.env.REACT_APP_SRC,
  onClick = null,
  onClickInner = null,
  arrPhoto,
  currentIndex,
  setCurrentIndex = null,
}) => {
  const [changedArrPhoto, setChangedArrPhoto] = useState([]);

  useEffect(() => {
    if (arrPhoto.length > 0 && arrPhoto[0].buffer) {
      setChangedArrPhoto(
        arrPhoto.map((v) => {
          return `data:image/png;base64,${v.buffer}`;
        }),
      );
    } else {
      setChangedArrPhoto(arrPhoto);
    }
  }, [arrPhoto]);

  return (
    <div onClick={onClick} className={styles.container}>
      <div onClick={(e) => e.stopPropagation()} className={styles['inner-container']}>
        {changedArrPhoto.length > 1 && (
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
          src={changedArrPhoto[currentIndex] || src}
          className={styles.photo}
        />

        {changedArrPhoto.length > 1 && (
          <button
            disabled={currentIndex === changedArrPhoto.length - 1}
            className={`${styles.button} ${styles.right} ${
              currentIndex === changedArrPhoto.length - 1 ? styles.inactive : styles.active
            }`}
            onClick={() => {
              setCurrentIndex && setCurrentIndex(currentIndex + 1);
            }}>
            &rarr;
          </button>
        )}
      </div>
      {changedArrPhoto.length > 1 ? (
        <div className={styles.photo_count}>
          {currentIndex + 1} из {changedArrPhoto.length}
        </div>
      ) : null}
    </div>
  );
};
