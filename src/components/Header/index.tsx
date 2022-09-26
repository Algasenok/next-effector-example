import styles from './Header.module.scss';
import { BaseLink, BaseWrapper } from '@/components';

export function Header() {
  return (
    <div className={styles.header}>
      <BaseWrapper className={styles.headerContainer}>
        <BaseLink href="/">
          <img src="/images/logo.svg" alt="" className={styles.headerLogo} />
        </BaseLink>
        <div className={styles.headerCountryInfo}>
          <BaseLink href="/canada" className={styles.headerCountryLink}>
            <img src="/images/icons/canada-flag.svg" alt="" className={styles.headerCountryFlag} />
            Canada
          </BaseLink>
        </div>
      </BaseWrapper>
    </div>
  );
}
