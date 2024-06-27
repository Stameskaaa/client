import styles from './rightfriendblock.module.scss';

interface Props {
  selectedCategory: number;
  setSelectedCategory: React.Dispatch<React.SetStateAction<number>>;
}
export const RightFriendBlock: React.FC<Props> = ({ selectedCategory, setSelectedCategory }) => {
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
              className={selectedCategory === i ? styles.active : undefined}>
              {v}
            </li>
          );
        })}
      </ul>
    </div>
  );
};
