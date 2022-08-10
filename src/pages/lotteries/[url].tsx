import { NextPage } from 'next';
import { LotteryItem } from '@/components';
import { createGIP } from '@/models/shared';
import { LinkProps, LotteryPage } from '@/types/types';
import { useStore } from 'effector-react/scope';
import { getLotteryPageItem, $lotteryPage, $lotteryRegions } from '@/models/LotteryPage';

const LotteryItemPage: NextPage = () => {
  const lotteryPage = useStore<LotteryPage | null>($lotteryPage);
  const regions = useStore<LinkProps[]>($lotteryRegions);

  return <LotteryItem lotteryPage={lotteryPage} regions={regions} />;
};

LotteryItemPage.getInitialProps = createGIP({
  pageEvent: getLotteryPageItem,
});

export default LotteryItemPage;
