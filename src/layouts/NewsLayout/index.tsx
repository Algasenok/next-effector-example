import styles from './NewsLayout.module.scss';
import { ReactNode, useState, useEffect } from 'react';
import { LinkProps, Tab } from '@/types/types';
import cn from 'classnames';
import { Header, Footer, NewsSidebar, NewsTopBanner, BaseWrapper, TabsBar } from '@/components';

interface LayoutProps {
  title: string;
  description: string;
  place?: string;
  children: ReactNode;
  categories: LinkProps[];
}

export function NewsLayout({
  children,
  title,
  description,
  place = 'news',
  categories,
}: LayoutProps) {
  const [tabs, setTabs] = useState<Tab[]>([]);

  useEffect(() => {
    setTabs([
      {
        name: 'Blog',
        sysname: 'Blog',
      },
      {
        name: 'Latest News',
        sysname: 'Latest_news',
      },
    ]);
  }, []);

  return (
    <div className={cn(styles.newsLayout, styles[`newsLayout_${place}`])}>
      <div className={styles.newsLayoutWrapper}>
        <Header />
        <NewsTopBanner title={title} description={description} />
        <BaseWrapper type="layout" className={styles.newsLayoutContainer}>
          <NewsSidebar
            className={styles.newsLayoutContainerSidebar}
            categories={categories}
            place={place}
          />
          <div className={styles.newsLayoutContainerTitle}>{title}</div>
          <TabsBar
            tabs={tabs}
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
