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

const LotteryItemPage: NextPage = () => {
  const lotteryPage = useStore<LotteryPage | null>($lotteryPage);
  const regions = useStore<LinkProps[]>($lotteryRegions);
  const lotteryInfo = useStore<LotteryCardItem>($lotteryInfoItem);

  return (
    <>
      <Head>
        <title>{lotteryPage ? lotteryPage?.title : ''}</title>
        <meta name="description" content={lotteryPage ? lotteryPage?.description : ''} />
      </Head>
      <LotteryItem lotteryPage={lotteryPage} regions={regions} lotteryInfo={lotteryInfo} />
    </>
  );
};

LotteryItemPage.getInitialProps = createGIP({
  pageEvent: getLotteryPageItem,
});

export default LotteryItemPage;
