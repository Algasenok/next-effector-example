import styles from './NewsCardItem.module.scss';
import { BaseLink } from '@/components';
import { getShortDate } from '@/utils';
import { blogPageCard } from '@/types/types';
import ReactHtmlParser from 'react-html-parser';

interface NewsCardItemProps {
  data: blogPageCard;
}

export function NewsCardItem({ data }: NewsCardItemProps) {
  const handleClick = (sysname: string) => {
    return sysname;
  };

  return (
    <div className={styles.newsCardItem}>
      <img src={data.img} alt="" className={styles.newsCardItemImg} />
      <div className={styles.newsCardItemContainer}>
        <div className={styles.newsCardItemInfo}>
          <div className={styles.newsCardItemTags}>
            {data.tags.map(({ tagName, sysname }, index) => (
              <div
                key={`newsTag${index}`}
                className={styles.newsCardItemTagItem}
                onClick={() => handleClick(sysname)}
              >
                {tagName}
              </div>
            ))}
          </div>
          <div className={styles.newsCardItemDateContainer}>
            <div className={styles.newsCardItemDate}>
              <img src="/images/icons/time.svg" alt="" />
              {getShortDate(data.publishedAt)}
            </div>
            <div className={styles.newsCardItemDateInfoDot} />
            <div className={styles.newsCardIteReadTime}>
              {Math.ceil(data.content.length / 800)} min read
            </div>
          </div>
        </div>
        <div className={styles.newsCardItemTitle}>{data.title}</div>
        <div className={styles.newsCardItemDescription}>{ReactHtmlParser(data.description)}</div>
        <BaseLink href={data.url} needHover needArrow color="second">
          Read more
        </BaseLink>
      </div>
    </div>
  );
}
