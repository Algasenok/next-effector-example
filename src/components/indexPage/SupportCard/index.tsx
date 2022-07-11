import styles from './SupportCard.module.scss';
import { BaseLink } from '@/components';
import { SupportCardProps } from '@/types/types';

export function SupportCard({ title, text, link }: SupportCardProps) {
  return (
    <div className={styles.supportCard}>
      <div className={styles.supportCardHeader}>{title}</div>
      <div className={styles.supportCardDescription}>
        <div className={styles.supportCardText}>{text}</div>
        <BaseLink href={link} className={styles.supportCardLink} needHover needArrow>
          Knowledge base
        </BaseLink>
      </div>
    </div>
  );
}
