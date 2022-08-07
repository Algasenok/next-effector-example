import { NextPage } from 'next';
import { KnowledgeItem } from '@/components';
import { createGIP } from '@/models/shared';
import { getSinglePageItem, $singlePage } from '@/models/singlePage';
import { LinkProps, SinglePage } from '@/types/types';
import { useStore } from 'effector-react/scope';
import { $tagsListForCategory } from '@/models/menu';

const KnowledgeItemPage: NextPage = () => {
  const singlePage = useStore<SinglePage | null>($singlePage);
  const tags = useStore<LinkProps[]>($tagsListForCategory);

  return <KnowledgeItem singlePage={singlePage} tags={tags} />;
};

// export const getStaticPaths: GetStaticPaths = async () => {
//   const params = {
//     filters: {
//       category: {
//         sysname: {
//           $eq: 'knowledge',
//         },
//       },
//     },
//   };
//   const { data } = await API.getPagesForCategory(params);
//   return {
//     paths: data.data.map((post: any) => ({
//       params: { url: post.attributes.url },
//     })),
//     fallback: false,
//   };
// };
//
// export const getStaticProps = createGSP({
//   pageEvent: getSinglePageItem,
// });

KnowledgeItemPage.getInitialProps = createGIP({
  pageEvent: getSinglePageItem,
});

export default KnowledgeItemPage;
