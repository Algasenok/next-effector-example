import styles from './LotteryItem.module.scss';
import { NewsLayout } from '@/layouts/NewsLayout';
import { LinkProps, LotteryCardItem, LotteryPage } from '@/types/types';
import ReactHtmlParser from 'react-html-parser';
import { API_CRM_URL_DEV } from 'config';
import { useEffect, useState } from 'react';
import { LotteryCard, PageSubheadings, LotteryWinnersTable } from '@/components';
import ErrorPage from 'next/error';

interface Props {
  lotteryPage: LotteryPage | null;
  regions: LinkProps[];
  lotteryInfo: LotteryCardItem;
}

export function LotteryItem({ lotteryPage, regions, lotteryInfo }: Props) {
  const post = lotteryPage;
  const [headingsList, setHeadingsList] = useState<any>([]);

  if (!post) {
    return <ErrorPage statusCode={404} />;
  }

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
            const content = itemContent.replace('/uploads/', `${API_CRM_URL_DEV}/uploads/`);
            return (
              <div key={`lotteryContent${index}`} className="singlePage">
                {ReactHtmlParser(content)}
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
    </NewsLayout>
  );
}
