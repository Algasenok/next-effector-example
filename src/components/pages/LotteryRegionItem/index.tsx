import styles from './LotteryRegionItem.module.scss';
import { NewsLayout } from '@/layouts/NewsLayout';
import { LinkProps, LotteryRegionPage } from '@/types/types';
import ReactHtmlParser from 'react-html-parser';
import { API_CRM_URL_DEV } from 'config';
import { LotteryCard } from '@/components';

interface Props {
  page: LotteryRegionPage | null;
  regions: LinkProps[];
  regionsCards: any[];
}

export function LotteryRegionItem({ page, regions, regionsCards }: Props) {
  const post = page;

  // useEffect(() => {
  //   const cardItem = document.getElementsByTagName('LotteryCard');
  // }, []);

  if (!post || !post.region) {
    return <div />;
  }

  // TODO Убрать это после того как фотки будут храниться в яндекс клауде
  post.region.content = post.region.content.replace('/uploads/', `${API_CRM_URL_DEV}/uploads/`);

  /*
   TODO RA-98 Спарсить текст (аналогично тому, как это сделано на странице lotteries/[url].
    Вставить карточки с лотереями вместо ключа $$lotteryCard$$
   */

  const formattedContent = () => {
    if (post) {
      const contentList = post.region.content.split('$$').map((itemContent, index) => {
        switch (itemContent.trim()) {
          case 'lotteryCard': {
            if (regionsCards) {
              return regionsCards.map(lotteryInfo => (
                <LotteryCard key={`lotteryCard${index}`} cardInfo={lotteryInfo} />
              ));
            }
            return null;
          }
          default: {
            return ReactHtmlParser(itemContent);
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
      {formattedContent()}
    </NewsLayout>
  );
}
