import styles from './FooterMenu.module.scss';
import { BaseLink } from '@/components';
import cn from 'classnames';

interface menuItem {
  text: string;
  link: string;
}

export function FooterMenu({ className = '' }) {
  const menuList: menuItem[] = [
    { text: 'About gambling', link: '/' },
    { text: 'Safer play', link: '/' },
    { text: 'Help for problem gambling', link: '/' },
    { text: 'Support', link: '/' },
    { text: 'About us', link: '/' },
    { text: 'Our team', link: '/' },
    { text: 'Contact us', link: '/' },
    { text: 'FAQ', link: '/' },
    { text: 'Problem gambling prevention', link: '/' },
    { text: 'Cookies policy', link: '/' },
    { text: 'Privacy policy', link: '/' },
  ];

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
