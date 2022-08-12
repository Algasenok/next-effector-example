import styles from './LotteryItem.module.scss';
import { NewsLayout } from '@/layouts/NewsLayout';
import { LinkProps, LotteryCardItem, LotteryPage } from '@/types/types';
import ReactHtmlParser from 'react-html-parser';
import cn from 'classnames';
import { API_CRM_URL_DEV } from 'config';
import { useEffect, useState } from 'react';
import { LotteryCard, PageSubheadings } from '@/components';
import ErrorPage from 'next/error';

interface Props {
  lotteryPage: LotteryPage | null;
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

    // const cardItem = document.getElementsByTagName('LotteryCard');
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

  if (!post) {
    return <ErrorPage statusCode={404} />;
  }

  // TODO Убрать это после того как фотки будут храниться в яндекс клауде
  post.content = post.content.replace('/uploads/', `${API_CRM_URL_DEV}/uploads/`);

  return (
    <NewsLayout
      title={post.title}
      description={post.description}
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
      <h1 className={styles.lotteryItemTitle}>{post.title}</h1>
      <div className={cn(styles.lotteryItem, 'singlePage')}>{formattedContent()}</div>
    </NewsLayout>
  );
}
