import styles from './user.module.scss';
import { CiSquarePlus } from 'react-icons/ci';
import { CiSquareMinus } from 'react-icons/ci';
import { IoIosCheckmarkCircleOutline } from 'react-icons/io';
import { HiMiniXMark } from 'react-icons/hi2';
import { useNavigate } from 'react-router-dom';

export const User = ({
  personInfo,
  changedFriendList,
  state,
  cancelSubscribe,
  deleteSubscriber,
  addSubscriber,
  users,
}) => {
  const navigate = useNavigate();

  return (
    <div className={styles.container_user}>
      <div className={styles.container_user__img}>
        <img
          className={styles.user__image}
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdqPDruWzKi4agbBsfj80B6vm2C8iWHSGsjbGoSFxg8w&s"
        />
      </div>

      {
        <div
          onClick={() => navigate(`/mainpage/${personInfo.name}`)}
          className={styles.container_text}>
          {personInfo.name} {personInfo.lastName}
        </div>
      }

      {state === 'add' ? (
        <CiSquarePlus
          onClick={() => changedFriendList(personInfo.name)}
          className={styles.container__button}
        />
      ) : state === 'friend' ? (
        <CiSquareMinus
          onClick={() => changedFriendList(personInfo.name)}
          className={styles.container__button}
        />
      ) : state === 'subscribe' ? (
        <>
          {' '}
          <div className={styles.notification}>Вы подписаны </div>
          <HiMiniXMark
            onClick={() => cancelSubscribe(personInfo.name)}
            className={styles.container__button}
          />
        </>
      ) : (
        <>
          {' '}
          <div className={styles.notification}>он подписался натебя</div>
          <CiSquareMinus
            onClick={() => deleteSubscriber(personInfo.name)}
            style={{ marginRight: '10px' }}
            className={styles.container__button}
          />
          <IoIosCheckmarkCircleOutline
            onClick={() => addSubscriber(personInfo)}
            style={{ marginLeft: '0px', marginRight: '20px' }}
            className={styles.container__button}
          />
        </>
      )}
    </div>
  );
};
