import styles from './profileimage.module.scss';

const srcDefault = 'https://i.pinimg.com/originals/a7/29/6e/a7296e09a76b5acda246b7c8bae20c43.jpg';

export const ProfileImage = ({ src = srcDefault, className = '', imageRef, onClick = null }) => {
  return (
    <div
      onClick={onClick}
      ref={imageRef}
      className={`${styles.profileImage} ${className}`}
      style={{ backgroundImage: `url(${src})` }}
    />
  );
};
