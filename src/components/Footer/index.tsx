import styles from './Footer.module.scss';
import { BaseWrapper } from '@/components';

export function Footer() {
  return (
    <div className={styles.footer}>
      <BaseWrapper type="wide">
        <div className={styles.footerLogoContainer}>
          <img src="/images/logo.svg" className={styles.headerLogo} alt="" />
        </div>
      </BaseWrapper>
    </div>
  );
}
