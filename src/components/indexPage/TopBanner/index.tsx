import styles from './TopBanner.module.scss';
import { BaseWrapper } from '@/components';

export function TopBanner() {
  return (
    <div className={styles.topBanner}>
      <BaseWrapper className={styles.topBannerContainer}>
        <div className={styles.topBannerContent}>
          <h1 className={styles.topBannerTitle}>Canada Lottery</h1>
          <div className={styles.topBannerDescription}>
            Responsible Gaming Network is an independent non-profit organization dedicated to problem
            gambling prevention and keep gambling fun
            Денис, напиши сюда текст!
          </div>
        </div>
      </BaseWrapper>
    </div>
  );
}
