import styles from './switch2.module.scss';

export const Switch = ({ onChange, isChecked, className }) => {
  return (
    <label className={`${styles.switch} ${className}`}>
      <input type="checkbox" checked={isChecked} onChange={onChange} />
      <span className={styles.slider}></span>
    </label>
  );
};
