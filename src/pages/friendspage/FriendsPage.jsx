import { useEffect, useState } from 'react';
import styles from './friendspage.module.scss';
import { useAppSelector } from '../../UI/hooks/hook';
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

  const cancelSubReq = async (name) => {
    try {
      const response = await cancelSub(profileData.name, name);
      if (response.data.data) {
        setSubscribed(response.data.data.subscribed.filter((v) => v));
        setSubscriber(response.data.data.subscriber.filter((v) => v));
      }
    } catch (error) {
      console.log(error);
    }
  };
  const deleteFriendReq = async (name) => {
    try {
      const response = await deletefriend(profileData.name, name);
      console.log(response.data.text);
      if (response.data.data) {
        setFriends(response.data.data.friends.filter((v) => v));
      }
    } catch (error) {
      console.log(error);
    }
  };
  const addFriendReq = async (name) => {
    try {
      const response = await addFriend(profileData.name, name);
      console.log(response.data.text);
      if (response.data.data) {
        setFriends(response.data.data.friends.filter((v) => v));
        setSubscriber(response.data.data.subscriber.filter((v) => v));
      }
    } catch (error) {
      console.log(error);
    }
  };
  const subscribeReq = async (name) => {
    try {
      const response = await subscribe(profileData.name, name);
      console.log(response.data.text);
      if (response.data.data) {
        console.log(response.data);
        setSubscribed(response.data.data.subscribed.filter((v) => v));
      }
    } catch (error) {
      console.log(error);
    }
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
        />
      </div>
      <RightFriendBlock
        setSelectedCategory={setSelectedCategory}
        selectedCategory={selectedCategory}
      />
    </div>
  );
};
