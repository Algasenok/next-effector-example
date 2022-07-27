import styles from './NewsLayout.module.scss';
import { ReactNode, useState, useEffect } from 'react';
import { Tab } from '@/types/types';
import cn from 'classnames';
import { Header, Footer, NewsSidebar, NewsTopBanner, BaseWrapper, TabsBar } from '@/components';

interface LayoutProps {
  title: string;
  description: string;
  place?: string;
  children: ReactNode;
}

export function NewsLayout({ children, title, description, place = 'news' }: LayoutProps) {
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
    <div className={cn(styles.newsLayout, styles[`newsLayout_${place}`])}>
      <div className={styles.newsLayoutWrapper}>
        <Header />
        <NewsTopBanner title={title} description={description} />
        <BaseWrapper type="layout" className={styles.newsLayoutContainer}>
          <NewsSidebar className={styles.newsLayoutContainerSidebar} place={place} />
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
