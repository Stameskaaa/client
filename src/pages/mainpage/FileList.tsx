import styles from './mainpage.module.scss';

interface Props {
  files: File[];
  setFiles: React.Dispatch<React.SetStateAction<File[]>>;
}

export const FileList: React.FC<Props> = ({ files, setFiles }) => {
  if (files.length === 0) {
    return null;
  }

  const removeItem = (indexToRemove: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== indexToRemove));
  };
  return (
    <div className={styles.input_file_list}>
      {files.map((file, i) => {
        return (
          <div key={i} className={styles.input_file_list_item}>
            <img alt="img" className={styles.input_file_list_img} src={URL.createObjectURL(file)} />
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
