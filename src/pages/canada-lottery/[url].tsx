import { NextPage } from 'next';
import { LotteryRegionItem } from '@/components';
import { createGIP } from '@/models/shared';
import { LinkProps, LotteryRegionPage } from '@/types/types';
import { useStore } from 'effector-react/scope';
import { $lotteryRegionItem, $lotteryRegions, getLotteryRegionItem } from '@/models/LotteryPage';

const CanadaLotteryPage: NextPage = () => {
  const regionPage = useStore<LotteryRegionPage | null>($lotteryRegionItem);
  const regions = useStore<LinkProps[]>($lotteryRegions);

  return <LotteryRegionItem page={regionPage} regions={regions} />;
};

CanadaLotteryPage.getInitialProps = createGIP({
  pageEvent: getLotteryRegionItem,
});

export default CanadaLotteryPage;
