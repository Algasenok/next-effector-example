import styles from './Guides.module.scss';
import {BaseWrapper, LinksContainer} from '@/components';
import { LinkProps } from '@/types/types';

export function Guides() {

  const guides: LinkProps[] = [
    {
      text: 'What to look at before you gamble',
      link: '/',
    },
    {
      text: 'Ways to stay safe when gambling',
      link: '/',
    },
    {
      text: 'Gambling and young people',
      link: '/',
    },
  ];

  const tools: LinkProps[] = [
    {
      text: 'Block gambling payments with bank',
      link: '/',
    },
    {
      text: 'Control the time and money you spend on gambling',
      link: '/',
    },
    {
      text: 'View playing history and restrict to block gambling activity',
      link: '/',
    },
  ];

  return (
    <div className={styles.guides}>
      <BaseWrapper>
        <div className={styles.guidesContainer}>
          <LinksContainer links={guides} title="Guides" />
          <LinksContainer links={tools} title="Tools" />
        </div>
      </BaseWrapper>
      <img src="/images/backgrounds/guides-background.png" alt="" className={styles.guidesImg} />
    </div>
  );
}
