import { NextPage } from 'next';
import Head from 'next/head';
import { LotteryItem, LotteryRegionItem } from '@/components';
import { createGIP } from '@/models/shared';
import { BreadcrumbsTypes, LinkProps, LotteryCardItem, LotteryPage } from '@/types/types';
import { useStore } from 'effector-react/scope';
import {
  $lotteryRegions,
  $lotteryInfoItems,
  getLotteryPageItem,
  $lotteryPage,
  $lotteryPagesList,
} from '@/models/Lottery';
import ErrorPage from 'next/error';
import { getBreadcrumbList, getBreadcrumbsJsonLd, getFaqJsonLd, getJsonLd } from '@/utils';
import { $breadcrumb } from '@/models/menu';

const CanadaLotteryPage: NextPage = () => {
  const lotteryPage = useStore<LotteryPage | null>($lotteryPage);
  const regions = useStore<LinkProps[]>($lotteryRegions);
  const lotteryCardsList = useStore<LotteryCardItem[]>($lotteryInfoItems);
  const lastBreadcrumb = useStore<BreadcrumbsTypes>($breadcrumb);
  const lotteryPagesList = useStore<LinkProps[]>($lotteryPagesList);

  if (!lotteryPage) {
    return <ErrorPage statusCode={404} />;
  }

  return (
    <>
      <Head>
        <title>{lotteryPage.title}</title>
        <meta name="description" content={lotteryPage.description} />
        <meta httpEquiv="Last-Modified" content={new Date(lotteryPage.updatedAt).toUTCString()} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(getJsonLd(lotteryPage)) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(getBreadcrumbsJsonLd(getBreadcrumbList(lastBreadcrumb))),
          }}
        />
        {lotteryPage.faq ? (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(getFaqJsonLd(lotteryPage.faq)) }}
          />
        ) : null}
      </Head>
      {lotteryPage.isRegionPage ? (
        <LotteryRegionItem
          page={lotteryPage}
          regions={regions}
          lotteryCardsList={lotteryCardsList}
          lotteryPagesList={lotteryPagesList}
        />
      ) : (
        <LotteryItem
          lotteryPage={lotteryPage}
          regions={regions}
          lotteryInfo={lotteryCardsList[0]}
        />
      )}
    </>
  );
};

CanadaLotteryPage.getInitialProps = createGIP({
  pageEvent: getLotteryPageItem,
});

export default CanadaLotteryPage;
