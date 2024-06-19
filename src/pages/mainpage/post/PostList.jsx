import { memo } from 'react';
import styles from '../mainpage.module.scss';
import { ProfileImage } from '../../../components/profileimage/ProfileImage';

export const PostList = memo(({ userData, posts }) => {
  return (
    <>
      {posts.map((v, i) => {
        // if (i === 7) {
        //   return null;
        // }

        return (
          <div key={i} className={styles.rightside_post_container}>
            {i === 0 ? null : <hr className={styles.hr} />}

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
            {v.photos ? (
              <div className={styles.container_post__photo}>
                {v.photos.map((imageObj, i) => {
                  return (
                    <img
                      className={styles.post__photo}
                      key={i}
                      src={URL.createObjectURL(imageObj)}
                    />
                  );
                })}
              </div>
            ) : null}
            {v.files ? (
              <div className={styles.container_post__photo}>
                {v.files.map((imageObj, i) => {
                  return (
                    <img
                      className={styles.post__photo}
                      key={i}
                      src={`data:image/png;base64,${imageObj.buffer}`}
                    />
                  );
                })}{' '}
              </div>
            ) : null}
          </div>
        );
      })}
    </>
  );
});
