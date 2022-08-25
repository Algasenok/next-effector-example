import { NextPage } from 'next';
import Head from 'next/head';
import { LotteryRegionItem } from '@/components';
import { createGIP } from '@/models/shared';
import { LinkProps, LotteryRegionPage } from '@/types/types';
import { useStore } from 'effector-react/scope';
import {
  $lotteryRegionItem,
  $lotteryRegions,
  getLotteryRegionItem,
  $lotteryRegionInfoItem,
} from '@/models/LotteryPage';

const CanadaLotteryPage: NextPage = () => {
  const regionPage = useStore<LotteryRegionPage | null>($lotteryRegionItem);
  const regions = useStore<LinkProps[]>($lotteryRegions);
  const regionsCards = useStore<any[]>($lotteryRegionInfoItem);

  return (
    <>
      <Head>
        <title>{regionPage ? regionPage.region?.title : ''}</title>
        <meta name="description" content={regionPage ? regionPage.region?.description : ''} />
      </Head>
      <LotteryRegionItem page={regionPage} regions={regions} regionsCards={regionsCards} />
    </>
  );
};

CanadaLotteryPage.getInitialProps = createGIP({
  pageEvent: getLotteryRegionItem,
});

export default CanadaLotteryPage;
