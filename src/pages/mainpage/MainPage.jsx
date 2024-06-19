import { useEffect, useState } from 'react';
import styles from './mainpage.module.scss';
import { useAppSelector } from '../../UI/hooks/hook';
import { Outlet, useLocation, useNavigate, useParams } from 'react-router-dom';
import { FaEdit } from 'react-icons/fa';
import { LiaUserFriendsSolid } from 'react-icons/lia';
import { MdPhotoSizeSelectActual } from 'react-icons/md';
import { MdEmojiPeople } from 'react-icons/md';
import { FaPen } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';
import { UnSub } from './UnSub';
import { ProfileImage } from '../../components/profileimage/ProfileImage';
import { cancelSub, checkdependence, deletefriend, getUser } from '../../UI/api/api';
import { CircularProgress } from '@mui/material';
import { FullScreen } from '../../components/fullscreen/FullScreen';
export const MainPage = () => {
  const profileObj = useAppSelector((state) => state.auth.profileData);
  const [activeIndex, setActiveIndex] = useState(0);
  const [visible, setVisible] = useState(false);
  let { name } = useParams();
  const [info, setInfo] = useState('');
  const [status, setStatus] = useState('');
  const location = useLocation();

  let privateProfile;
  const navigate = useNavigate();
  name === profileObj.name ? (privateProfile = true) : (privateProfile = false);
  let headerItems = [
    ['Posts', <FaPen />, false, `/mainpage/${name}/posts`],
    ['About', <MdEmojiPeople />, false, `/mainpage/${name}/about`],
    ['Photos', <MdPhotoSizeSelectActual />, false, `/mainpage/${name}/photos`],
    ['Friends', <LiaUserFriendsSolid />, false, `/mainpage/${name}/friendlist`],
  ];

  useEffect(() => {
    getUser(name).then((resolve) => {
      if (resolve) {
        setInfo(resolve);
      }
    });
  }, [name]);

  useEffect(() => {
    if (location.state) {
      setActiveIndex(0);
    }
  }, [location.state]);

  const cancelSubReq = async (name) => {
    try {
      const response = await cancelSub(profileObj.name, name);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
    fetchData();
  };

  const deleteFriend = async (name) => {
    try {
      const response = await deletefriend(profileObj.name, name);
      console.log(response.data.text);
    } catch (error) {
      console.log(error);
    }
    fetchData();
  };
  const subscribe = async (name) => {
    try {
      await subscribe(profileObj.name, name);
    } catch (error) {
      console.log(error);
    }
    fetchData();
  };

  const fetchData = async () => {
    if (!privateProfile) {
      setStatus('loading');
      try {
        const response = await checkdependence(profileObj.name, name);
        setStatus(response.data);
      } catch (error) {
        console.error(error);
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, [privateProfile]);

  return (
    <div className={styles.main_container}>
      <div className={styles.banner}>
        <div className={styles.button_container}>
          {privateProfile ? (
            <button onClick={() => navigate(`/editprofile/${profileObj.name}`)}>
              <FaEdit /> Edit Profile
            </button>
          ) : (
            <>
              {status === 'loading' ? (
                <CircularProgress />
              ) : status === 'friends' ? (
                <UnSub onClick={() => deleteFriend(name)} text={'Delete'} />
              ) : status === 'subscriber' ? (
                <>
                  <UnSub onClick={() => subscribe(name)} text={'Add'} />
                  <UnSub onClick={() => cancelSubReq(name)} text={'Delete'} />
                </>
              ) : status === 'subscribed' ? (
                <>
                  <UnSub onClick={() => cancelSub(name)} text={'Cancel'} />
                </>
              ) : status === 'nothing' ? (
                <>
                  <UnSub onClick={() => subscribe(name)} text={'Add'} />
                </>
              ) : (
                <div>Unknown status</div>
              )}
              <button onClick={() => navigate(`/chat/${name}`)}>&#9993; Message</button>
            </>
          )}
        </div>
      </div>
      <div className={styles.container}>
        <div className={styles.leftside_container}>
          {visible && (
            <FullScreen
              onClick={() => setVisible(false)}
              arrPhoto={[privateProfile ? profileObj.img : info.img]}
              currentIndex={0}
            />
          )}
          <ProfileImage
            onClick={() => setVisible(true)}
            className={styles.profileImage_leftside}
            src={privateProfile ? profileObj.img : info.img}
          />
          <div className={styles.leftside_buttons_container}>
            <span className={styles.bottom}></span>
            {info !== '' ? (
              <>
                <p>
                  {info.name} {info.lastName !== 'unknown' ? info.lastName : null}
                </p>
                <div>
                  Followers:{' '}
                  <p>
                    {info.subscriber.length - 1 !== 0 ? `${info.subscriber.length - 1} ч.` : 'none'}
                  </p>
                </div>
                <div>
                  Following:{' '}
                  <p>
                    {info.subscribed.length - 1 !== 0 ? `${info.subscribed.length - 1} ч.` : 'none'}
                  </p>
                </div>
                <div>
                  Friends:{' '}
                  <p>{info.friends.length - 1 !== 0 ? `${info.friends.length - 1} ч.` : 'none'}</p>
                </div>
                <div>
                  Posts:{' '}
                  <p>
                    {info?.posts ? (info.posts !== 0 ? `${info.posts.length} п.` : 'none') : 'none'}
                  </p>
                </div>{' '}
              </>
            ) : (
              <div>Loading . . .</div>
            )}
          </div>
        </div>
        <div className={styles.rightside}>
          <div className={styles.rightside_header}>
            {headerItems.map((v, i) => {
              return (
                <NavLink key={i} to={v[3]} className={styles.navlink_rightside_header}>
                  <div
                    onClick={() => setActiveIndex(i)}
                    className={`${styles.rightside_header__items} ${
                      activeIndex === i ? styles.active : ''
                    }`}>
                    {v[1]}
                    {v[0]}
                  </div>
                </NavLink>
              );
            })}
          </div>
          <div className={styles.rightside_main}>
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};
