import { NextPage } from 'next';
import Head from 'next/head';
import { LotteryRegionItem } from '@/components';
import { createGIP } from '@/models/shared';
import {Author, BreadcrumbsTypes, LinkProps, LotteryRegionPage} from '@/types/types';
import { useStore } from 'effector-react/scope';
import {
  $lotteryRegionItem,
  $lotteryRegions,
  getLotteryRegionItem,
  $lotteryRegionInfoItem,
} from '@/models/LotteryPage';
import ErrorPage from 'next/error';
import { getBreadcrumbList, getBreadcrumbsJsonLd, getFaqJsonLd, getJsonLd } from '@/utils';
import { $breadcrumb } from '@/models/menu';

const CanadaLotteryPage: NextPage = () => {
  const regionPage = useStore<LotteryRegionPage | null>($lotteryRegionItem);
  const regions = useStore<LinkProps[]>($lotteryRegions);
  const regionsCards = useStore<any[]>($lotteryRegionInfoItem);
  const lastBreadcrumb = useStore<BreadcrumbsTypes>($breadcrumb);

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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(
              getJsonLd({
                title: regionPage.region.title,
                description: regionPage.region.description,
                h1: regionPage.region.h1,
                introduction: regionPage.introduction,
                publishedAt: regionPage.region.publishedAt,
                updatedAt: regionPage.region.updatedAt,
              }),
            ),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(getBreadcrumbsJsonLd(getBreadcrumbList(lastBreadcrumb))),
          }}
        />
        {regionPage.region.faq ? (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(getFaqJsonLd(regionPage.region.faq)),
            }}
          />
        ) : null}
      </Head>
      <LotteryRegionItem page={regionPage} regions={regions} regionsCards={regionsCards} />
    </>
  );
};

CanadaLotteryPage.getInitialProps = createGIP({
  pageEvent: getLotteryRegionItem,
});

export default CanadaLotteryPage;
