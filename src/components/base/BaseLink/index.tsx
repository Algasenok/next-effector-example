import styles from './BaseLink.module.scss';
import Link from 'next/link';
import { BaseLinkProps } from '@/types/types';
import cn from 'classnames';

export function BaseLink({ children, href = '', className = '' }: BaseLinkProps) {
  const isExternalLink = href.includes('http');

  return (
    <>
      {isExternalLink ? (
        <a target="_blank" href={href} className={cn(styles.link, className)} rel="noreferrer">
          {children}
        </a>
      ) : (
        <Link href={href}>
          <a className={cn(styles.link, className)}>{children}</a>
        </Link>
      )}
    </>
  );
}
