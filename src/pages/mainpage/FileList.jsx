import styles from './mainpage.module.scss';

export const FileList = ({ files, setFiles }) => {
  if (files.length === 0) {
    return null;
  }

  const removeItem = (indexToRemove) => {
    setFiles((prev) => prev.filter((_, i) => i !== indexToRemove));
  };
  return (
    <div className={styles.input_file_list}>
      {files.map((file, i) => {
        return (
          <div key={i} className={styles.input_file_list_item}>
            <img className={styles.input_file_list_img} src={URL.createObjectURL(file)} />
            <span className={styles.input_file_list_name}>{file.name}</span>
            <a className={styles.input_file_list_remove} onClick={() => removeItem(i)}>
              x
            </a>
          </div>
        );
      })}
    </div>
  );
};
