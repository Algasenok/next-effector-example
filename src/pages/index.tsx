import { NextPage } from 'next';
import Head from 'next/head';
import { BaseLayout } from '@/layouts/BaseLayout';
import { TopBanner, Statistics, Support, Guides, ReportingContainer, Video } from '@/components';
import { createGIP } from '@/models/shared';

const Home: NextPage = () => {
  return (
    <BaseLayout>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="rg" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <TopBanner />
      <Statistics />
      <Support />
      <Guides />
      <Video />
      <ReportingContainer />
    </BaseLayout>
  );
};

Home.getInitialProps = createGIP();

export default Home;
