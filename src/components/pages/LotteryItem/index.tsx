import styles from './LotteryItem.module.scss';
import { NewsLayout } from '@/layouts/NewsLayout';
import { LinkProps, LotteryCardItem, LotteryPage } from '@/types/types';
import ReactHtmlParser from 'react-html-parser';
import { useEffect, useState } from 'react';
import { LotteryCard, PageSubheadings, LotteryWinnersTable, Faq } from '@/components';

interface Props {
  lotteryPage: LotteryPage;
  regions: LinkProps[];
  lotteryInfo: LotteryCardItem;
}

export function LotteryItem({ lotteryPage, regions, lotteryInfo }: Props) {
  const post = lotteryPage;
  const [headingsList, setHeadingsList] = useState<any>([]);

  useEffect(() => {
    const headings = document.getElementsByTagName('H2');
    const list = Array.from(headings);
    setHeadingsList(list);
  }, []);

  const scrollToHeading = (element: any) => {
    element.scrollIntoView({ behavior: 'smooth' });
  };

  const formattedContent = () => {
    if (post) {
      const contentList = post.content.split('$$').map((itemContent, index) => {
        switch (itemContent.trim()) {
          case 'lotteryCard': {
            if (lotteryInfo) {
              return <LotteryCard key={`lotteryCard${index}`} cardInfo={lotteryInfo} />;
            }
            return null;
          }
          case 'LotteryWinnersTable': {
            if (lotteryInfo) {
              return (
                <LotteryWinnersTable key={`lotteryWinners${index}`} lotteryInfo={lotteryInfo} />
              );
            }
            return null;
          }
          default: {
            return (
              <div key={`lotteryContent${index}`} className="blogPage">
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
      <div className={styles.lotteryItemHead}>
        <img src={post.img} alt="" className={styles.lotteryItemTopImg} />
        {headingsList.length ? (
          <PageSubheadings
            links={headingsList}
            onClickHandler={element => scrollToHeading(element)}
          />
        ) : null}
      </div>
      <h1 className={styles.lotteryItemTitle}>{post.h1}</h1>
      <div className={styles.lotteryItem}>{formattedContent()}</div>
      {post.faq && post.faq.faqItems ? <Faq data={post.faq} /> : null}
    </NewsLayout>
  );
}
