import styles from './Knowledge.module.scss';
import { NewsLayout } from '@/layouts/NewsLayout';
import { NewsCardItem, Pagination } from '@/components';
import { $categoryPageData, $currentCategory } from '@/models/newsPage';
import { useStore } from 'effector-react';
import { SinglePage } from '@/types/types';

export function KnowledgePage() {
  const { data: pages } = useStore($categoryPageData);
  const currentCategory = useStore($currentCategory);
  const changePageNumber = () => {
    console.log('сменить страницу');
  };

  return (
    <NewsLayout title={currentCategory.name} description={currentCategory.description}>
      <div className={styles.newsCardsContainer}>
        {pages.map((page: SinglePage, index: number) => (
          <NewsCardItem key={`newsCard${index}`} data={page} />
        ))}
      </div>
      <Pagination onClickHandler={() => changePageNumber()} />
    </NewsLayout>
  );
};

export default KnowledgePage;
