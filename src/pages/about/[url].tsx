import { NextPage } from 'next';
import { AboutItem } from '@/components';
import { createGIP } from '@/models/shared';
import { getAboutPageItem, $aboutPageItem, $aboutPages } from '@/models/about';
import { useStore } from 'effector-react/scope';
import { LinkProps, SinglePage } from '@/types/types';

const AboutRG: NextPage = () => {
  const pageItem = useStore<SinglePage | null>($aboutPageItem);
  const pagesForCategory = useStore<LinkProps[]>($aboutPages);

  return <AboutItem pageItem={pageItem} pagesForCategory={pagesForCategory} />;
};

// export const getStaticPaths: GetStaticPaths = async () => {
//   const params = {
//     fields: ['url'],
//   };
//   const { data } = await API.getAboutPages(params);
//   return {
//     paths: data.data.map((post: any) => ({
//       params: { url: post.attributes.url },
//     })),
//     fallback: false,
//   };
// };
//
// export const getStaticProps = createGSP({
//   pageEvent: getAboutPageItem,
// });

AboutRG.getInitialProps = createGIP({
  pageEvent: getAboutPageItem,
});

export default AboutRG;
