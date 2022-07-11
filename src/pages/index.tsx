import Head from 'next/head';
import { BaseLayout } from '@/layouts/BaseLayout';
import { TopBanner, Statistics, Support, Guides, ReportingContainer } from '@/components';

function Home() {
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
      <ReportingContainer />
    </BaseLayout>
  );
}

export default Home;
