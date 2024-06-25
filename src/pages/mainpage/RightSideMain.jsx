import styles from './mainpage.module.scss';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { PostList } from './post/PostList';
import { useAppSelector } from '../../UI/hooks/hook';
import { InputFile } from './InputFile';
import { FileList } from './FileList';
import { getUser, sendPost } from '../../api/api';
import { PostLoader } from '../../components/loaders/post/PostLoader';
export const RightSideMain = () => {
  const [posts, setPosts] = useState([]);
  const [value, setValue] = useState('');
  const [status, setStatus] = useState('loading');
  const [files, setFiles] = useState([]);
  const [userData, setUserData] = useState('');
  const profileObj = useAppSelector((state) => state.auth.profileData);
  let { name } = useParams();
  let currentTime = new Date();

  let privateProfile;
  name === profileObj.name ? (privateProfile = true) : (privateProfile = false);

  const sendPosts = async (e) => {
    e.preventDefault();
    if (value) {
      const formData = new FormData();

      formData.append('name', name);
      formData.append('message[value]', value);
      formData.append('message[time]', currentTime.toLocaleString());
      formData.append('message[likes]', 0);
      formData.append('message[comments]', 0);
      formData.append('message[reposts]', 0);

      files.forEach((file) => {
        formData.append('files', file);
      });

      await sendPost(formData)
        .then((response) => {
          if (response.data) {
            setPosts((prev) => [
              {
                value,
                time: currentTime.toLocaleString(),
                likes: 0,
                comments: 0,
                reposts: 0,
                photos: files,
              },
              ...prev,
            ]);
          }
        })
        .catch((e) => console.log(e));
      setStatus('haveData');
      setFiles([]);
      setValue('');
    }
  };

  useEffect(() => {
    getUser(name).then((resolve) => {
      try {
        setUserData(resolve);
        if (resolve.posts && resolve.posts.length > 0) {
          setPosts(resolve.posts.reverse());
          setStatus('haveData');
        } else {
          setStatus('noData');
        }
      } catch (error) {
        console.log(error);
      }
    });
  }, [name]);

  return (
    <>
      {privateProfile ? (
        <form encType="multipart/form-data" onSubmit={(e) => sendPosts(e)} className={styles.form}>
          <textarea
            placeholder="Whats on your mind..."
            rows="5"
            className={styles.textarea}
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <div className={styles.textarea_button_container}>
            <div className={styles.input_file_row}>
              <InputFile setFiles={setFiles} />
            </div>
            <button type="submit" className={styles.post__button}>
              Post
            </button>
          </div>
          <FileList files={files} setFiles={setFiles} />
        </form>
      ) : null}

      {status === 'loading' ? (
        <PostLoader />
      ) : status === 'haveData' ? (
        <PostList userData={userData} posts={posts} />
      ) : (
        <div>Net posts</div>
      )}
    </>
  );
};
