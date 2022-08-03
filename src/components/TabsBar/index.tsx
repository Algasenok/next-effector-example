import styles from './TabsBar.module.scss';
import { BaseButton } from '@/components';
import { Tab } from '@/types/types';
import cn from 'classnames';

interface tabsBarProps {
  tabs?: Tab[];
  onClickHandler?: (sysname: string) => void;
  className?: string;
}

export function TabsBar({ tabs = [], className = '', onClickHandler = () => {} }: tabsBarProps) {
  return (
    <div className={cn(styles.tabsBar, className)}>
      {tabs.map(({ name, sysname, isActive }, index) => (
        <BaseButton
          key={`tab${index}`}
          size="extra-small"
          color={isActive ? 'second' : 'common'}
          className={styles.tabsBarButton}
          onClickHandler={() => onClickHandler(sysname)}
        >
          {name}
        </BaseButton>
      ))}
    </div>
  );
}
