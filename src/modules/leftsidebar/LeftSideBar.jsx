import styles from './leftsidebar.module.scss';
import { LinkLeftSide } from '../../components/linkleftside/LinkLeftSide';
import { GrUserManager } from 'react-icons/gr';
import { FaRegNewspaper } from 'react-icons/fa';
import { FiMessageCircle } from 'react-icons/fi';

import { FaUserFriends } from 'react-icons/fa';
import { TbFriends } from 'react-icons/tb';
import { useAppSelector } from '../../UI/hooks/hook';
export const LeftSideBar = () => {
  const profileObj = useAppSelector((state) => state.auth.profileData);
  const arr = [
    ['Моя страница', `mainpage/${profileObj.name}`, <GrUserManager></GrUserManager>],
    ['Новости', 'news', <FaRegNewspaper></FaRegNewspaper>],
    ['Мессенджер', `message`, <FiMessageCircle></FiMessageCircle>],
    // ['Звонки', 'calls', <IoCallSharp></IoCallSharp>],
    ['Друзья', 'friends', <TbFriends></TbFriends>],
    ['Сообщества', 'groups', <FaUserFriends></FaUserFriends>],
  ];

  return (
    <span className={styles.container}>
      {arr.map((v) => {
        return (
          <LinkLeftSide key={v[1]} path={v[1]}>
            {v[2]} {v[0]}
          </LinkLeftSide>
        );
      })}
    </span>
  );
};
