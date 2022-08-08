import styles from './Menu.module.scss';
import { BaseLink } from '@/components';
import { useStore } from 'effector-react/scope';
import { $headerMenu } from '@/models/menu';
import { HeaderMenu } from '@/types/types';

export function Menu() {
  const menu = useStore<HeaderMenu[]>($headerMenu);

  return (
    <div className={styles.menuContainer}>
      <div className={styles.menu}>
        {menu.map(({ name, links }, index) => (
          <div key={`menu${index}`} className={styles.menuItem}>
            <div className={styles.menuTitle}>{name}</div>
            {links.map(({ text, link }, index) => (
              <BaseLink
                key={`menuItem${index}`}
                href={link}
                needHover
                color="light"
                className={styles.menuLink}
              >
                {text}
              </BaseLink>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
