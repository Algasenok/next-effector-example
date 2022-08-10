import { NextPage } from 'next';
import { createGIP } from '@/models/shared';
import { useStore } from 'effector-react/scope';
import { LinkProps } from '@/types/types';
import { $lotteryRegions, getLotteryCountry } from '@/models/LotteryPage';
import { useEffect } from 'react';
import Router from 'next/router';

const Knowledge: NextPage = () => {
  const regions = useStore<LinkProps[]>($lotteryRegions);

  useEffect(() => {
    if (regions.length) {
      const route = regions[0].link;
      Router.push(route || '/');
    }
  }, [regions]);

  return null;
};

Knowledge.getInitialProps = createGIP({
  pageEvent: getLotteryCountry,
});

export default Knowledge;
