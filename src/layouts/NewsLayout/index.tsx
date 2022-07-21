import styles from './NewsLayout.module.scss';
import { ReactNode, useState, useEffect } from 'react';
import { Tab } from '@/types/types';
import { Header, Footer, NewsSidebar, NewsTopBanner, BaseWrapper, TabsBar } from '@/components';

interface LayoutProps {
  children: ReactNode;
}

export function NewsLayout({ children }: LayoutProps) {
  const title = 'News & Blog';
  const [tabs, setTabs] = useState<Tab[]>([]);

  useEffect(() => {
    setTabs([
      {
        name: 'Blog',
        sysname: 'blog',
        isActive: true,
      },
      {
        name: 'Latest News',
        sysname: 'latest',
        isActive: false,
      },
    ]);
  }, []);

  const changeTabActive = (sysname: string) => {
    setTabs(
      tabs.map(tab => {
        if (tab.sysname === sysname) {
          tab.isActive = true;
        } else {
          tab.isActive = false;
        }
        return tab;
      }),
    );
  };

  return (
    <div className={styles.newsLayout}>
      <div className={styles.newsLayoutWrapper}>
        <Header />
        <NewsTopBanner />
        <BaseWrapper type="layout" className={styles.newsLayoutContainer}>
          <NewsSidebar className={styles.newsLayoutContainerSidebar} />
          <div className={styles.newsLayoutContainerTitle}>{title}</div>
          <TabsBar
            tabs={tabs}
            onClickHandler={sysname => changeTabActive(sysname)}
            className={styles.newsLayoutContainerTabs}
          />
          <div className={styles.contentWrapper}>
            <div>{children}</div>
          </div>
        </BaseWrapper>
        <Footer />
      </div>
    </div>
  );
}
