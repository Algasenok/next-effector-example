import { NextPage, GetStaticPaths } from 'next';
import { usePageEvent } from 'nextjs-effector';
import { AboutItem } from '@/components';
import { createGSP, appStarted } from '@/models/shared';
import { API } from '@/api';
import { getAboutPageItem } from '@/models/about';

const AboutRG: NextPage = () => {
  usePageEvent(appStarted, { runOnce: true });
  return <AboutItem />;
};

export const getStaticPaths: GetStaticPaths = async () => {
  const { data } = await API.getAboutPagesList();
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
