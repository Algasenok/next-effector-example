import { NextPage } from 'next';
import Head from 'next/head';
import { BaseLayout } from '@/layouts/BaseLayout';
import { BaseWrapper, TopBanner } from '@/components';
import { createGIP } from '@/models/shared';
import { API_CRM_URL_DEV } from 'config';
import ReactHtmlParser from 'react-html-parser';
import { initMainPage, $mainPage } from '@/models/common';
import { useStore } from 'effector-react/scope';
import { MainPage } from '@/types/types';

const Home: NextPage = () => {
  const mainPage = useStore<MainPage | null>($mainPage);

  const formattedContent = () => {
    if (mainPage?.content) {
      const content = mainPage?.content.replace('/uploads/', `${API_CRM_URL_DEV}/uploads/`);
      return <div className="blogPage">{ReactHtmlParser(content)}</div>;
    }
    return null;
  };

  return (
    <BaseLayout>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="rg" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <TopBanner />
      <BaseWrapper>
        <div> Тут будут лотереи </div>
        <div>{formattedContent()}</div>
      </BaseWrapper>
    </BaseLayout>
  );
};

Home.getInitialProps = createGIP({
  pageEvent: initMainPage,
});

export default Home;
