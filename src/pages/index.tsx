import Head from 'next/head';
import { BaseLayout } from '@/layouts/BaseLayout';
import { TopBanner, Statistics } from '@/components';

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
    </BaseLayout>
  );
}

export default Home;
