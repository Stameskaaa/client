import { useEffect, useState } from 'react';
import styles from './editprofile.module.scss';
export const Input = ({ className, flag, setChangeData, arrValue }) => {
  const [text, setText] = useState('');
  function changeText(e) {
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
