import { useEffect, useState } from 'react';
import { getAllUsers } from '../../api/api';
import styles from './input.module.scss';
import { useAppSelector } from '../../UI/hooks/hook';
import { ProfileImage } from '../profileimage/ProfileImage';
import { useClickOutside } from '../../UI/hooks/useClickOutside';
import { useNavigate } from 'react-router-dom';

interface Props {
  value: string;
  styleObj: styleObj;
  onChange: (value: string) => void;
}

interface styleObj {
  input: string;
}

interface UserObject {
  name: string;
  img: string;
}

export const Input: React.FC<Props> = ({ styleObj, onChange, value }) => {
  const profileData = useAppSelector((state) => state.auth.profileData);
  const [users, setUsers] = useState<UserObject[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<UserObject[]>([]);
  const [loading, setLoading] = useState<Boolean>(true);
  const [focus, setFocus] = useState(false);
  const navigate = useNavigate();
  const ref = useClickOutside(() => setFocus(false));

  useEffect(() => {
    setLoading(true);
    getAllUsers(profileData.name)
      .then((data) =>
        setUsers(data.data.filter((object: UserObject) => object.name !== profileData.name)),
      )
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    setFilteredUsers(() =>
      users.filter((user) => user.name.toLowerCase().includes(value.toLowerCase())),
    );
  }, [users, value]);

  return (
    <div className={styles.inputWrapper}>
      <form onSubmit={(e) => e.preventDefault()}>
        <input
          ref={ref}
          onClick={() => setFocus(true)}
          value={value}
          onChange={(e) => {
            onChange(e.target.value);
          }}
          placeholder="Поиск"
          className={`${styles.input} ${styleObj?.input || ''}`}
        />
      </form>
      {!loading && focus && (
        <div onClick={(e) => e.stopPropagation()} className={styles.belowInput}>
          {filteredUsers.length > 0 ? (
            filteredUsers.map((user, i) => {
              return (
                <div
                  onClick={() => {
                    navigate(`/mainpage/${user.name}/posts`);
                    setFocus(false);
                  }}
                  key={i}
                  className={styles.user_block}>
                  <ProfileImage src={user.img} className={styles.input_image} />

                  {user.name}
                </div>
              );
            })
          ) : (
            <div>Никто не найден</div>
          )}
        </div>
      )}
    </div>
  );
};
