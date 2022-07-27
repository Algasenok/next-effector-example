import { NextPage, GetStaticPaths } from 'next';
import { usePageEvent } from 'nextjs-effector';
import { KnowledgeItem } from '@/components';
import { createGSP, appStarted } from '@/models/shared';
import { getSinglePageItem } from '@/models/singlePage';
import { getPagesForCategoryFx } from '@/models/newsPage';

const KnowledgeItemPage: NextPage = () => {
  usePageEvent(appStarted, { runOnce: true });
  return <KnowledgeItem />;
};

export const getStaticPaths: GetStaticPaths = async () => {
  // TODO убрать прямой вызов запроса (и согласовать его с остальными параметрами фильтрации)
  const { data } = await getPagesForCategoryFx('knowledge');
  return {
    paths: data.map((post: any) => ({
      params: { url: post.attributes.url },
    })),
    fallback: false,
  };
};

export const getStaticProps = createGSP({
  pageEvent: getSinglePageItem,
});

export default KnowledgeItemPage;
