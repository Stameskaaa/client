import styles from './header.module.scss';
import { Input } from '../../components/input/Input';
import { useAppSelector } from '../../UI/hooks/hook';
import { NavLink, useNavigate } from 'react-router-dom';
import { AiFillHome } from 'react-icons/ai';
import { BiSolidMessage } from 'react-icons/bi';
import { IoPeopleSharp } from 'react-icons/io5';
import { IoIosNotifications } from 'react-icons/io';
import { MdAppRegistration } from 'react-icons/md';
import { ProfileImage } from '../../components/profileimage/ProfileImage';
import { Switch } from '../../components/switchbutton/SwitchButton2';
import { useState } from 'react';
import { useTheme } from '../../UI/hooks/use-theme';

export const Header = () => {
  const navigate = useNavigate();
  const [isChecked, setIsChecked] = useState(false);
  const { authState, profileData, currentPage } = useAppSelector((state) => state.auth);
  const [value, setValue] = useState('');
  const { setTheme } = useTheme();
  const getActiveClass = (page) => {
    return page === currentPage ? styles.active_link : '';
  };

  const handleToggle = () => {
    setIsChecked((prevState) => !prevState);
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };
  return (
    <div className={styles.header}>
      <div
        className={`${styles.header__icon_container__home} ${getActiveClass('/')}`}
        onClick={() => navigate('/')}>
        <AiFillHome className={`${styles.header__icon} ${getActiveClass('/')}`} />
        Home
      </div>

      {authState ? (
        <>
          <div
            className={`${styles.header__icon_container} ${getActiveClass('friends')}`}
            onClick={() => {
              navigate('/friends');
            }}>
            <IoPeopleSharp className={`${styles.header__icon} ${getActiveClass('friends')}`} />
          </div>
          <div
            className={`${styles.header__icon_container} ${getActiveClass('message')}`}
            onClick={() => navigate('/message')}>
            <BiSolidMessage className={`${styles.header__icon} ${getActiveClass('message')}`} />
          </div>
          <div className={styles.header__icon_container_notification}>
            <IoIosNotifications className={styles.header__icon_notification} />
            <div className={styles.header__icon_notification_list}>
              <ul>
                <li className={styles.notification_list_li}>Вас добавили в друзья</li>
                <li className={styles.notification_list_li}>У вас новое сообщение</li>
                <li className={styles.notification_list_li}>Уведомление 3</li>
                <li className={styles.notification_list_li}>Уведомление 44</li>
              </ul>
            </div>
          </div>

          <Input onChange={setValue} value={value} styleObj={styles} />
          <Switch onChange={handleToggle} isChecked={isChecked} className={styles.switch} />
          <div
            onClick={() => navigate(`/mainpage/${profileData.name}/posts`, { state: 'posts' })}
            className={`${styles.header__righside_container} ${getActiveClass('mainpage')}`}>
            <ProfileImage className={styles.profileImage} src={profileData.img} />
            <div className={styles.profileLink}>{profileData.name}</div>
          </div>
        </>
      ) : (
        <NavLink className={styles.active} to="/registration">
          <div className={styles.link}>
            <MdAppRegistration className={styles.registration_icon} /> Registration
          </div>
        </NavLink>
      )}
    </div>
  );
};
