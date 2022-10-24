import styles from './BaseLink.module.scss';
import Link from 'next/link';
import { BaseLinkProps } from '@/types/types';
import cn from 'classnames';

export function BaseLink({
  children,
  href = '',
  className = '',
  needHover = false,
  needArrow = false,
  color = '',
}: BaseLinkProps) {

  return (
    <Link href={href} passHref>
      <a
        className={cn(
          styles.link,
          needHover ? styles.linkNeedHover : '',
          styles[`link_${color}`],
          className,
        )}
      >
        {children}
        {needArrow && <div className={styles.linkArrow} />}
      </a>
    </Link>
  );
}
