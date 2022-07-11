import styles from './SocialMedia.module.scss';
import { BaseLink } from '@/components';
import cn from 'classnames';

export function SocialMedia({ className = '' }) {
  const links = [
    {
      link: 'https://facebook.com',
      icon: '/images/icons/facebook.svg',
    },
    {
      link: 'https://twitter.com',
      icon: '/images/icons/twitter.svg',
    },
    {
      link: 'https://instagram.com',
      icon: '/images/icons/instagram.svg',
    },
    {
      link: 'https://linkedin.com',
      icon: '/images/icons/linkedin.svg',
    },
  ];

  return (
    <div className={cn(styles.socialMedia, className)}>
      {links.map(({ link, icon }, index) => (
        <BaseLink key={`social${index}`} href={link} className={styles.socialMediaLink}>
          <img src={icon} alt="" className={styles.socialMediaLinkImg} />
        </BaseLink>
      ))}
    </div>
  );
}
