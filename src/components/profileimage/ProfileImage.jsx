import styles from './profileimage.module.scss';

const srcDefault =
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdqPDruWzKi4agbBsfj80B6vm2C8iWHSGsjbGoSFxg8w&s';

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
