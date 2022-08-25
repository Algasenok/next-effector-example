import { NextPage } from 'next';
import Head from 'next/head';
import { KnowledgeItem } from '@/components';
import { createGIP } from '@/models/shared';
import { getSinglePageItem, $singlePage } from '@/models/singlePage';
import { LinkProps, SinglePage } from '@/types/types';
import { useStore } from 'effector-react/scope';
import { $tagsListForCategory } from '@/models/menu';
import ErrorPage from 'next/error';

const KnowledgeItemPage: NextPage = () => {
  const singlePage = useStore<SinglePage | null>($singlePage);
  const tags = useStore<LinkProps[]>($tagsListForCategory);

  if (!singlePage) {
    return <ErrorPage statusCode={404} />;
  }

  return (
    <>
      <Head>
        <title>{singlePage?.title}</title>
        <meta name="description" content={singlePage?.description} />
        <meta httpEquiv="Last-Modified" content={new Date(singlePage?.updatedAt).toUTCString()} />
      </Head>
      <KnowledgeItem singlePage={singlePage} tags={tags} />
    </>
  );
};

KnowledgeItemPage.getInitialProps = createGIP({
  pageEvent: getSinglePageItem,
});

export default KnowledgeItemPage;
