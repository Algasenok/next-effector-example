import { NextPage } from 'next';
import { AboutItem } from '@/components';
import { createGIP } from '@/models/shared';
import { getAboutPageItem, $aboutPageItem, $aboutPages } from '@/models/about';
import { useStore } from 'effector-react/scope';
import { LinkProps, SinglePage } from '@/types/types';
import Head from 'next/head';
import ErrorPage from 'next/error';

const AboutRG: NextPage = () => {
  const pageItem = useStore<SinglePage | null>($aboutPageItem);
  const pagesForCategory = useStore<LinkProps[]>($aboutPages);

  if (!pageItem) {
    return <ErrorPage statusCode={404} />;
  }

  return (
    <>
      <Head>
        <title>{pageItem?.title}</title>
        <meta name="description" content={pageItem?.description} />
        <meta httpEquiv="Last-Modified" content={new Date(pageItem?.updatedAt).toUTCString()} />
      </Head>
      <AboutItem pageItem={pageItem} pagesForCategory={pagesForCategory} />;
    </>
  );
};

AboutRG.getInitialProps = createGIP({
  pageEvent: getAboutPageItem,
});

export default AboutRG;
