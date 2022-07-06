import styles from './Breadcrumbs.module.scss';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { ROUTES_NAME } from '@/utils/const/routesName';
import { BaseLink } from '@/components';
import { breadcrumbsTypes } from '@/types/types';

interface breadcrumbProps {
  className?: string;
}

export function Breadcrumbs({ className = '' }: breadcrumbProps) {
  const router = useRouter();
  const [breadcrumbs, setBreadcrumbs] = useState<breadcrumbsTypes[]>([]);

  const convertBreadcrumb = (pathName: string) => {
    return pathName.replace(/-/g, ' ').toUpperCase();
  };

  useEffect(() => {
    if (router) {
      const linkPath = router.asPath.split('/');
      linkPath.shift();

      const breadcrumsCount = linkPath.length;
      const pathArray = linkPath.map((path, index) => {
        const pathName = ROUTES_NAME[path] ? ROUTES_NAME[path] : convertBreadcrumb(path);
        return {
          breadcrumb: pathName,
          href: `/${linkPath.slice(0, index + 1).join('/')}`,
          isLastElement: breadcrumsCount - 1 === index,
        };
      });

      setBreadcrumbs(pathArray);
    }
  }, [router]);

  if (!breadcrumbs.length) {
    return null;
  }

  return (
    <nav aria-label="Breadcrumbs" className={className}>
      <div className={styles.breadcrumbs}>
        <BaseLink href="/">Main</BaseLink>
        {breadcrumbs.map(({ href, breadcrumb, isLastElement }, index) => (
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
