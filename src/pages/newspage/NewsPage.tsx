import { useEffect, useRef, useState } from 'react';
import styles from './newspage.module.scss';
import { NewsBlock } from '../../components/newsblock/NewsBlock';
import { Button, Input } from '@mui/material';

interface NewsBlockProps {
  url: string;
  text: string;
  name: string;
  src: string;
  urlToImage: string;
}

export const NewsPage = () => {
  const [pageCount, setPageCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [resultArr, setResultArr] = useState<(NewsBlockProps | any)[]>([]);
  const [value, setValue] = useState('');
  const [parametrs, setParametrs] = useState('tesla');

  const ref = useRef(null);

  useEffect(() => {
    fetch(
      `https://newsapi.org/v2/everything?q=${parametrs}&pagesize=5&page=${currentPage}&apiKey=b778824bb3744c1a883f8da728d9a3b3`,
    )
      .then((r) => r.json())
      .then((result) => {
        console.log(result.status === 'ok');
        if (result.status === 'ok') {
          setPageCount(result.totalResults);
          if (currentPage === 2) {
            setResultArr(result.articles);
          } else {
            console.log('else');
            console.log(currentPage);

            setResultArr((prev) => [...prev, ...result.articles]);
          }
        }
      })
      .catch((error) => console.log(error));
  }, [currentPage, parametrs]);

  useEffect(() => {
    let observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // console.log('Пользователь почти докрутил до картинки!');
          setCurrentPage((prev) => (prev += 1));
        }
      });
    }, {});
    if (ref.current) {
      // console.log('вешаем слушатель');
      observer.observe(ref.current);
    }

    return () => {
      observer.disconnect();

      if (ref.current) {
        // console.log('убираем слушатель');
        observer.unobserve(ref.current);
      }
    };
  }, []);

  return (
    <div className={styles.container}>
      <Input style={{ color: 'white' }} value={value} onChange={(e) => setValue(e.target.value)} />
      <Button onClick={() => setParametrs(value)}>Apply</Button>
      {resultArr.length > 0
        ? resultArr.map((v, id) => {
            return (
              <NewsBlock url={v.url} text={v.content} name={v.author} key={id} src={v.urlToImage} />
            );
          })
        : null}
      <div ref={ref} style={{ width: '5px', height: '5px' }} />
    </div>
  );
};
