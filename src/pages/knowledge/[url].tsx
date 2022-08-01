import { NextPage, GetStaticPaths } from 'next';
import { KnowledgeItem } from '@/components';
import { createGSP } from '@/models/shared';
import { getSinglePageItem, $singlePage } from '@/models/singlePage';
import { API } from '@/api';
import { LinkProps, SinglePage } from '@/types/types';
import { useStore } from 'effector-react';
import { $tagsListForCategory } from '@/models/menu';

const KnowledgeItemPage: NextPage = () => {
  const singlePage = useStore<SinglePage | null>($singlePage);
  const tags = useStore<LinkProps[]>($tagsListForCategory);

  return <KnowledgeItem singlePage={singlePage} tags={tags} />;
};

export const getStaticPaths: GetStaticPaths = async () => {
  const params = {
    filters: {
      category: {
        sysname: {
          $eq: 'knowledge',
        },
      },
    },
  };
  const { data } = await API.getPagesForCategory(params);
  return {
    paths: data.data.map((post: any) => ({
      params: { url: post.attributes.url },
    })),
    fallback: false,
  };
};

export const getStaticProps = createGSP({
  pageEvent: getSinglePageItem,
});

export default KnowledgeItemPage;
