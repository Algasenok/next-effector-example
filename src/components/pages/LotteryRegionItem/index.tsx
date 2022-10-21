import styles from './LotteryRegionItem.module.scss';
import { NewsLayout } from '@/layouts/NewsLayout';
import { LinkProps, LotteryPage } from '@/types/types';
import ReactHtmlParser from 'react-html-parser';
import { LotteryCard, Faq } from '@/components';

interface Props {
  page: LotteryPage;
  regions: LinkProps[];
  regionsCards: any[];
  lotteryPagesList: LinkProps[];
}

export function LotteryRegionItem({ page, regions, regionsCards, lotteryPagesList }: Props) {
  const post = page;

  const formattedContent = () => {
    if (post) {
      const contentList = post.content.split('$$').map((itemContent, index) => {
        switch (itemContent.trim()) {
          case 'lotteryCard': {
            if (regionsCards) {
              return regionsCards.map(lotteryInfo => {
                const lotteryPageLink = lotteryPagesList.find(
                  (lotteryPage: any) => lotteryPage.lotteryKey === lotteryInfo.key,
                );
                return (
                  <LotteryCard
                    key={`lotteryCard${lotteryInfo.key}`}
                    cardInfo={lotteryInfo}
                    urlPage={lotteryPageLink ? lotteryPageLink.link : null}
                  />
                );
              });
            }
            return null;
          }
          default: {
            return (
              <div key={`content-${index}`} className="blogPage">
                {ReactHtmlParser(itemContent)}
              </div>
            );
          }
        }
      });
      return contentList || [];
    }
    return [];
  };

  return (
    <NewsLayout
      title={post.h1}
      description={post.introduction}
      categories={regions}
      place="lottery"
    >
      <h1 className={styles.lotteryRegionItemTitle}>{post.h1}</h1>
      <div className={styles.lotteryRegionItem}>{formattedContent()}</div>
      {post.faq && post.faq.faqItems ? <Faq data={post.faq} /> : null}
    </NewsLayout>
  );
}
