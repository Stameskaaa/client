import styles from './photocontainer.module.scss';
const srcDefault =
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdqPDruWzKi4agbBsfj80B6vm2C8iWHSGsjbGoSFxg8w&s';

interface Props {
  src: string;
  className?: string;
}

export const PhotoContainer: React.FC<Props> = ({ src = srcDefault, className }) => {
  return (
    <div className={`${styles.container} ${className}`}>
      <img src={src} alt="Avatar" />
    </div>
  );
};
