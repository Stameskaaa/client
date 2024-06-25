import { useEffect, useState } from 'react';
import styles from './photomains.module.scss';
import { InputFile } from '../InputFile';
import { useParams } from 'react-router-dom';
import { FileList } from '../FileList';
import styleButt from '../mainpage.module.scss';
import { useAppSelector } from '../../../UI/hooks/hook';
import { getPhotos, sendPhoto } from '../../../api/api';
import { CircularProgress } from '@mui/material';
import { FullScreen } from '../../../components/fullscreen/FullScreen';

export const PhotosMain = () => {
  const [files, setFiles] = useState([]);
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [privateProfile, setPrivateProfile] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  const profileObj = useAppSelector((state) => state.auth.profileData);
  let currentTime = new Date();
  let { name } = useParams();
  const [visible, setVisible] = useState(false);

  const getPhotosReq = async function () {
    try {
      let data = await getPhotos(name);

      setPhotos(data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (profileObj.name === name) {
      setPrivateProfile(false);
    } else {
      setPrivateProfile(true);
    }

    setLoading(true);
    getPhotosReq();
  }, []);

  const sendPosts = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (files.length > 0) {
      const promises = files.map(async (file) => {
        const formData = new FormData();
        formData.append('name', name);
        formData.append('photo[time]', currentTime.toLocaleString());
        formData.append('photo[likes]', 0);
        formData.append('photo[comments]', 0);
        formData.append('photo[reposts]', 0);
        formData.append('file', file);

        return sendPhoto(formData);
      });
      try {
        await Promise.all(promises);
        getPhotosReq();
      } catch (error) {
        console.log(error);
      }
      setFiles([]);
    }
  };

  return (
    <>
      <div className={styles.container}>
        {loading ? (
          <div style={{ margin: 'auto', padding: '10px' }}>
            <CircularProgress size={'50px'} />
          </div>
        ) : photos.length <= 1 ? (
          <div style={{ alignSelf: 'center' }}>No photos</div>
        ) : (
          <div className={styles.photo_container}>
            {visible ? (
              <FullScreen
                setCurrentIndex={setCurrentIndex}
                onClick={() => setVisible(false)}
                arrPhoto={photos
                  .slice(1)
                  .map((imageObj) => `data:image/png;base64,${imageObj?.file[0].buffer}`)}
                currentIndex={currentIndex}
              />
            ) : null}
            {photos.map((imageObj, i) => {
              if (imageObj !== '')
                return (
                  <img
                    alt="img"
                    className={styles.img}
                    key={i}
                    onClick={() => {
                      setCurrentIndex(i - 1);
                      setVisible(true);
                    }}
                    src={`data:image/png;base64,${imageObj?.file[0].buffer}`}
                  />
                );
            })}
          </div>
        )}
        {!privateProfile && !loading && (
          <div className={styles.input_container}>
            <form
              encType="multipart/form-data"
              onSubmit={(e) => sendPosts(e)}
              className={styles.form}>
              <div className={styles.input}>
                <InputFile setFiles={setFiles} text="Add photo" />
                <button className={styleButt.post__button}>Post</button>
              </div>
            </form>
            <FileList setFiles={setFiles} files={files} />
          </div>
        )}
      </div>
    </>
  );
};
