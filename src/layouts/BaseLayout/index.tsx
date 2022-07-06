import styles from './BaseLayout.module.scss';
import { ReactNode } from 'react';
import { Header } from '@/components';

interface LayoutProps {
  children: ReactNode;
}

export function BaseLayout({ children }: LayoutProps) {
  return (
    <div className={styles.layout}>
      <Header />
      <div className={styles.contentWrapper}>
        <div>{children}</div>
      </div>
      {/* <Footer /> */}
    </div>
  );
}
