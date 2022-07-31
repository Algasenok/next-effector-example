import { NextPage } from 'next';
import { KnowledgePage } from '@/components';
import { createGSP } from '@/models/shared';
import {
  initNewsPage,
  $currentCategory,
  $paginationData,
  $categoryPageData,
} from '@/models/newsPage';
import { useStore } from 'effector-react';
import { Category } from '@/types/types';
import { useEffect } from 'react';

const Knowledge: NextPage = () => {
  const { data: pagesList, loading } = useStore<any>($categoryPageData);
  const categoryInfo = useStore<Category | null>($currentCategory);
  const pagination = useStore<any>($paginationData);

  useEffect(() => {
    console.log('getState', pagesList);
  }, [loading]);

  return (
    <KnowledgePage pagesList={pagesList} categoryInfo={categoryInfo} pagination={pagination} />
  );
};

export const getStaticProps = createGSP({
  pageEvent: initNewsPage,
});

export default Knowledge;
