import { useEffect, useState } from 'react';
import styles from './friendspage.module.scss';
import { useAppDispatch, useAppSelector } from '../../UI/hooks/hook';
import { RightFriendBlock } from './rightfriendblock/RightFriendBlock';
import { UsersList } from './UsersList';
import {
  addFriend,
  cancelSub,
  deletefriend,
  getAllUsers,
  getUserList,
  subscribe,
} from '../../UI/api/api';
import { changeCurrentNotifcation } from '../../UI/slices/notificationSlice';

export const FriendsPage = () => {
  const [users, setUsers] = useState([]);
  const [friends, setFriends] = useState([]);
  const [loading, setLoading] = useState(true);
  const [subscribed, setSubscribed] = useState([]);
  const [subscriber, setSubscriber] = useState([]);
  const [value, setValue] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(0);
  const profileData = useAppSelector((state) => state.auth.profileData);
  const arr = [friends, subscribed, subscriber, users];
  const [buttonLoading, setButtonLoading] = useState(false);
  const dispatch = useAppDispatch();

  const getAllUsersReq = async () => {
    try {
      const allUsers = await getAllUsers(profileData.name);
      await Promise.all(
        ['Friends', 'Subscribed', 'Subscriber'].map(async (type) => {
          const filteredData = await getUserList(profileData.name, type);
          eval(`set${type}`)(filteredData);
          return { [type]: filteredData };
        }),
      );
      setUsers(allUsers.data.filter((user) => user !== null && user.name !== profileData.name));
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllUsersReq();
  }, []);

  const handleRequest = async (name, func, type) => {
    try {
      setButtonLoading(true);
      const response = await func(profileData.name, name);
      dispatch(changeCurrentNotifcation({ text: response.data.text }));

      if (response.data.data) {
        switch (type) {
          case 'cancel':
            setSubscribed(response.data.data.subscribed.filter((v) => v));
            setSubscriber(response.data.data.subscriber.filter((v) => v));
            break;
          case 'add':
            setFriends(response.data.data.friends.filter((v) => v));
            setSubscriber(response.data.data.subscriber.filter((v) => v));
            break;
          case 'delete':
            setFriends(response.data.data.friends.filter((v) => v));

            break;
          case 'sub':
            setSubscribed(response.data.data.subscribed.filter((v) => v));
            break;
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setButtonLoading(false);
    }
  };

  const cancelSubReq = (name) => {
    handleRequest(name, cancelSub, 'cancel');
  };
  const deleteFriendReq = (name) => {
    handleRequest(name, deletefriend, 'delete');
  };

  const addFriendReq = (name) => {
    handleRequest(name, addFriend, 'add');
  };
  const subscribeReq = (name) => {
    handleRequest(name, subscribe, 'sub');
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <h3 className={styles.header}>Поиск...</h3>
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Введите имя..."
          className={styles.input}
        />

        <UsersList
          value={value}
          cancelSub={cancelSubReq}
          subscribe={subscribeReq}
          deleteFriend={deleteFriendReq}
          addFriend={addFriendReq}
          loading={loading}
          currentList={arr[selectedCategory]}
          selectedCategory={selectedCategory}
          buttonLoading={buttonLoading}
        />
      </div>

      <RightFriendBlock
        setSelectedCategory={setSelectedCategory}
        selectedCategory={selectedCategory}
      />
    </div>
  );
};
