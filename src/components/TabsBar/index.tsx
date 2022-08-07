import styles from './TabsBar.module.scss';
import { BaseButton } from '@/components';
import { Tab } from '@/types/types';
import cn from 'classnames';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

interface tabsBarProps {
  tabs?: Tab[];
  className?: string;
}

export function TabsBar({ tabs = [], className = '' }: tabsBarProps) {
  const router = useRouter();
  const [activeTabSysname, setActiveTabSysname] = useState<string>('Blog');

  useEffect(() => {
    const queryTab = router.query.type;
    if (queryTab && tabs?.findIndex(item => item.sysname === queryTab) !== -1) {
      setActiveTabSysname(queryTab);
    }
  });

  const handleClick = sysname => {
    const query = router.query || {};
    const routeParams = {
      pathname: router.pathname,
      query: { ...query, type: sysname },
    };
    router.push(routeParams, undefined, { scroll: false });
  };

  return (
    <div className={cn(styles.tabsBar, className)}>
      {tabs.map(({ name, sysname }, index) => (
        <BaseButton
          key={`tab${index}`}
          size="extra-small"
          color={activeTabSysname === sysname ? 'second' : 'common'}
          className={styles.tabsBarButton}
          onClickHandler={() => handleClick(sysname)}
        >
          {name}
        </BaseButton>
      ))}
    </div>
  );
}
