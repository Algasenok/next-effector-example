import styles from './LinksContainer.module.scss';
import { BaseLink } from '@/components';
import { LinkProps } from '@/types/types';

interface LinksContainerProps {
  links: LinkProps[];
  title: string;
}

export function LinksContainer({ links = [], title = '' }: LinksContainerProps) {
  return (
    <div className={styles.linksContainer}>
      <div className={styles.linksContainerTitle}>{title}</div>
      {links.map(({ link, text }, index) => (
        <BaseLink
          key={`link${index}`}
          href={link}
          className={styles.linksContainerLink}
          needArrow
          needHover
        >
          {text}
        </BaseLink>
      ))}
    </div>
  );
}
