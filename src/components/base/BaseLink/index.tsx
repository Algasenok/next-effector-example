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
  onClickHandler,
}: BaseLinkProps) {
  const isExternalLink = href.includes('http');

  if (isExternalLink) {
    return (
      <a
        target="_blank"
        href={href}
        className={cn(
          styles.link,
          needHover ? styles.linkNeedHover : '',
          styles[`link_${color}`],
          className,
        )}
        rel="noreferrer"
        onClick={onClickHandler}
      >
        {children}
        {needArrow && <div className={styles.linkArrow} />}
      </a>
    );
  }
  return (
    <Link href={href}>
      <a
        className={cn(
          styles.link,
          needHover ? styles.linkNeedHover : '',
          styles[`link_${color}`],
          className,
        )}
        onClick={onClickHandler}
      >
        {children}
        {needArrow && <div className={styles.linkArrow} />}
      </a>
    </Link>
  );
}
