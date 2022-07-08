import styles from './Index.module.scss';
import { NewsLayout } from '@/layouts/NewsLayout';

function News() {
  return (
    <NewsLayout>
      <div className={styles.newsContainer}>
        Контент
      </div>
    </NewsLayout>
  );
}

export default News;
