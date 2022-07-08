import styles from './BaseTitle.module.scss';
import { BaseTitleProps } from '@/types/types';
import cn from 'classnames';

export function BaseTitle({ children, size = '', className = '' }: BaseTitleProps) {
  return (
    <div className={cn(styles.baseTitle, styles[`baseTitle_${size}`], className)}>{children}</div>
  );
}
