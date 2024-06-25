import { useEffect, useRef, useState } from 'react';
import styles from './newspage.module.scss';
import { NewsBlock } from '../../components/newsblock/NewsBlock';
import { Button, Input } from '@mui/material';

interface Article {
  url: string;
  content: string;
  author: string;
  urlToImage: string;
}

export const NewsPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [resultArr, setResultArr] = useState<Article[]>([]);
  const [value, setValue] = useState('');
  const [parametrs, setParametrs] = useState('tesla');

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch(
      `https://newsapi.org/v2/everything?q=${parametrs}&pageSize=5&page=${currentPage}&apiKey=b778824bb3744c1a883f8da728d9a3b3`,
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        if (currentPage === 2) {
          setResultArr(data.articles);
        } else {
          setResultArr((prev) => [...prev, ...data.articles]);
        }
      })
      .catch((error) => console.error('Fetch Error:', error));
  }, [currentPage, parametrs]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setCurrentPage((prev) => prev + 1);
        }
      });
    });

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      observer.disconnect();
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  return (
    <div className={styles.container}>
      <Input style={{ color: 'white' }} value={value} onChange={(e) => setValue(e.target.value)} />
      <Button onClick={() => setParametrs(value)}>Apply</Button>
      {resultArr.length > 0 &&
        resultArr.map((v) => (
          <NewsBlock
            url={v.url || ''}
            text={v.content || ''}
            name={v.author || ''}
            src={v.urlToImage || ''}
          />
        ))}
      <div ref={ref} style={{ width: '5px', height: '5px' }} />
    </div>
  );
};
