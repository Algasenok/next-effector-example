import { NextPage } from 'next';
import { createGIP } from '@/models/shared';
import { useStore } from 'effector-react/scope';
import { LinkProps } from '@/types/types';
import { $lotteryRegions, getLotteryCountry } from '@/models/Lottery';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

const Knowledge: NextPage = () => {
  const regions = useStore<LinkProps[]>($lotteryRegions);
  const router = useRouter();

  useEffect(() => {
    if (regions.length) {
      const route = regions[0].link;
      router.push(route || '/');
    }
  }, []);

  return null;
};

Knowledge.getInitialProps = createGIP({
  pageEvent: getLotteryCountry,
});

export default Knowledge;
