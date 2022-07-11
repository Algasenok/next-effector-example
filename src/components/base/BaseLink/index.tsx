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
}: BaseLinkProps) {
  const isExternalLink = href.includes('http');

  return (
    <>
      {isExternalLink ? (
        <a
          target="_blank"
          href={href}
          className={cn(styles.link, needHover ? styles.linkNeedHover : '', className)}
          rel="noreferrer"
        >
          {children}
          {needArrow && <div className={styles.linkArrow} />}
        </a>
      ) : (
        <Link href={href}>
          <a className={cn(styles.link, needHover ? styles.linkNeedHover : '', className)}>
            {children}
            {needArrow && <div className={styles.linkArrow} />}
          </a>
        </Link>
      )}
    </>
  );
}
