import styles from './NewsCardItem.module.scss';
import { BaseLink } from '@/components';
import { getShortDate } from '@/utils';

export function NewsCardItem() {
  const img = '/images/temporary/news-card-icon.jpg';
  const publicationDate = '11.07.2022';
  const tags: any[] = [
    {
      name: 'Affected others',
      sysname: 'others',
    },
    {
      name: 'Finances',
      sysname: 'finances',
    },
    {
      name: 'Gambling',
      sysname: 'gambling',
    },
  ];
  const title = 'Help with gambling debt and money worries';
  const description =
    'Sanita catches up with dept organisation PayPal for Debt Awareness Week 2021. ' +
    'PayPal for Debt Awareness Week 2021.';
  const urlPage = '/';

  const handleClick = sysname => {
    console.log('newsItem', sysname);
  };

  return (
    <div className={styles.newsCardItem}>
      <img src={img} alt="" className={styles.newsCardItemImg} />
      <div className={styles.newsCardItemContainer}>
        <div className={styles.newsCardItemInfo}>
          <div className={styles.newsCardItemTags}>
            {tags.map(({ name, sysname }, index) => (
              <div
                key={`newsTag${index}`}
                className={styles.newsCardItemTagItem}
                onClick={() => handleClick(sysname)}
              >
                {name}
              </div>
            ))}
          </div>
          <div className={styles.newsCardItemDate}>
            <img src="/images/icons/time.svg" alt="" />
            {getShortDate(publicationDate)}
          </div>
        </div>
        <div className={styles.newsCardItemTitle}>{title}</div>
        <div className={styles.newsCardItemDescription}>{description}</div>
        <BaseLink href={urlPage} needHover needArrow color="second">
          Read more
        </BaseLink>
      </div>
    </div>
  );
}
