import { NextPage } from 'next';
import { KnowledgePage } from '@/components';
import { createGIP } from '@/models/shared';
import {
  initNewsPage,
  $currentCategory,
  $paginationData,
  $pagesForCategoryPage,
} from '@/models/newsPage';
import { useStore } from 'effector-react/scope';
import { Category, SinglePageCard } from '@/types/types';

const Knowledge: NextPage = () => {
  const pagesList = useStore<SinglePageCard[]>($pagesForCategoryPage);
  const categoryInfo = useStore<Category | null>($currentCategory);
  const pagination = useStore<any>($paginationData);

  return (
    <KnowledgePage pagesList={pagesList} categoryInfo={categoryInfo} pagination={pagination} />
  );
};

// export const getStaticProps = createGSP({
//   pageEvent: initNewsPage,
// });

Knowledge.getInitialProps = createGIP({
  pageEvent: initNewsPage,
});

export default Knowledge;
