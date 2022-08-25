import { NextPage } from 'next';
import Head from 'next/head';
import { LotteryItem } from '@/components';
import { createGIP } from '@/models/shared';
import { LinkProps, LotteryCardItem, LotteryPage } from '@/types/types';
import { useStore } from 'effector-react/scope';
import {
  getLotteryPageItem,
  $lotteryPage,
  $lotteryRegions,
  $lotteryInfoItem,
} from '@/models/LotteryPage';
import ErrorPage from 'next/error';

const LotteryItemPage: NextPage = () => {
  const lotteryPage = useStore<LotteryPage | null>($lotteryPage);
  const regions = useStore<LinkProps[]>($lotteryRegions);
  const lotteryInfo = useStore<LotteryCardItem>($lotteryInfoItem);

  if (!lotteryPage) {
    return <ErrorPage statusCode={404} />;
  }

  return (
    <>
      <Head>
        <title>{lotteryPage?.title}</title>
        <meta name="description" content={lotteryPage?.description} />
        <meta httpEquiv="Last-Modified" content={new Date(lotteryPage?.updatedAt).toUTCString()} />
      </Head>
      <LotteryItem lotteryPage={lotteryPage} regions={regions} lotteryInfo={lotteryInfo} />
    </>
  );
};

LotteryItemPage.getInitialProps = createGIP({
  pageEvent: getLotteryPageItem,
});

export default LotteryItemPage;
