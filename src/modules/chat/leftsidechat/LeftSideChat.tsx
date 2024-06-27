import { useEffect, useState } from 'react';
import styles from './leftsidechat.module.scss';
import { useAppSelector } from '../../../UI/hooks/hook';
import { useParams } from 'react-router-dom';
import { getUser, getUserChats } from '../../../api/api';
import { LeftSideChatLoading } from '../../../components/loaders/leftSide/leftSideChatLoader';
import { LeftSideUser } from './leftsideuser/LeftSideUser';
import { UserData, Messages } from '../../../types/interfaces';

export const LeftSideChat: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [chatList, setChatList] = useState<UserData[]>([]);
  const [value, setValue] = useState<string>('');
  const [currentUser, setCurrentUser] = useState<string | ''>('');
  const name = useAppSelector((state) => state.auth.profileData.name);
  const params = useParams();
  useEffect(() => {
    if (name) getChatsList();
  }, [name]);

  useEffect(() => {
    if (params.name) setCurrentUser(params.name);
  }, [params]);

  const getChatsList = async () => {
    try {
      const response = await getUserChats(name);
      if (typeof response.data === 'string') {
        return null;
      }

      const chats: Messages[] = response.data;

      const updatedChats: UserData[] = await Promise.all(
        chats.map(async (chat) => {
          const userToCheck = chat.firstUser !== name ? chat.firstUser : chat.secondUser;
          const userResponse = await getUser(userToCheck);

          return { ...(userResponse as UserData) };
        }),
      );
      setChatList(updatedChats);
    } catch (error) {
      console.error('Error fetching chat list:', error);
    } finally {
      setLoading(false);
    }
  };

  return loading ? (
    <LeftSideChatLoading />
  ) : (
    <div className={styles.container}>
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Search..."
        className={styles.input}
      />
      <div className={styles.user_container}>
        {chatList.length > 0 &&
          chatList
            .filter((v) => {
              return `${v.name} ${v.lastName ? v.lastName : null}`
                .toLowerCase()
                .includes(value.toLowerCase());
            })
            .map((v, i) => {
              return <LeftSideUser currentUser={currentUser} key={i} userData={v} />;
            })}
      </div>
    </div>
  );
};
