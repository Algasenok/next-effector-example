import styles from './NewsTopBanner.module.scss';
import { BaseWrapper, Breadcrumbs } from '@/components';

export function NewsTopBanner() {
  const title = 'News & Blog';
  const description =
    'Description We’re here to help minimize risks caused by problem gambling and ' +
    'keep gambling fun. Responsible Gaming Network is an independent non-profit organization ' +
    'dedicated to problem gambling prevention and gambling fun.';

  return (
    <div className={styles.newsTopBanner}>
      <img src="/images/newsBanner/grid.png" alt="" className={styles.newsTopBannerGrid} />
      <img
        src="/images/newsBanner/elem-1.png"
        alt=""
        className={styles.newsTopBannerElem1}
      />
      <img
        src="/images/newsBanner/elem-2.png"
        alt=""
        className={styles.newsTopBannerElem2}
      />
      <BaseWrapper className={styles.newsTopBannerWrapper}>
        <Breadcrumbs className={styles.newsTopBannerBreadcrumbs} />
        <div className={styles.newsTopBannerTitle}>{title}</div>
        <div className={styles.newsTopBannerDescription}>{description}</div>
      </BaseWrapper>
    </div>
  );
}
