import styles from './Knowledge.module.scss';
import { NewsLayout } from '@/layouts/NewsLayout';
import { NewsCardItem, Pagination } from '@/components';
import { changePageNumber } from '@/models/newsPage';
import {Category, LinkProps, SinglePage, SinglePageCard} from '@/types/types';
import { useEffect, useState } from 'react';

interface Props {
  pagesList: SinglePageCard[];
  categoryInfo: Category | null;
  pagination: any;
}

export function KnowledgePage({ pagesList, categoryInfo, pagination }: Props) {
  const pages = pagesList;
  const currentCategory = categoryInfo;
  const [categories, setCategories] = useState<LinkProps[]>([]);

  useEffect(() => {
    if (categoryInfo) {
      setCategories(
        categoryInfo.tags.map(tag => ({
          id: tag.id,
          text: tag.tagName,
          sysname: tag.sysname,
          link: `/${categoryInfo.sysname}`,
        })),
      );
    }
  }, []);

  const pageNumberChange = value => {
    changePageNumber(value);
  };

  return (
    <NewsLayout
      title={currentCategory ? currentCategory.name : ''}
      description={currentCategory ? currentCategory.description : ''}
      categories={categories}
      place="news"
    >
      <div className={styles.newsCardsContainer}>
        {pages.map((page: SinglePageCard, index: number) => (
          <NewsCardItem key={`newsCard${index}`} data={page} />
        ))}
      </div>
      <Pagination pagination={pagination} onClickHandler={value => pageNumberChange(value)} />
    </NewsLayout>
  );
}

export default KnowledgePage;
