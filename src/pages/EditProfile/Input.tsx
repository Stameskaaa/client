import { useEffect, useState } from 'react';
import styles from './editprofile.module.scss';

interface Props {
  className: string;
  flag: boolean;
  arrValue: string[];
  setChangeData: React.Dispatch<React.SetStateAction<InputData>>;
}

interface InputData {
  [key: string]: string;
}

export const Input: React.FC<Props> = ({ className, flag, setChangeData, arrValue }) => {
  const [text, setText] = useState<string | number>('');
  function changeText(e: React.ChangeEvent<HTMLInputElement>) {
    if (arrValue[0] === 'Age') {
      if (!Number.isNaN(Number(e.target.value))) {
        setText(e.target.value);
        setChangeData((prev) => {
          return { ...prev, [arrValue[2]]: e.target.value };
        });
      }
    } else {
      setText(e.target.value);
      setChangeData((prev) => {
        return { ...prev, [arrValue[2]]: e.target.value };
      });
    }
  }

  useEffect(() => {
    setText('');
  }, [flag]);

  return (
    <>
      <label className={`${styles.small} ${styles.mb1} `}>{arrValue[0]}</label>
      <input className={className} onChange={changeText} placeholder={arrValue[1]} value={text} />
    </>
  );
};
