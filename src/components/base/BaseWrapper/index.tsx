import styles from './BaseWrapper.module.scss';
import { ReactNode } from 'react';
import cn from 'classnames';

interface BaseWrapperProps {
  children: ReactNode;
  type?: string;
  className?: string;
}

export function BaseWrapper({ children, type = '', className = '' }: BaseWrapperProps) {
  return (
    <div className={cn(styles.baseWrapper, styles[`baseWrapper_${type}`], className)}>
      {children}
    </div>
  );
}
