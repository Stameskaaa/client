import styles from './rightfriendblock.module.scss';
export const RightFriendBlock = ({ selectedCategory, setSelectedCategory }) => {
  const listArray = ['Мои друзья', 'Подписки', 'Подписчики', 'Все'];
  return (
    <div className={styles.container}>
      <ul>
        {listArray.map((v, i) => {
          return (
            <li
              onClick={() => {
                setSelectedCategory(i);
              }}
              key={i}
              className={selectedCategory === i ? styles.active : null}>
              {v}
            </li>
          );
        })}
      </ul>
    </div>
  );
};
