import React, { useEffect, useState } from 'react';
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
} from '../../api/api';
import { changeCurrentNotifcation } from '../../UI/slices/notificationSlice';
import { UserDataInnerList, ResponseFromChangeFriends } from '../../types/interfaces';
import { AxiosResponse } from 'axios';

type UserDataType = UserDataInnerList | null;

export const FriendsPage: React.FC = () => {
  const [users, setUsers] = useState<UserDataInnerList[]>([]);
  const [friends, setFriends] = useState<UserDataInnerList[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [subscribed, setSubscribed] = useState<UserDataInnerList[]>([]);
  const [subscriber, setSubscriber] = useState<UserDataInnerList[]>([]);
  const [value, setValue] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<number>(0);
  const profileData = useAppSelector((state) => state.auth.profileData);
  const arr = [friends, subscribed, subscriber, users];
  const [buttonLoading, setButtonLoading] = useState<boolean>(false);
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

  const validUserData = (item: UserDataType): item is UserDataInnerList => {
    return typeof item !== 'string' && item !== null;
  };

  useEffect(() => {
    getAllUsersReq();
  }, []);

  const handleRequest = async (
    name: string,
    func: (log: string, log2: string) => Promise<AxiosResponse<ResponseFromChangeFriends>>,
    type: string,
  ) => {
    try {
      setButtonLoading(true);
      const response = await func(profileData.name, name);

      dispatch(changeCurrentNotifcation({ text: response.data.text }));

      if (response.data.data) {
        switch (type) {
          case 'cancel':
            response.data.data.subscribed &&
              setSubscribed(response.data.data.subscribed.filter(validUserData));
            response.data.data.subscriber &&
              setSubscriber(response.data.data.subscriber.filter(validUserData));
            break;
          case 'add':
            response.data.data.friends &&
              setFriends(response.data.data.friends.filter(validUserData));
            response.data.data.subscriber &&
              setSubscriber(response.data.data.subscriber.filter(validUserData));
            break;
          case 'delete':
            response.data.data.friends &&
              setFriends(response.data.data.friends.filter(validUserData));
            break;
          case 'sub':
            response.data.data.subscribed &&
              setSubscribed(response.data.data.subscribed.filter(validUserData));
            break;
          default:
            break;
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setButtonLoading(false);
    }
  };

  const cancelSubReq = (name: string) => {
    handleRequest(name, cancelSub, 'cancel');
  };
  const deleteFriendReq = (name: string) => {
    handleRequest(name, deletefriend, 'delete');
  };

  const addFriendReq = (name: string) => {
    handleRequest(name, addFriend, 'add');
  };
  const subscribeReq = (name: string) => {
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
          currentList={arr[selectedCategory].filter(validUserData)}
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
