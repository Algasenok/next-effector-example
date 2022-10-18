import styles from './TopBanner.module.scss';
import { BaseWrapper } from '@/components';

interface Props {
  h1: string;
  introduction: string;
}

export function TopBanner({ h1, introduction }: Props) {
  return (
    <div className={styles.topBanner}>
      <BaseWrapper className={styles.topBannerContainer}>
        <div className={styles.topBannerContent}>
          <h1 className={styles.topBannerTitle}>{h1}</h1>
          <div className={styles.topBannerDescription}>{introduction}</div>
        </div>
      </BaseWrapper>
    </div>
  );
}
