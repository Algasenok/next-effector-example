import styles from './LotteryRegionItem.module.scss';
import { NewsLayout } from '@/layouts/NewsLayout';
import { LinkProps, LotteryRegionPage } from '@/types/types';
import ReactHtmlParser from 'react-html-parser';
import { API_CRM_URL_DEV } from 'config';
import { LotteryCard, BaseLink } from '@/components';
import cn from 'classnames';

interface Props {
  page: LotteryRegionPage | null;
  regions: LinkProps[];
  regionsCards: any[];
}

export function LotteryRegionItem({ page, regions, regionsCards }: Props) {
  const post = page;

  if (!post || !post.region) {
    return <div />;
  }
  /*
   TODO RA-98 Спарсить текст (аналогично тому, как это сделано на странице lotteries/[url].
    Вставить карточки с лотереями вместо ключа $$lotteryCard$$
   */

  const formattedContent = () => {
    if (post) {
      const contentList = post.region.content.split('$$').map(itemContent => {
        switch (itemContent.trim()) {
          case 'lotteryCard': {
            if (regionsCards) {
              return regionsCards.map(lotteryInfo => {
                const lotteryPageLink = post.lottery_pages.find(
                  (lotteryPage: any) => lotteryPage.lotteryKey === lotteryInfo.key,
                );
                return lotteryPageLink ? (
                  <BaseLink key={`lotteryCardLink${lotteryInfo.key}`} href={lotteryPageLink.url}>
                    <LotteryCard cardInfo={lotteryInfo} />
                  </BaseLink>
                ) : (
                  <LotteryCard key={`lotteryCard${lotteryInfo.key}`} cardInfo={lotteryInfo} />
                );
              });
            }
            return null;
          }
          default: {
            // TODO Убрать это после того как фотки будут храниться в яндекс клауде
            const content = itemContent.replace('/uploads/', `${API_CRM_URL_DEV}/uploads/`);
            return ReactHtmlParser(content);
          }
        }
      });
      return contentList || [];
    }
    return [];
  };

  return (
    <NewsLayout
      title={post.title}
      description={post.description}
      categories={regions}
      place="lottery"
    >
      <h1 className={styles.lotteryRegionItemTitle}>{post.region.name}</h1>
      <div className={cn(styles.lotteryRegionItem, 'singlePage')}>{formattedContent()}</div>
    </NewsLayout>
  );
}
