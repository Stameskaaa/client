import { useEffect, useState } from 'react';
import styles from './friendrequest.module.scss';
import { addFriend, cancelSub, getUserList } from '../../../UI/api/api';
import { ProfileImage } from '../../../components/profileimage/ProfileImage';
import { useNavigate } from 'react-router-dom';
import { FriendsReqLoader } from '../../../components/loaders/friendsreq/FriendsReq';

export const FriendRequest = ({ profileObj }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [indexState, setIndexState] = useState(0);
  const [requestList, setRequestList] = useState([]);

  const cancelSubRequest = async (name) => {
    setLoading(true);
    try {
      const notification = await cancelSub(profileObj.name, name);
      console.log(notification.data.text);
      const response = await getUserList(profileObj.name, 'subscriber');

      setRequestList(response);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const addFriendRequest = async (name) => {
    setLoading(true);
    try {
      const notification = await addFriend(profileObj.name, name);
      console.log(notification.data.text);
      const response = await getUserList(profileObj.name, 'subscriber');
      setRequestList(response);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let intervalId;
    const downloadSubscribers = async () => {
      try {
        setLoading(true);
        const response = await getUserList(profileObj.name, 'subscriber');
        setRequestList(response);

        intervalId = setInterval(() => {
          setIndexState((prev) => (prev + 1) % response.length || 1);
        }, 15000);
      } catch (error) {
        console.error('Ошибка при загрузке подписчиков', error);
      } finally {
        setLoading(false);
      }
    };
    downloadSubscribers();
    return () => clearInterval(intervalId);
  }, [profileObj]);

  useEffect(() => {
    if (indexState >= requestList.length && requestList.length > 0) {
      setIndexState(0);
    }
  }, [requestList]);

  return requestList.length > 0 ? (
    loading ? (
      <FriendsReqLoader />
    ) : (
      <div className={styles.container}>
        Friend Request
        <ProfileImage
          onClick={() => navigate(`/mainpage/${requestList[indexState].name}`)}
          className={styles.img}
          src={requestList[indexState].img}
        />
        {requestList[indexState].name}{' '}
        {requestList[indexState].lastName !== 'unknown' ? requestList[indexState].lastName : null}
        <div className={styles.container_button}>
          <button onClick={() => addFriendRequest(requestList[indexState].name)}>&#10003;</button>
          <button
            onClick={() => cancelSubRequest(requestList[indexState].name)}
            style={{ fontSize: '1.5em' }}>
            &#215;
          </button>
        </div>
      </div>
    )
  ) : null;
};
