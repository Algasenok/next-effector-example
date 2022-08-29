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
import ErrorPage from 'next/error';

const CanadaLotteryPage: NextPage = () => {
  const regionPage = useStore<LotteryRegionPage | null>($lotteryRegionItem);
  const regions = useStore<LinkProps[]>($lotteryRegions);
  const regionsCards = useStore<any[]>($lotteryRegionInfoItem);

  if (!regionPage || !regionPage.region) {
    return <ErrorPage statusCode={404} />;
  }

  return (
    <>
      <Head>
        <title>{regionPage.region?.title}</title>
        <meta name="description" content={regionPage.region?.description} />
        <meta
          httpEquiv="Last-Modified"
          content={new Date(regionPage.region?.updatedAt).toUTCString()}
        />
      </Head>
      <LotteryRegionItem page={regionPage} regions={regions} regionsCards={regionsCards} />
    </>
  );
};

CanadaLotteryPage.getInitialProps = createGIP({
  pageEvent: getLotteryRegionItem,
});

export default CanadaLotteryPage;
