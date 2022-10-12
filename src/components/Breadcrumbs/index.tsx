import styles from './Breadcrumbs.module.scss';
import { BaseLink } from '@/components';
import { BreadcrumbsTypes } from '@/types/types';
import { useStore } from 'effector-react/scope';
import { $breadcrumb } from '@/models/menu';
import { getBreadcrumbList } from '@/utils';

interface breadcrumbProps {
  className?: string;
}

export function Breadcrumbs({ className = '' }: breadcrumbProps) {
  const lastBreadcrumb = useStore<BreadcrumbsTypes>($breadcrumb);
  const breadCrumbsList = getBreadcrumbList(lastBreadcrumb);

  if (!breadCrumbsList.length) {
    return null;
  }

  return (
    <nav aria-label="Breadcrumbs" className={className}>
      <div className={styles.breadcrumbs}>
        <BaseLink href="/">Main</BaseLink>
        {breadCrumbsList.map(({ href, breadcrumb, isLastElement }, index) => (
          <div key={`breadcrumb${index}`} className={styles.breadcrumbsItem}>
            <div className={styles.breadcrumbsSlash}>/</div>
            {isLastElement ? (
              <span>{breadcrumb}</span>
            ) : (
              <BaseLink href={href}>{breadcrumb}</BaseLink>
            )}
          </div>
        ))}
      </div>
    </nav>
  );
}
