import { NextPage } from 'next';
import Head from 'next/head';
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
import { useRouter } from 'next/router';

const Knowledge: NextPage = () => {
  const pagesList = useStore<SinglePageCard[]>($pagesForCategoryPage);
  const categoryInfo = useStore<Category | null>($currentCategory);
  const pagination = useStore<any>($paginationData);
  const router = useRouter();
  const isNoIndex =
    !!Object.keys(router.query).length &&
    !(Object.keys(router.query).length === 1 && router.query.page);

  const metaPostFix = router.query.page ? ` - page-${router.query.page}` : '';

  return (
    <>
      <Head>
        <title>{categoryInfo ? categoryInfo.title + metaPostFix : metaPostFix}</title>
        <meta
          name="description"
          content={categoryInfo ? categoryInfo.description + metaPostFix : metaPostFix}
        />
        {isNoIndex ? <meta name="robots" content="noindex" /> : null}
      </Head>
      <KnowledgePage pagesList={pagesList} categoryInfo={categoryInfo} pagination={pagination} />
    </>
  );
};

Knowledge.getInitialProps = createGIP({
  pageEvent: initNewsPage,
});

export default Knowledge;
