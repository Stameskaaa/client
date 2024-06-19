import styles from './rightsidechat.module.scss';
import { ChatMessagesBlock } from '../ChatMessagesBlock';
import { socket } from '../../../UI/socket/socket';
import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAppSelector } from '../../../UI/hooks/hook';
import { ChatUserHeader } from './chatuserheader/ChatUserHeader';
import { IoIosSend } from 'react-icons/io';
import { getPersonalMessage, getUser, sendMessage, uploadChat } from '../../../UI/api/api';
import { RightSideChatLoader } from '../../../components/loaders/rightSide/RightSideChatLoader';
import { TbMoodSmileBeam } from 'react-icons/tb';
import { Emoji } from './emoji/Emoji';

const arr = [
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

export const RightSideChat = () => {
  const [value, setValue] = useState('');
  const [messages, setMessages] = useState([]);
  const [latestMessage, setLatestMessage] = useState([]);
  const firstUser = useAppSelector((state) => state.auth.profileData.name);
  let { name } = useParams();
  const [chatExist, setChatExist] = useState('');
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState('');
  const [visible, setVisible] = useState(false);
  const timerRef = useRef('');
  const currentTime = new Date();

  const upLoadMess = async () => {
    setLoading(true);
    getPersonalMessage(firstUser, name).then((response) => {
      if (response.data === 'nothing') {
        setChatExist(false);
      } else {
        setChatExist(true);
        if (Array.isArray(response.data[0].chat)) setLatestMessage(response.data[0].chat);
      }
      setLoading(false);
    });
  };

  const changeVisibility = (flag) => {
    if (flag) {
      timerRef.current && clearTimeout(timerRef.current);
      setVisible(flag);
    } else {
      timerRef.current = setTimeout(() => setVisible(flag), 700);
    }
  };

  useEffect(() => {
    socket.on('clientJoined', (message) => {}); // check
    return () => {
      socket.off('clientJoined');
    };
  }, []);

  useEffect(() => {
    socket.on('disconnectUser', (data) => {}); // check
    return () => {
      socket.off('disconnectUser');
    };
  }, []);

  useEffect(() => {
    socket.on('messageReceived', (data) => {
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

  const sendMess = async () => {
    if (value) {
      if (chatExist !== '' && !chatExist) {
        const data = await createChat();
      }
      socket.emit('message', {
        data: { user: firstUser, message: value, time: currentTime, status: 'read' },
      });
      setMessages((prev) => [
        ...prev,
        { user: firstUser, message: value, time: currentTime, status: 'read' },
      ]);

      sendMessage(firstUser, name, value, currentTime).catch((e) => console.log(e));
      setValue('');
    }
  };

  return loading ? (
    <RightSideChatLoader />
  ) : (
    <div className={styles.container}>
      <ChatUserHeader userData={userData}></ChatUserHeader>
      <ChatMessagesBlock userData={userData} latestMessage={latestMessage} messages={messages} />
      <div className={styles.sendmess_container}>
        <div
          className={`${styles.smile_container} ${visible ? styles.visible : null}`}
          onMouseMove={() => changeVisibility(true)}
          onMouseLeave={() => changeVisibility(false)}>
          {arr.map((v, i) => (
            <Emoji onClick={() => setValue((prev) => prev + v)} emoji={v} key={i} />
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
          className={styles.button}
          onClick={sendMess}>
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
