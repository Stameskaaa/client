import styles from './leftsidebar.module.scss';
import { LinkLeftSide } from '../../components/linkleftside/LinkLeftSide';
import { GrUserManager } from 'react-icons/gr';
import { FaRegNewspaper } from 'react-icons/fa';
import { FiMessageCircle } from 'react-icons/fi';
import { FaUserFriends } from 'react-icons/fa';
import { TbFriends } from 'react-icons/tb';
import { useAppSelector } from '../../UI/hooks/hook';
import { useEffect } from 'react';
export const LeftSideBar: React.FC = () => {
  const profileObj = useAppSelector((state) => state.auth.profileData);
  const arr: [string, string, JSX.Element][] = [
    ['Моя страница', `mainpage/${profileObj.name}`, <GrUserManager />],
    ['Новости', 'news', <FaRegNewspaper />],
    ['Мессенджер', `message`, <FiMessageCircle />],
    ['Друзья', 'friends', <TbFriends />],
    ['Сообщества', 'groups', <FaUserFriends />],
  ];
  useEffect(() => {
    console.log();
  }, []);
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
