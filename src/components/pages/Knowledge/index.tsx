import styles from './Knowledge.module.scss';
import { NewsLayout } from '@/layouts/NewsLayout';
import { NewsCardItem, Pagination } from '@/components';
import { Category, LinkProps, blogPageCard } from '@/types/types';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

interface Props {
  pagesList: blogPageCard[];
  categoryInfo: Category | null;
  pagination: any;
}

export function KnowledgePage({ pagesList, categoryInfo, pagination }: Props) {
  const pages = pagesList;
  const currentCategory = categoryInfo;
  const [categories, setCategories] = useState<LinkProps[]>([]);
  const router = useRouter();

  const pageNumberChange = (value: number) => {
    const routeParams = {
      query: {},
    };
    const query = router.query || {};
    const page = query.page ? Number(query.page) : 1;
    if (page !== value) {
      if (value === 1) {
        delete query['page'];
        routeParams.query = { ...query };
      } else {
        routeParams.query = { ...query, page: value };
      }
      router.push(routeParams, undefined, { scroll: false });
    }
  };

  useEffect(() => {
    if (currentCategory) {
      setCategories(
        currentCategory.tags.map(tag => ({
          id: tag.id,
          text: tag.tagName,
          sysname: tag.sysname,
          link: `/${currentCategory.sysname}`,
        })),
      );
    }
  }, []);

  return (
    <NewsLayout
      title={currentCategory ? currentCategory.name : ''}
      description={currentCategory ? currentCategory.introduction : ''}
      categories={categories}
      place="news"
    >
      <div className={styles.newsCardsContainer}>
        {pages.map((page: blogPageCard, index: number) => (
          <NewsCardItem key={`newsCard${index}`} data={page} />
        ))}
      </div>
      {pagination.pageCount > 1 && (
        <Pagination pagination={pagination} onClickHandler={value => pageNumberChange(value)} />
      )}
    </NewsLayout>
  );
}

export default KnowledgePage;
