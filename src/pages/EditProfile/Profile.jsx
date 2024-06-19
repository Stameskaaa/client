import styles from './editprofile.module.scss';
import { useAppSelector } from '../../UI/hooks/hook';
import { useEffect, useState } from 'react';
import { ProfileImage } from '../../components/profileimage/ProfileImage';
import { DefaultButton } from '../../components/button/DefaultButton';
import { Input } from './Input';
import { UploadImage } from './UploadImage';
export const Profile = () => {
  const profileData = useAppSelector((state) => state.auth.profileData);
  const [flag, setFlag] = useState(false);
  const [changeData, setChangeData] = useState({});
  const [showUploadImage, setShowUploadImage] = useState(false);
  function changeFlag(event) {
    event.preventDefault();
    setFlag((prev) => !prev);
  }

  useEffect(() => {
    if (Object.keys(changeData).length !== 0) {
      console.log(changeData);
    }
  }, [changeData]);

  return (
    <>
      {showUploadImage && (
        <UploadImage profileData={profileData} setShowUploadImage={setShowUploadImage} />
      )}
      <div className={styles.colXl4}>
        <div className={`${styles.card} ${styles.mb4} ${styles.mbXl0}`}>
          <div className={styles.cardHeader}>Profile Picture</div>
          <div className={`${styles.cardBody} ${styles.textCenter}`}>
            <ProfileImage className={`${styles.img}`} src={profileData.img} />

            <div
              className={`${styles.small} ${styles.fontItalic} ${styles.textMuted} ${styles.mb4}`}>
              JPG or PNG no larger than 5 MB
            </div>
            <DefaultButton
              onClick={() => setShowUploadImage((prev) => !prev)}
              text="Upload new image"
              className={styles.btn}
            />
          </div>
        </div>
      </div>
      <div className={styles.colXl8}>
        <div className={styles.card}>
          <div className={styles.cardHeader}>Account Details</div>
          <div className={`${styles.cardBody} ${styles.accountDetails}`}>
            <form onSubmit={changeFlag}>
              {[
                ['First Name', 'Denis'],
                ['Last Name', 'Valerevich'],
                ['Location', 'New York, USA'],
                ['Gender', 'Woman'],
                ['Age', '15'],
                ['Work', 'Teacher'],
              ].map((v, i) => {
                return (
                  <Input
                    key={i}
                    setChangeData={setChangeData}
                    labelText={v[0]}
                    flag={flag}
                    placeholder={v[1]}
                    className={`${styles.formControl} ${styles.mb3}`}
                  />
                );
              })}

              <DefaultButton text="Save changes" className={styles.btn} />
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
