import { NextPage, GetStaticPaths } from 'next';
import { AboutItem } from '@/components';
import { createGSP } from '@/models/shared';
import { API } from '@/api';
import { getAboutPageItem, $aboutPageItem, $aboutPages } from '@/models/about';
import { useStore } from 'effector-react';
import { LinkProps, SinglePage } from '@/types/types';

const AboutRG: NextPage = () => {
  const pageItem = useStore<SinglePage | null>($aboutPageItem);
  const pagesForCategory = useStore<LinkProps[]>($aboutPages);

  return <AboutItem pageItem={pageItem} pagesForCategory={pagesForCategory} />;
};

export const getStaticPaths: GetStaticPaths = async () => {
  const params = {
    fields: ['url'],
  };
  const { data } = await API.getAboutPages(params);
  return {
    paths: data.data.map((post: any) => ({
      params: { url: post.attributes.url },
    })),
    fallback: false,
  };
};

export const getStaticProps = createGSP({
  pageEvent: getAboutPageItem,
});

export default AboutRG;
