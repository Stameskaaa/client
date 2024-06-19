import styles from '../registrationform.module.scss';
import { useEffect, useState } from 'react';
import { Input } from '@mui/material';

export const InputForm = ({
  setRegAcc,
  type = 'text',
  placeholder = 'none',

  flag,
  setFlag,
}) => {
  const [text, setText] = useState('');

  useEffect(() => {
    if (flag) {
      setText('');
      setFlag(false);
    }
  }, [flag]);

  const handleText = (e) => {
    setText(e.target.value);
    setRegAcc((prev) => {
      return { ...prev, [placeholder]: e.target.value };
    });
  };

  return (
    <Input
      onChange={(e) => handleText(e)}
      value={text}
      type={type}
      className={styles.input}
      placeholder={placeholder}></Input>
  );
};
