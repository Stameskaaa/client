import styles from './editprofile.module.scss';
import { useAppDispatch, useAppSelector } from '../../UI/hooks/hook';
import { useState } from 'react';
import { ProfileImage } from '../../components/profileimage/ProfileImage';
import { DefaultButton } from '../../components/button/DefaultButton';
import { Input } from './Input';
import { UploadImage } from './UploadImage';
import { changeProfileData } from '../../api/api';
import { updateProfileData } from '../../UI/slices/authSlice';
import { changeCurrentNotifcation } from '../../UI/slices/notificationSlice';

export const Profile = () => {
  const dispatch = useAppDispatch();
  const profileData = useAppSelector((state) => state.auth.profileData);
  const [flag, setFlag] = useState(false);
  const [changeData, setChangeData] = useState({});
  const [showUploadImage, setShowUploadImage] = useState(false);
  async function changeFlag(event) {
    event.preventDefault();
    setFlag((prev) => !prev);
    if (Object.keys(changeData).length !== 0) {
      const data = await changeProfileData(changeData, profileData.name);
      if (data?.data?.acknowledged) {
        dispatch(
          changeCurrentNotifcation({
            text: 'Данные успешно обновлены',
          }),
        );
        dispatch(updateProfileData({ ...profileData, ...changeData }));
      } else {
        dispatch(
          changeCurrentNotifcation({
            text: 'Произошла ошибка',
          }),
        );
      }
      setChangeData({});
    }
  }

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
                ['Last Name', 'Valerevich', 'lastName'],
                ['Location', 'New York, USA', 'location'],
                ['Gender', 'Woman', 'gender'],
                ['Age', '15', 'age'],
                ['Work', 'Teacher', 'work'],
                ['Martial Status', 'Married', 'martialStatus'],
                ['Birth Date', '13.06.24', 'birthDate'],
              ].map((v, i) => {
                return (
                  <Input
                    key={i}
                    setChangeData={setChangeData}
                    arrValue={v}
                    flag={flag}
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
