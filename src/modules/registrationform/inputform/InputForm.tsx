import styles from '../registrationform.module.scss';
import { useEffect, useState } from 'react';
import { Input } from '@mui/material';

interface RegistrationData {
  [key: string]: string;
}
interface Props {
  setRegAcc: React.Dispatch<React.SetStateAction<RegistrationData>>;
  type: string;
  placeholder: string;
  flag: boolean;
  setFlag: (state: boolean) => void;
}

export const InputForm: React.FC<Props> = ({
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

  const handleText = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);

    setRegAcc((prev: RegistrationData) => {
      return { ...prev, [placeholder]: e.target.value };
    });
  };

  return (
    <Input
      onChange={handleText}
      value={text}
      type={type}
      className={styles.input}
      placeholder={placeholder}></Input>
  );
};
