import styles from './NewsTopBanner.module.scss';
import { BaseWrapper, Breadcrumbs } from '@/components';

interface NewsTopBannerProps {
  title: string;
  description: string;
}

export function NewsTopBanner({ title, description }: NewsTopBannerProps) {
  return (
    <div className={styles.newsTopBanner}>
      <img src="/images/newsBanner/grid.png" alt="" className={styles.newsTopBannerGrid} />
      <img src="/images/newsBanner/elem-1.png" alt="" className={styles.newsTopBannerElem1} />
      <img src="/images/newsBanner/elem-2.png" alt="" className={styles.newsTopBannerElem2} />
      <BaseWrapper className={styles.newsTopBannerWrapper}>
        <Breadcrumbs className={styles.newsTopBannerBreadcrumbs} />
        <div className={styles.newsTopBannerTitle}>{title}</div>
        <div className={styles.newsTopBannerDescription}>{description}</div>
      </BaseWrapper>
    </div>
  );
}
