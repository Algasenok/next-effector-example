import { NextPage } from 'next';
import Head from 'next/head';
import { BaseLayout } from '@/layouts/BaseLayout';
import { BaseWrapper, Faq, LotteryCard, TopBanner } from '@/components';
import { createGIP } from '@/models/shared';
import { API_CRM_URL_DEV } from 'config';
import ReactHtmlParser from 'react-html-parser';
import { initMainPage, $mainPage } from '@/models/common';
import { useStore } from 'effector-react/scope';
import { MainPage } from '@/types/types';
import { $lotteriesForMainPage, $lotteryPagesUrlList } from '@/models/Lottery';
import styles from './index/Index.module.scss';
import { getFaqJsonLd } from '@/utils';

const Home: NextPage = () => {
  const mainPage = useStore<MainPage | null>($mainPage);
  const lotteryPages = useStore($lotteryPagesUrlList);
  const lotteriesList = useStore<any | null>($lotteriesForMainPage);

  const formattedContent = () => {
    if (mainPage?.content) {
      const content = mainPage?.content.replace('/uploads/', `${API_CRM_URL_DEV}/uploads/`);
      return <div className="blogPage">{ReactHtmlParser(content)}</div>;
    }
    return null;
  };

  const getLotteryCards = () => {
    return lotteriesList.map((lotteryInfo: any, index: number) => {
      const lotteryPageLink = lotteryPages.find(
        (lotteryPage: any) => lotteryPage.lotteryKey === lotteryInfo.key,
      );
      return (
        <LotteryCard
          key={`lotteryCard${lotteryInfo.key + index}`}
          cardInfo={lotteryInfo}
          place="main"
          urlPage={lotteryPageLink ? lotteryPageLink.url : null}
        />
      );
    });
  };

  return (
    <BaseLayout>
      <Head>
        {mainPage ? (
          <>
            <title>{mainPage.title}</title>
            <meta name="description" content={mainPage.description} />
            <meta httpEquiv="Last-Modified" content={new Date(mainPage.updatedAt).toUTCString()} />
            {mainPage.faq ? (
              <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(getFaqJsonLd(mainPage.faq)) }}
              />
            ) : null}
          </>
        ) : (
          <>
            {/* TODO Поставить дефолтные значения */}
            <title>Canada Lottery</title>
            <meta name="description" content="" />
          </>
        )}
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <TopBanner
        h1={mainPage?.h1 || 'Canada Lottery'}
        introduction={mainPage?.introduction || ''}
      />
      <BaseWrapper className={styles.mainContainer}>
        <div className={styles.mainLotteryContainer}>{getLotteryCards()}</div>
        <div className={styles.mainContentContainer}>{formattedContent()}</div>
        {mainPage && mainPage.faq && mainPage.faq.faqItems ? <Faq data={mainPage.faq} /> : null}
      </BaseWrapper>
    </BaseLayout>
  );
};

Home.getInitialProps = createGIP({
  pageEvent: initMainPage,
});

export default Home;
