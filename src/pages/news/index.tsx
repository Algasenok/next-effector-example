import styles from './Index.module.scss';
import { NewsLayout } from '@/layouts/NewsLayout';
import { NewsCardItem, Pagination } from '@/components';

function News() {
  const changePageNumber = () => {
    console.log('сменить страницу');
  };

  return (
    <NewsLayout>
      <div className={styles.newsCardsContainer}>
        <NewsCardItem />
        <NewsCardItem />
        <NewsCardItem />
        <NewsCardItem />
      </div>
      <Pagination onClickHandler={() => changePageNumber()} />
    </NewsLayout>
  );
}

export default News;
