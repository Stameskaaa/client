import { useEffect, useRef, useState } from 'react';
import styles from './editprofile.module.scss';
import { ProfileImage } from '../../components/profileimage/ProfileImage';
import { DefaultButton } from '../../components/button/DefaultButton';
import { InputFile } from '../mainpage/InputFile';
import { UserDataInnerList } from '../../types/interfaces';

const arr = ['Brightness', 'Contrast', 'Blur', 'Grayscale', 'Saturate', 'Opacity'];
const arr2 = ['↻', '↺', '🔍', '🔎'];
const arr3: [string, number][] = [
  ['rotate', +90],
  ['rotate', -90],
  ['scale', +0.1],
  ['scale', -0.1],
];

interface Props {
  setShowUploadImage: React.Dispatch<React.SetStateAction<boolean>>;
  profileData: UserDataInnerList;
}

export const UploadImage: React.FC<Props> = ({ setShowUploadImage, profileData }) => {
  const [currentCategory, setCurrentCategory] = useState<number>(0);
  const [file, setFile] = useState<File[]>([]);
  const [url, setUrl] = useState<string>('');
  const reader = new FileReader();
  const imageRef = useRef<HTMLDivElement>(null);
  const [filters, setFilters] = useState([1, 1, 0, 0, 1, 1]);
  const [rotate, setRotate] = useState([0, 0]);
  const [disabledIndex, setDisabledIndex] = useState<number | ''>('');

  function changeImage(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    event.stopPropagation();
  }
  useEffect(() => {
    const loadFile = () => {
      const result = reader.result as string;

      setUrl(result);
    };

    if (file[0]?.name) {
      reader.onload = loadFile;
      reader.readAsDataURL(file[0]);
    }
  }, [file]); // Работа с файлами

  useEffect(() => {
    if (imageRef.current) {
      const style = getComputedStyle(imageRef.current);
      const propertyValue = style
        .getPropertyValue(`--image-${arr[currentCategory].toLowerCase()}`)
        .trim();
      if (propertyValue.includes('px')) {
        setFilters((prev) => {
          const newProps = [...prev];
          newProps[currentCategory] = parseFloat(propertyValue);
          return newProps;
        });
      } else {
        setFilters((prev) => {
          const newProps = [...prev];
          newProps[currentCategory] = parseFloat(propertyValue);
          return newProps;
        });
      }
    }
  }, [currentCategory]); // Получение стилей из css

  useEffect(() => {
    if (imageRef.current) {
      imageRef.current.style.setProperty(
        `--image-${arr[currentCategory].toLowerCase()}`,
        currentCategory === 2 ? `${filters[currentCategory]}px` : `filters[currentCategory]`,
      );
    }
  }, [filters, currentCategory]); // Установление новых стилей в css файл

  const changeRangeValue = (value: number) => {
    setFilters((prev) => {
      const newProps = [...prev];
      newProps[currentCategory] = value / 100;
      return newProps;
    });
  }; // Установление новых стилей в UseState

  useEffect(() => {
    if (imageRef.current) {
      const style = getComputedStyle(imageRef.current);
      const propertyValueRotate = style.getPropertyValue(`--image-rotate`).trim();
      const propertyValueScale = style.getPropertyValue(`--image-scale`).trim();

      setRotate((prev) => {
        const result = [...prev];
        result[0] = parseFloat(propertyValueRotate);
        result[1] = parseFloat(propertyValueScale);
        return result;
      });
    }
  }, []); // Получение стилей из css

  const rotateFunction = (i: number) => {
    if (imageRef.current) {
      if (i === 0 || i === 1) {
        imageRef.current.style.setProperty(`--image-${arr3[i][0]}`, `${rotate[0] + arr3[i][1]}deg`);
        setRotate((prev) => {
          const result = [...prev];
          result[0] = result[0] + arr3[i][1];
          return result;
        });
      } else {
        imageRef.current.style.setProperty(`--image-${arr3[i][0]}`, `${rotate[1] + arr3[i][1]}`);
        setRotate((prev) => {
          const result = [...prev];
          result[1] = result[1] + arr3[i][1];
          return result;
        });
      }
    }
  };

  useEffect(() => {
    if (rotate[1] >= 1.7) {
      setDisabledIndex(2);
    } else if (rotate[1] <= 0.5) {
      setDisabledIndex(3);
    } else {
      setDisabledIndex('');
    }
  }, [rotate[1]]);

  return (
    <div
      onClick={() => setShowUploadImage((prev) => !prev)}
      className={styles.uploadimage_container}>
      <div className={styles.body} onClick={changeImage}>
        <div className={styles.wrapper}>
          <div className={styles.filters_container}>
            <div className={styles.button_block}>
              <p>Filters</p>
              <hr />
              {arr.map((v, i) => {
                return (
                  <DefaultButton
                    className={`${currentCategory === i ? styles.active : null}`}
                    onClick={() => setCurrentCategory(i)}
                    key={i}
                    text={v}
                  />
                );
              })}
            </div>
            <hr />
            <div className={styles.range_block}>
              {arr[currentCategory]}
              <input
                value={filters[currentCategory] * 100}
                type="range"
                onChange={(e) => changeRangeValue(Number(e.target.value))}
              />
            </div>
            <hr />
            Rotate
            <div className={styles.rotate_block}>
              {arr2.map((v, i) => {
                return (
                  <div
                    className={i === disabledIndex ? styles.disabled : ''}
                    onClick={() => rotateFunction(i)}
                    key={i}>
                    {v}
                  </div>
                );
              })}
            </div>
          </div>

          <div className={styles.image_container}>
            {' '}
            <div className={styles.image_wrapper}>
              <ProfileImage
                imageRef={imageRef}
                className={`${styles.imgAccountProfile} ${styles.roundedCircle} ${styles.image}`}
                src={url ? url : profileData.img}
              />
            </div>
            <div className={styles.button_container}>
              {' '}
              <InputFile
                setFiles={setFile}
                className={styles.inputfile}
                type="single"
                text="Choose"
              />
              <DefaultButton text={'Save'} onClick={() => console.log(filters, rotate)} />
            </div>
          </div>
        </div>
        <div onClick={() => setShowUploadImage((prev) => !prev)} className={styles.xmark}>
          &#10006;
        </div>
      </div>
    </div>
  );
};
