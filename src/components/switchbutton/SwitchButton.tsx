import { useState } from 'react';
import styles from './switch.module.scss';

export const SwitchButton: React.FC = () => {
  const [isDark, setIsDark] = useState<Boolean>(false);

  const handleToggle = () => {
    setIsDark(!isDark);
  };

  return (
    <div
      className={`${styles.themeToggleButton} ${isDark ? styles.dark : styles.light}`}
      onClick={handleToggle}>
      <div className={styles.icon}>{isDark ? '🌜' : '🌞'}</div>
    </div>
  );
};
