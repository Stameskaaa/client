import styles from './newsblock.module.scss';
import { DefaultButton } from '../button/DefaultButton';

const arr = [
  'Description none',
  'Name absent',
  'https://avatars.dzeninfra.ru/get-zen_doc/3721497/pub_5f8712e2aa68813be13c3c49_5f871952aa68813be149a022/scale_1200',
];

interface Props {
  [key: string]: string;
}

export const NewsBlock: React.FC<Props> = ({
  text = arr[0],
  name = arr[1],
  src = arr[2],
  url = '/',
}) => {
  return (
    <div className={styles.container}>
      <img src={src} className={styles.image} alt={arr[2]} />
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <header className={styles.text}>{name}</header>
        <hr className={styles.hr} />
        <p className={styles.p}>{text}</p>
        <div className={styles.containerButt}>
          <a href={url} className={styles.a}>
            <DefaultButton />
          </a>
        </div>
      </div>
    </div>
  );
};
