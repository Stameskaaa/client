import React from 'react';
import styles from './defaultbutton.module.scss';

interface DefaultButtonProps {
  text?: string;
  className?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export const DefaultButton: React.FC<DefaultButtonProps> = ({
  text = 'Button',
  className = '',
  onClick,
}) => {
  return (
    <button onClick={onClick} className={`${styles.button} ${className}`}>
      {text}
    </button>
  );
};
