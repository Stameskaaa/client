import styles from './blogpost.module.scss';
import { ProfileImage } from '../../../components/profileimage/ProfileImage';
import { useState } from 'react';
import { FullScreen } from '../../../components/fullscreen/FullScreen';
import { Photo } from '../../../types/interfaces';
const text = ` Lorem ipsum dolor sit amet consectetur, adipisicing elit. Illum voluptate eius officiis doloribus magnam, porro praesentium officia deserunt corrupti sint eveniet incidunt quis
molestias adipisci, explicabo quisquam ducimus autem voluptatem? Lorem ipsum dolor sit amet
consectetur adipisicing elit. Quae fuga ipsum exercitationem, et, incidunt blanditiis
reprehenderit nisi deleniti quaerat mollitia recusandae! Expedita nihil quod natus, cum unde
ipsa amet id. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Illum voluptate eius
officiis doloribus magnam, porro praesentium officia deserunt corrupti sint eveniet incidunt
quis molestias adipisci, explicabo quisquam ducimus autem voluptatem? Lorem ipsum dolor sit
amet consectetur adipisicing elit. Quae fuga ipsum exercitationem, et, incidunt blanditiis
reprehenderit nisi deleniti quaerat mollitia recusandae! Expedita nihil quod natus, cum unde
ipsa amet id. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Illum voluptate eius
officiis doloribus magnam, porro praesentium officia deserunt corrupti sint eveniet incidunt
quis molestias adipisci, explicabo quisquam ducimus autem voluptatem? Lorem ipsum dolor sit
amet consectetur adipisicing elit. Quae fuga ipsum exercitationem, et, incidunt blanditiis
reprehenderit nisi deleniti quaerat mollitia recusandae! Expedita nihil quod natus, cum unde
ipsa amet id. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Illum voluptate eius
officiis doloribus magnam, porro praesentium officia deserunt corrupti sint eveniet incidunt
quis molestias adipisci, explicabo quisquam ducimus autem voluptatem? Lorem ipsum dolor sit
amet consectetur adipisicing elit. Quae fuga ipsum exercitationem, et, incidunt blanditiis
reprehenderit nisi deleniti quaerat mollitia recusandae! Expedita nihil quod natus, cum unde
ipsa amet id. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Illum voluptate eius
officiis doloribus magnam, porro praesentium officia deserunt corrupti sint eveniet incidunt
quis molestias adipisci, explicabo quisquam ducimus autem voluptatem? Lorem ipsum dolor sit
amet consectetur adipisicing elit. Quae fuga ipsum exercitationem, et, incidunt blanditiis
reprehenderit nisi deleniti quaerat mollitia recusandae! Expedita nihil quod natus, cum unde
ipsa amet id. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Illum voluptate eius
officiis doloribus magnam, porro praesentium officia deserunt corrupti sint eveniet incidunt
quis molestias adipisci, explicabo quisquam ducimus autem voluptatem? Lorem ipsum dolor sit
amet consectetur adipisicing elit. Quae fuga ipsum exercitationem, et, incidunt blanditiis
reprehenderit nisi deleniti quaerat mollitia recusandae! Expedita nihil quod natus, cum unde
ipsa amet id. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Illum voluptate eius
officiis doloribus magnam, porro praesentium officia deserunt corrupti sint eveniet incidunt
quis molestias adipisci, explicabo quisquam ducimus autem voluptatem? Lorem ipsum dolor sit
amet consectetur adipisicing elit. Quae fuga ipsum exercitationem, et, incidunt blanditiis
reprehenderit nisi deleniti quaerat mollitia recusandae! Expedita nihil quod natus, cum unde
ipsa amet id. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Illum voluptate eius
officiis doloribus magnam, porro praesentium officia deserunt corrupti sint eveniet incidunt
quis molestias adipisci, explicabo quisquam ducimus autem voluptatem? Lorem ipsum dolor sit
amet consectetur adipisicing elit. Quae fuga ipsum exercitationem, et, incidunt blanditiis
reprehenderit nisi deleniti quaerat mollitia recusandae! Expedita nihil quod natus, cum unde
ipsa amet id. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Illum voluptate eius
officiis doloribus magnam, porro praesentium officia deserunt corrupti sint eveniet incidunt
quis molestias adipisci, explicabo quisquam ducimus autem voluptatem? Lorem ipsum dolor sit
amet consectetur adipisicing elit. Quae fuga ipsum exercitationem, et, incidunt blanditiis
reprehenderit nisi deleniti quaerat mollitia recusandae! Expedita nihil quod natus, cum unde
ipsa amet id. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Illum voluptate eius
officiis doloribus magnam, porro praesentium officia deserunt corrupti sint eveniet incidunt
quis molestias adipisci, explicabo quisquam ducimus autem voluptatem? Lorem ipsum dolor sit
amet consectetur adipisicing elit. Quae fuga ipsum exercitationem, et, incidunt blanditiis
reprehenderit nisi deleniti quaerat mollitia recusandae! Expedita nihil quod natus, cum unde
ipsa amet id.Lorem ipsum dolor sit amet consectetur, adipisicing elit. Illum voluptate eius
officiis doloribus magnam, porro praesentium officia deserunt corrupti sint eveniet incidunt
quis molestias adipisci, explicabo quisquam ducimus autem voluptatem? Lorem ipsum dolor sit
amet consectetur adipisicing elit. Quae fuga ipsum exercitationem, et, incidunt blanditiis
reprehenderit nisi deleniti quaerat mollitia recusandae! Expedita nihil quod natus, cum unde
ipsa amet id.`;
let now = new Date();
let photos = [
  'https://www.w3schools.com/w3images/lights.jpg',
  'https://www.w3schools.com/w3images/nature.jpg',
  'https://www.w3schools.com/w3images/nature.jpg',
  'https://www.w3schools.com/w3images/nature.jpg',
];
export const BlogPost: React.FC = () => {
  const [flag, setFlag] = useState(false);
  const [arrPhoto, setArrPhoto] = useState<string[]>([]);
  let [currentIndex, setCurrentIndex] = useState(0);

  return (
    <div className={styles.container}>
      {flag && (
        <FullScreen
          arrPhoto={arrPhoto}
          onClick={() => setFlag(false)}
          setCurrentIndex={setCurrentIndex}
          currentIndex={currentIndex}
        />
      )}
      <div className={styles.container_name}>
        <ProfileImage
          src="https://www.w3schools.com/w3images/avatar3.png"
          className={styles.BlogImage}
        />
        <h4 className={styles.name}> Leonid Stanislavovich</h4>{' '}
        <h4 className={styles.time}>
          {now.getHours()}:{now.getMinutes() === 0 ? '00' : now.getMinutes()}
        </h4>
      </div>

      <hr className={styles.hr} />
      <p>{text}</p>

      <div className={styles.container__photo}>
        {photos.map((photo, i, arr) => {
          return (
            <img
              key={i}
              onClick={() => {
                setFlag(true);
                setArrPhoto(arr.filter((v) => typeof v === 'string'));
                setCurrentIndex(i);
              }}
              className={styles.image}
              src={photo}
              alt="Italian Trulli"
            />
          );
        })}
      </div>
      <div className={styles.container__button}>
        <button className={styles.button}>Like</button>
        <button className={styles.button}>Send</button>
      </div>
    </div>
  );
};
