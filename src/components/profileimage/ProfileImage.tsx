import styles from './profileimage.module.scss';

const srcDefault =
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdqPDruWzKi4agbBsfj80B6vm2C8iWHSGsjbGoSFxg8w&s';

interface Props {
  src: string;
  className?: string;
  imageRef?: undefined | React.LegacyRef<HTMLDivElement>;
  onClick?: () => void | undefined;
}

export const ProfileImage: React.FC<Props> = ({
  src = srcDefault,
  className = '',
  imageRef = undefined,
  onClick = undefined,
}) => {
  return (
    <div
      onClick={onClick && onClick}
      ref={imageRef}
      className={`${styles.profileImage} ${className}`}
      style={{ backgroundImage: `url(${src})` }}
    />
  );
};
