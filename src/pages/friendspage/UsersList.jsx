import styles from './friendspage.module.scss';
import { FaTrash } from 'react-icons/fa';
import { IoMdCheckmark } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';
import { ProfileImage } from '../../components/profileimage/ProfileImage';
import { UserListLoading } from '../../components/loaders/userList/UserListLoading';

const selectedCategoryArr = ['Друзей', 'Подписок', 'Подписчиков', 'Все'];
export const UsersList = ({
  currentList,
  loading,
  selectedCategory,
  subscribe,
  cancelSub,
  deleteFriend,
  addFriend,
  value,
}) => {
  const navigate = useNavigate();

  if (loading) {
    return <UserListLoading />;
  }

  if (currentList && currentList.length === 0) {
    return <div>{selectedCategoryArr[selectedCategory]} нет . . . </div>;
  }

  function checkCategory(name) {
    if (selectedCategory === 0) {
      deleteFriend(name);
    }
    if (selectedCategory === 1 || selectedCategory === 2) {
      cancelSub(name);
    }
  }
  function redirect(name) {
    navigate(`/mainpage/${name}/`, { state: { selectedCategory } });
  }

  return currentList
    .filter((v) => v !== '' && v.name.toLowerCase().includes(value.toLowerCase()))
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
                {selectedCategory === 0 || selectedCategory === 1 ? (
                  <button>
                    <FaTrash onClick={() => checkCategory(v.name)} />
                  </button>
                ) : selectedCategory === 2 ? (
                  <>
                    <button>
                      <IoMdCheckmark onClick={() => addFriend(v.name)} />
                    </button>
                    <button>
                      <FaTrash onClick={() => checkCategory(v.name)} />
                    </button>
                  </>
                ) : (
                  <button onClick={() => subscribe(v.name)}>
                    <IoMdCheckmark />
                  </button>
                )}
              </div>
            </div>
            <hr />
          </div>
        );
      } else {
        console.log(v, 'v');
      }
    });
};
