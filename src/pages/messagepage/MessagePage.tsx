import { useEffect, useState } from 'react';
import styles from './messagepage.module.scss';
import { MessageBlock } from '../../modules/messageblock/MessageBlock';
import { OutOfMessage } from './outofmessage/OutOfMessage';
import { useAppSelector } from '../../UI/hooks/hook';
import { uploadMessage } from '../../api/api';
import { MessageBlockLoader } from '../../components/loaders/messageBlockLoader/MessageBlockLoader';
import { Messages } from '../../types/interfaces';

export const MessagePage: React.FC = () => {
  const [data, setData] = useState<string[][]>([]);
  const profileData = useAppSelector((state) => state.auth.profileData);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setLoading(true);
    uploadMessage(profileData.name)
      .then((response) => {
        if (Array.isArray(response.data)) {
          const newData = response.data.map((v: Messages) => {
            if (v.chat.length === 0) {
              return v.firstUser === profileData.name
                ? [v.secondUser, 'Сообщений еще нет']
                : [v.firstUser, 'Сообщений еще нет'];
            } else {
              const lastMessage = v.chat[v.chat.length - 1];
              const message = lastMessage.message;
              const time = lastMessage.time || '';

              return v.firstUser === profileData.name
                ? [v.secondUser, message, time]
                : [v.firstUser, message, time];
            }
          });

          setData(newData);
        }
      })
      .catch((e) => console.log(e))
      .finally(() => setLoading(false));
  }, [profileData.name]);

  return (
    <div className={styles.container}>
      {loading ? (
        <>
          {Array.from({ length: 2 }).map((_, i) => (
            <MessageBlockLoader key={i} />
          ))}
        </>
      ) : data.length > 0 ? (
        data.map((v, i) => <MessageBlock key={i} text={v[1]} nameSecond={v[0]} time={v[2]} />)
      ) : (
        <OutOfMessage />
      )}
    </div>
  );
};
