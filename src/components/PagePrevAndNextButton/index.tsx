import styles from './PagePrevAndNextButton.module.scss';
import { BaseButton } from '@/components';
import { LinkProps } from '@/types/types';
import cn from 'classnames';

interface Props {
  prevPage: LinkProps | null;
  nextPage: LinkProps | null;
}

export function PagePrevAndNextButton({ prevPage = null, nextPage = null }: Props) {
  return (
    <div className={styles.pageButtonContainer}>
      {prevPage && (
        <BaseButton
          href={prevPage.link}
          size="middle"
          color="accent"
          className={cn(styles.pageButtonContainerButton, styles.pageButtonContainerButtonPrev)}
        >
          <img src="/images/icons/arrow-left-white.svg" alt="" />
          {prevPage.text}
        </BaseButton>
      )}
      {nextPage && (
        <BaseButton
          href={nextPage.link}
          size="middle"
          color="accent"
          className={cn(styles.pageButtonContainerButton, styles.pageButtonContainerButtonNext)}
        >
          {nextPage.text}
          <img src="/images/icons/arrow-left-white.svg" alt="" />
        </BaseButton>
      )}
    </div>
  );
}
