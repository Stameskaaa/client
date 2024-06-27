import styles from './mainpage.module.scss';

interface Props {
  text?: string;
  type?: string;
  className?: string;
  setFiles: React.Dispatch<React.SetStateAction<File[]>>;
}

export const InputFile: React.FC<Props> = ({
  setFiles,
  text = 'Choose file',
  className,
  type = 'multiple',
}) => {
  const downloadFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
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
