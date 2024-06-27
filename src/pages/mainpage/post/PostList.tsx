import { memo, useState } from 'react';
import styles from '../mainpage.module.scss';
import { ProfileImage } from '../../../components/profileimage/ProfileImage';
import { FullScreen } from '../../../components/fullscreen/FullScreen';
import { UserData, Posts, UnionFileBuffer } from '../../../types/interfaces';

interface Props {
  userData: UserData | undefined;
  posts: Posts[];
}

export const PostList: React.FC<Props> = memo(({ userData, posts }) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [showPhoto, setShowPhoto] = useState<boolean>(false);
  const [arrPhoto, setArrPhoto] = useState<UnionFileBuffer[]>([]);

  return (
    <>
      {userData
        ? posts.map((v, i) => {
            return (
              <div key={i} className={styles.rightside_post_container}>
                {i === 0 ? null : <hr className={styles.hr} />}
                {showPhoto && (
                  <FullScreen
                    onClick={() => setShowPhoto(false)}
                    currentIndex={currentIndex}
                    setCurrentIndex={setCurrentIndex}
                    arrPhoto={arrPhoto}
                  />
                )}
                <div className={styles.rightside_post}>
                  <div className={styles.container_post__header}>
                    <ProfileImage src={userData.img} className={styles.test} />
                    <p className={styles.container_post__text}>
                      {userData.name} {userData.lastName !== '' ? userData.lastName : null}
                    </p>{' '}
                    <p className={styles.container_post__time}>{v.time}</p>{' '}
                  </div>
                  <div className={styles.container_post__text}>{v.value}</div>
                </div>
                {v.files ? (
                  <div className={styles.container_post__photo}>
                    {v.files.map((imageObj, i) => {
                      return (
                        <img
                          onClick={() => {
                            setArrPhoto(v.files as UnionFileBuffer[]);
                            setShowPhoto(true);
                            setCurrentIndex(i);
                          }}
                          alt="img"
                          className={styles.post__photo}
                          key={i}
                          src={`data:image/png;base64,${imageObj?.buffer}`}
                        />
                      );
                    })}{' '}
                  </div>
                ) : null}
              </div>
            );
          })
        : null}
    </>
  );
});
