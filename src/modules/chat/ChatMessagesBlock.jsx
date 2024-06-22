import { memo, useEffect, useState } from 'react';
import styles from './chat.module.scss';
import { useAppDispatch, useAppSelector } from '../../UI/hooks/hook';
import { ProfileImage } from '../../components/profileimage/ProfileImage';
import { HiMiniXMark } from 'react-icons/hi2';
import { FaRegTrashAlt } from 'react-icons/fa';
import { DefaultButton } from '../../components/button/DefaultButton';
import { MdEdit } from 'react-icons/md';
import { deleteMessages } from '../../UI/api/api';
import { CircularProgress } from '@mui/material';
import { changeCurrentNotifcation } from '../../UI/slices/notificationSlice';
const monthNames = [
  'января',
  'февраля',
  'марта',
  'апреля',
  'мая',
  'июня',
  'июля',
  'августа',
  'сентября',
  'октября',
  'ноября',
  'декабря',
];
export const ChatMessagesBlock = memo(
  ({
    userData,
    latestMessage,
    messages,
    setMessages,
    setLatestMessage,
    setEditMessState,
    editMessState,
    setValue,
    setSelectedMess,
    selectedMess,
  }) => {
    const [flag, setFlag] = useState(false);
    const firstUserData = useAppSelector((state) => state.auth.profileData);
    const [resultMessages, setResultMessages] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [deleteLoading, setDeleteLoading] = useState(false);
    const dispatch = useAppDispatch();

    useEffect(() => {
      if (latestMessage.length === 0 && messages.length === 0) {
        setFlag(true);
        setResultMessages([]);
      } else {
        setFlag(false);
        if (!deleteLoading) {
          setResultMessages([...latestMessage, ...messages]);
        }
      }
      setValue('');
    }, [messages, latestMessage]);

    const selectMessage = (index) => {
      if (selectedMess.includes(index)) {
        setSelectedMess((prev) => prev.filter((v) => v !== index));
      } else {
        setSelectedMess((prev) => [...prev, index]);
      }
    };

    useEffect(() => {
      if (selectedMess.length !== 1) {
        setEditMessState(false);
        setValue('');
      }
    }, [selectedMess]);

    const formatDate = (date) => {
      const now = new Date();
      const diff = now - date;

      const ONE_DAY = 24 * 60 * 60 * 1000;

      if (diff < ONE_DAY) {
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        return `${hours}:${minutes}`;
      } else {
        const day = date.getDate();

        const month = monthNames[date.getMonth()];
        return `${day} ${month}`;
      }
    };

    const deleteMessage = async () => {
      try {
        setDeleteLoading(true);
        const response = await deleteMessages(userData.name, firstUserData.name, selectedMess);
        dispatch(changeCurrentNotifcation({ text: response.data?.text }));
        if (response.data?.data) {
          setLatestMessage(response.data?.data);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setMessages([]);
        setDeleteLoading(false);
        setShowModal(false);
        setSelectedMess([]);
      }
    };

    const editMessage = () => {
      if (!editMessState) {
        setValue(resultMessages[selectedMess[0]].message);
      } else {
        setValue('');
      }
      setEditMessState((prev) => !prev);
    };

    return (
      <div className={styles.wrapper}>
        {showModal ? (
          <div onClick={() => setShowModal(false)} className={styles.modal}>
            <div onClick={(e) => e.stopPropagation()}>
              Вы уверенны что хотите удалить {selectedMess.length} сообщений
              {deleteLoading ? (
                <CircularProgress />
              ) : (
                <DefaultButton text="OK" onClick={deleteMessage} />
              )}
            </div>
          </div>
        ) : null}
        <div
          className={`${styles.container__messageblock_left} ${
            selectedMess.length > 0 ? styles.delete_message : null
          }`}>
          {resultMessages.length > 0
            ? resultMessages.map((v, i) => {
                const dateObject = new Date(v.time);

                return (
                  <div
                    key={i}
                    onClick={() => selectMessage(i)}
                    className={`${styles.container__messagefield} ${
                      selectedMess.includes(i) ? styles.active : null
                    }`}>
                    <div className={styles.messagefield__author}>
                      <ProfileImage
                        src={firstUserData.name === v.user ? firstUserData.img : userData.img}
                        className={styles.author_img}
                      />

                      <p>{v.user}</p>
                      <p style={{ marginLeft: 'auto' }}>{formatDate(dateObject)}</p>
                    </div>
                    <div className={styles.messagefield__content} key={i}>
                      {v.message}
                    </div>
                  </div>
                );
              })
            : null}
          {flag ? <div>Начните общение</div> : null}
        </div>
        {selectedMess.length > 0 ? (
          <div className={styles.messageblock_right_buttons}>
            {' '}
            <HiMiniXMark
              onClick={() => {
                setSelectedMess([]);
                setEditMessState(false);
              }}
              style={{ width: '40px', height: '40px' }}
              className={styles.messageblock_right_button}
            />
            <FaRegTrashAlt
              onClick={() => setShowModal(true)}
              className={styles.messageblock_right_button}
            />
            {selectedMess.length === 1 ? (
              <MdEdit
                onClick={editMessage}
                className={`${styles.messageblock_right_button} ${
                  editMessState ? styles.active_edit : null
                }`}
              />
            ) : null}
          </div>
        ) : null}
      </div>
    );
  },
);
