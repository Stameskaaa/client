import styles from './rightsidechat.module.scss';
import { ChatMessagesBlock } from '../ChatMessagesBlock';
import { socket } from '../../../UI/socket/socket';
import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../UI/hooks/hook';
import { ChatUserHeader } from './chatuserheader/ChatUserHeader';
import { IoIosSend } from 'react-icons/io';
import {
  editMessage,
  getPersonalMessage,
  getUser,
  sendMessage,
  uploadChat,
} from '../../../api/api';
import { RightSideChatLoader } from '../../../components/loaders/rightSide/RightSideChatLoader';
import { TbMoodSmileBeam } from 'react-icons/tb';
import { Emoji } from './emoji/Emoji';
import { changeCurrentNotifcation } from '../../../UI/slices/notificationSlice';

const arrEmoji = [
  '😀',
  '😁',
  '😂',
  '🤣',
  '😃',
  '😄',
  '😅',
  '😆',
  '😉',
  '😊',
  '😋',
  '😎',
  '😍',
  '😘',
  '😗',
  '😙',
  '😚',
  '🙂',
  '🤗',
  '🤩',
  '🤔',
  '🤨',
  '😐',
  '😑',
  '😶',
  '🙄',
  '😏',
  '😣',
  '😥',
  '😮',
  '🤐',
  '😯',
  '😪',
  '😫',
  '😴',
  '😌',
  '😛',
  '😜',
  '😝',
  '🤑',
];

interface Message {
  time: Date;
  user: string;
  message: string;
  status: string;
}

interface UserData {
  name: string;
  img: string;
}

export const RightSideChat = () => {
  const [value, setValue] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [latestMessage, setLatestMessage] = useState<Message[]>([]);
  const firstUser = useAppSelector((state) => state.auth.profileData.name);
  const { name } = useParams<{ name: string }>();
  const [chatExist, setChatExist] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [visible, setVisible] = useState(false);
  const [editMessState, setEditMessState] = useState(false);
  const [selectedMess, setSelectedMess] = useState<number[]>([]);

  const dispatch = useAppDispatch();

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const currentTime = new Date();

  const upLoadMess = async () => {
    setLoading(true);
    getPersonalMessage(firstUser, name).then((response) => {
      if (response.data === 'nothing') {
        setChatExist(false);
      } else {
        setChatExist(true);
        if (Array.isArray(response.data[0]?.chat)) setLatestMessage(response.data[0].chat);
      }
      setLoading(false);
    });
  };

  const changeVisibility = (flag: boolean) => {
    if (flag) {
      timerRef.current && clearTimeout(timerRef.current);
      setVisible(flag);
    } else {
      timerRef.current = setTimeout(() => setVisible(flag), 700);
    }
  };

  useEffect(() => {
    socket.on('clientJoined', () => {}); // check
    return () => {
      socket.off('clientJoined');
    };
  }, []);

  useEffect(() => {
    socket.on('disconnectUser', () => {}); // check
    return () => {
      socket.off('disconnectUser');
    };
  }, []);

  useEffect(() => {
    socket.on('messageReceived', (data: Message) => {
      setMessages((prev) => [...prev, data]);
    });
    return () => {
      socket.off('messageReceived');
    };
  }, []);

  useEffect(() => {
    getUserReq();
    joinRoom();
    upLoadMess();
    return () => {
      setEditMessState(false);
      setSelectedMess([]);
    };
  }, [name]);

  const getUserReq = async () => {
    const data = await getUser(name);
    setUserData(data);
  };

  const joinRoom = async () => {
    if (name && firstUser) {
      socket.emit('join', { roomId: `${firstUser} ${name}`, currentUser: firstUser });
    }
  };

  const createChat = async () => {
    try {
      const data = await uploadChat(firstUser, name);
      if (data.data === 'Чат успешно создан') {
        setChatExist(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const addEmoji = (value: string) => {
    setValue((prev) => prev + value);
  };

  const sendMess = async () => {
    if (value) {
      if (!chatExist) {
        await createChat();
      }
      if (editMessState && selectedMess.length === 1) {
        const response = await editMessage(firstUser, name, {
          indexToEdit: selectedMess[0],
          message: value,
        });
        dispatch(changeCurrentNotifcation({ text: response.data.text }));
        if (response.data.data) {
          setLatestMessage(response.data.data);
        }
        setEditMessState(false);
      } else {
        socket.emit('message', {
          data: { user: firstUser, message: value, time: currentTime, status: 'read' },
        });
        setMessages((prev) => [
          ...prev,
          { user: firstUser, message: value, time: currentTime, status: 'read' },
        ]);
        sendMessage(firstUser, name, value, currentTime).catch((e) => console.log(e));
      }
      setValue('');
    }
  };

  return loading ? (
    <RightSideChatLoader />
  ) : (
    <div className={styles.container}>
      <ChatUserHeader userData={userData}></ChatUserHeader>
      <ChatMessagesBlock
        setLatestMessage={setLatestMessage}
        userData={userData}
        latestMessage={latestMessage}
        messages={messages}
        setMessages={setMessages}
        setValue={setValue}
        setEditMessState={setEditMessState}
        editMessState={editMessState}
        selectedMess={selectedMess}
        setSelectedMess={setSelectedMess}
      />
      <div className={styles.sendmess_container}>
        <div
          className={`${styles.smile_container} ${visible ? styles.visible : null}`}
          onMouseMove={() => changeVisibility(true)}
          onMouseLeave={() => changeVisibility(false)}>
          {arrEmoji.map((v, i) => (
            <Emoji onClick={() => addEmoji(v)} emoji={v} key={i} />
          ))}
        </div>
        <div
          onMouseMove={() => changeVisibility(true)}
          onMouseLeave={() => changeVisibility(false)}
          style={{
            borderRadius: '5px 0 0 5px',
            fontSize: '1.8em',
            borderRight: '1px solid var(--color-tertiary)',
          }}
          className={styles.button}>
          <TbMoodSmileBeam />
        </div>
        <textarea
          placeholder="Enter text here..."
          onChange={(e) => setValue(e.target.value)}
          value={value}
          className={styles.input}
        />
        <div className={styles.button} onClick={sendMess}>
          <IoIosSend />
        </div>
      </div>
    </div>
  );
};
