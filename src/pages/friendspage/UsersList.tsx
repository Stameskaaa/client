import styles from './friendspage.module.scss';
import { useNavigate } from 'react-router-dom';
import { ProfileImage } from '../../components/profileimage/ProfileImage';
import { UserListLoading } from '../../components/loaders/userList/UserListLoading';
import { UserListButton } from './UserListButton';
import { UserDataInnerList } from '../../types/interfaces';

interface Props {
  currentList: UserDataInnerList[];
  loading: boolean;
  selectedCategory: number;
  subscribe: (name: string) => void;
  cancelSub: (name: string) => void;
  deleteFriend: (name: string) => void;
  addFriend: (name: string) => void;
  value: string;
  buttonLoading: boolean;
}

const selectedCategoryArr = ['Друзей', 'Подписок', 'Подписчиков', 'Все'];

export const UsersList: React.FC<Props> = ({
  currentList,
  loading,
  selectedCategory,
  subscribe,
  cancelSub,
  deleteFriend,
  addFriend,
  value,
  buttonLoading,
}) => {
  const navigate = useNavigate();

  if (loading) {
    return <UserListLoading />;
  }

  if (currentList && currentList.length === 0) {
    return <div>{selectedCategoryArr[selectedCategory]} нет . . . </div>;
  }

  function redirect(name: string) {
    navigate(`/mainpage/${name}/`, { state: { selectedCategory } });
  }

  return (
    <>
      {currentList
        .filter((v) => v.name.toLowerCase().includes(value.toLowerCase()))
        .map((v, i) => {
          if (v) {
            return (
              <div key={i} className={styles.container_hr}>
                <div className={styles.user_block}>
                  <ProfileImage
                    className={styles.img}
                    onClick={() => {
                      redirect(v.name);
                    }}
                    src={v.img}
                  />
                  <p
                    onClick={() => {
                      redirect(v.name);
                    }}>
                    {v.name} {v.lastName !== 'unknown' ? v.lastName : null}
                  </p>
                  <div className={styles.button_block}>
                    <UserListButton
                      selectedCategory={selectedCategory}
                      name={v.name}
                      buttonLoading={buttonLoading}
                      subscribe={subscribe}
                      addFriend={addFriend}
                      deleteFriend={deleteFriend}
                      cancelSub={cancelSub}
                    />
                  </div>
                </div>
                <hr />
              </div>
            );
          }
          return null;
        })}
    </>
  );
};
