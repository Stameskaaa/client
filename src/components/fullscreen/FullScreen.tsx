import { useEffect, useState } from 'react';
import styles from './styles.module.scss';
import { UnionFileBuffer } from '../../types/interfaces';
interface Props {
  src?: string;
  setCurrentIndex: (index: number) => void;
  currentIndex: number;
  onClick: (event: React.MouseEvent<HTMLDivElement>) => void;
  onClickInner?: (event: React.MouseEvent<HTMLImageElement>) => void;
  arrPhoto: string[] | UnionFileBuffer[];
}

export const FullScreen: React.FC<Props> = ({
  src = process.env.REACT_APP_SRC || '',
  onClick,
  onClickInner = null,
  arrPhoto,
  currentIndex,
  setCurrentIndex = null,
}) => {
  const [changedArrPhoto, setChangedArrPhoto] = useState<string[]>([]);

  useEffect(() => {
    if (arrPhoto.length > 0 && typeof arrPhoto[0] === 'object') {
      setChangedArrPhoto(
        (arrPhoto as UnionFileBuffer[]).map((v) => {
          return `data:image/png;base64,${v.buffer}`;
        }),
      );
    } else {
      setChangedArrPhoto(arrPhoto as string[]);
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
          onClick={(e) => {
            onClickInner && onClickInner(e);
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
