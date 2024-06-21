import { useEffect, useState } from 'react';
import styles from './mainpage.module.scss';
import { useAppDispatch, useAppSelector } from '../../UI/hooks/hook';
import { Outlet, useLocation, useNavigate, useParams } from 'react-router-dom';
import { FaEdit } from 'react-icons/fa';
import { LiaUserFriendsSolid } from 'react-icons/lia';
import { MdPhotoSizeSelectActual } from 'react-icons/md';
import { MdEmojiPeople } from 'react-icons/md';
import { FaPen } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';
import { UnSub } from './UnSub';
import { ProfileImage } from '../../components/profileimage/ProfileImage';
import { cancelSub, checkdependence, deletefriend, getUser, subscribe } from '../../UI/api/api';
import { FullScreen } from '../../components/fullscreen/FullScreen';
import { ImExit } from 'react-icons/im';
import { resetStore } from '../../UI/slices/authSlice';
import { changeCurrentNotifcation } from '../../UI/slices/notificationSlice';
import { CircularProgress } from '@mui/material';

export const MainPage = () => {
  const profileObj = useAppSelector((state) => state.auth.profileData);
  const [activeIndex, setActiveIndex] = useState(0);
  const [visible, setVisible] = useState(false);
  let { name } = useParams();
  const [info, setInfo] = useState('');
  const [status, setStatus] = useState('');
  const location = useLocation();
  const dispatch = useAppDispatch();
  let privateProfile;
  const navigate = useNavigate();
  const [buttonLoading, setButtonLoading] = useState(false);
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

  const handleRequest = async (name, func) => {
    try {
      setButtonLoading(true);
      const response = await func(profileObj.name, name);
      dispatch(changeCurrentNotifcation({ text: response.data.text }));
    } catch (error) {
      console.log(error);
    } finally {
      fetchData();
      setButtonLoading(false);
    }
  };

  const cancelSubReq = (name) => {
    handleRequest(name, cancelSub);
  };

  const deleteFriendReq = () => {
    handleRequest(name, deletefriend);
  };

  const subscribeReq = (name) => {
    handleRequest(name, subscribe);
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

  const leaveAccount = () => {
    localStorage.removeItem('profileData');
    dispatch(resetStore());
  };

  const objectStatus = {
    friends: ['Delete', deleteFriendReq],
    subscriber: ['Add', subscribeReq, 'Delete', cancelSubReq],
    subscribed: ['Cancel', cancelSubReq],
    nothing: ['Add', subscribeReq],
  };

  const arrayInfo = [
    ['Followers', 'subscriber'],
    ['Following', 'subscribed'],
    ['Friends', 'friends'],
  ];

  return (
    <div className={styles.main_container}>
      <div className={styles.banner}>
        <div className={styles.button_container}>
          {privateProfile ? (
            <>
              <button onClick={leaveAccount}>
                <ImExit />
                Leave
              </button>
              <button onClick={() => navigate(`/editprofile/${profileObj.name}`)}>
                <FaEdit /> Edit Profile
              </button>
            </>
          ) : (
            <>
              {status === 'loading' ? (
                <CircularProgress size={25} />
              ) : objectStatus[status] ? (
                <>
                  <UnSub
                    buttonLoading={buttonLoading}
                    onClick={() => objectStatus[status][1](name)}
                    text={objectStatus[status][0]}
                  />
                  {objectStatus[status].length > 2 ? (
                    <UnSub
                      buttonLoading={buttonLoading}
                      onClick={() => objectStatus[status][3](name)}
                      text={objectStatus[status][2]}
                    />
                  ) : null}
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
                {arrayInfo.map((value, i) => {
                  return (
                    <div key={i}>
                      {value[0]}:{' '}
                      <p>
                        {info[value[1]].length - 1 !== 0
                          ? `${info[value[1]].length - 1} ч.`
                          : 'none'}
                      </p>
                    </div>
                  );
                })}
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
