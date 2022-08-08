import styles from './FooterMenu.module.scss';
import { BaseLink } from '@/components';
import { $footerMenu } from '@/models/menu';
import { useStore } from 'effector-react/scope';
import cn from 'classnames';
import { LinkProps } from '@/types/types';

export function FooterMenu({ className = '' }) {
  const menuList = useStore<LinkProps[]>($footerMenu);

  return (
    <div className={cn(styles.footerMenu, className)}>
      {menuList.map(({ text, link }, index) => (
        <BaseLink key={`menuItem${index}`} href={link} className={styles.footerMenuLink}>
          {text}
        </BaseLink>
      ))}
    </div>
  );
}
