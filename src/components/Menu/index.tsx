import styles from './Menu.module.scss';
import { BaseLink } from '@/components';

export function Menu() {
  const menu = [
    {
      title: 'For the Public',
      items: [
        {
          linkText: 'About gambling',
          url: '/',
        },
        {
          linkText: 'Safer play',
          url: '/',
        },
        {
          linkText: 'Help for problem gambling',
          url: '/',
        },
        {
          linkText: 'Problem gambling prevention',
          url: '/',
        },
      ],
    },
    {
      title: 'For Youth & Young Adults',
      items: [
        {
          linkText: 'For Youth',
          url: '/',
        },
        {
          linkText: 'For Young Adults',
          url: '/',
        },
      ],
    },
    {
      title: 'For Industry & Regulators',
      items: [
        {
          linkText: 'Get Accredited',
          url: '/',
        },
        {
          linkText: 'Advision & Consultation',
          url: '/',
        },
        {
          linkText: 'Thought Leadership',
          url: '/',
        },
        {
          linkText: 'Discovery Conference',
          url: '/',
        },
      ],
    },
    {
      title: 'About RGC',
      items: [
        {
          linkText: 'Careers',
          url: '/',
        },
        {
          linkText: 'Contact Us',
          url: '/',
        },
        {
          linkText: 'Newsletter',
          url: '/',
        },
      ],
    },
  ];

  return (
    <div className={styles.menu}>
      {menu.map(({ title, items }, index) => (
        <div key={`menu${index}`} className={styles.menuItem}>
          <div className={styles.menuTitle}>{title}</div>
          {items.map(({ linkText, url }, index) => (
            <BaseLink
              key={`menuItem${index}`}
              href={url}
              needHover
              color="light"
              className={styles.menuLink}
            >
              {linkText}
            </BaseLink>
          ))}
        </div>
      ))}
    </div>
  );
}
