import styles from './mainpage.module.scss';
export const InputFile = ({
  setFiles,
  text = 'Choose file',
  className = null,
  type = 'multiple',
}) => {
  const downloadFiles = (e) => {
    if (e.target?.files) {
      setFiles(Array.from(e.target.files));
      e.target.value = '';
    }
  };

  return (
    <label className={`${className} ${styles.input_file}`}>
      <input
        name="file[]"
        type="file"
        accept="image/*"
        onChange={downloadFiles}
        className={styles.input_photos}
        multiple={type === 'multiple'}
      />
      <span>{text}</span>
    </label>
  );
};
