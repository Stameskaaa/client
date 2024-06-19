import { useEffect, useState } from 'react';
import styles from './editprofile.module.scss';
export const Input = ({ labelText = '', placeholder = '', className, flag, setChangeData }) => {
  const [text, setText] = useState('');
  function changeText(e) {
    if (labelText === 'Age') {
      if (!Number.isNaN(Number(e.target.value))) {
        setText(e.target.value);
      }
    } else {
      setText(e.target.value);
    }
  }

  useEffect(() => {
    if (text) {
      setText('');
      setChangeData((prev) => {
        return { ...prev, [labelText]: text };
      });
    }
  }, [flag]);
  return (
    <>
      <label className={`${styles.small} ${styles.mb1} `}>{labelText}</label>
      <input className={className} onChange={changeText} placeholder={placeholder} value={text} />
    </>
  );
};
